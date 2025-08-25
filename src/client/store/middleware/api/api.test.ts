import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import api, {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
  dispatchAPICallback,
} from './api';

type AppState = {};
type StoreType = MockStoreEnhanced<AppState>;

const middleware = [api];
const mockStore = configureStore<AppState, any>(middleware as any);

describe('API middleware', () => {
  let mockHTTP: MockAdapter;
  let store: StoreType;
  beforeEach(() => {
    mockHTTP = new MockAdapter(axios);
    const initialState = {};
    store = mockStore(initialState);
  });
  describe('dispatchAPICallback', () => {
    it('does nothing when action is undefined', async () => {
      const action = undefined;
      dispatchAPICallback(store.dispatch, action);
      const actions = store.getActions();
      expect(actions.length).toBe(0);
    });
    it('dispatches a callback from an action type (string)', async () => {
      const actionType = 'exampleActionType';
      const payload = { monkeys: 'bananas' };
      dispatchAPICallback(store.dispatch, actionType, payload);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(actionType);
      expect(actions[0].payload).toBe(payload);
    });
    it('dispatches a callback from an action creator (function)', async () => {
      const payload = { monkeys: 'bananas' };
      const actionCreator = createAction('exampleAction');
      dispatchAPICallback(store.dispatch, actionCreator, payload);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(actionCreator.type);
      expect(actions[0].payload).toBe(payload);
    });
    it('does not pass payload when non is defined', async () => {
      const actionCreator = createAction('exampleAction');
      dispatchAPICallback(store.dispatch, actionCreator);
      const actions = store.getActions();
      expect(actions.length).toBe(1);
      expect(actions[0].type).toBe(actionCreator.type);
      expect(actions[0].payload).toBeUndefined();
    });
  });
  describe('apiCallBegan makes an HTTP request and dispatches a response action', () => {
    it('handles classic Redux action type strings', async () => {
      const url = '/animals/alpaca';
      const onStart = 'onStartActionType';
      const onSuccess = 'onSuccessActionType';
      const onError = 'onErrorActionType';
      const payload = {
        url,
        method: 'GET',
        onStart,
        onSuccess,
        onError,
      };
      const responsePayload = { name: 'Lachlan' };
      mockHTTP.onGet(url).reply(200, responsePayload);

      await store.dispatch(apiCallBegan(payload));

      expect(mockHTTP.history.get.length).toBe(1);
      expect(mockHTTP.history.get[0].url).toBe(url);

      const actions = store.getActions();
      expect(actions.length).toBe(4);
      expect(actions[0].type).toBe(onStart);
      expect(actions[1].type).toBe(apiCallBegan.type);
      expect(actions[1].payload).toBe(payload);
      expect(actions[2].type).toBe(apiCallSuccess.type);
      expect(actions[3].type).toBe(onSuccess);
      expect(actions[3].payload).toStrictEqual(responsePayload);
    });
    it('handles Redux Toolkit-style action type strings', async () => {
      const url = '/animals/alpaca';
      const onStartActionCreator = createAction('onStartActionType');
      const onSuccessActionCreator = createAction('onSuccessActionType');
      const onErrorActionCreator = createAction('onErrorActionType');
      const payload = {
        url,
        method: 'GET',
        onStart: onStartActionCreator.type,
        onSuccess: onSuccessActionCreator.type,
        onError: onErrorActionCreator.type,
      };
      const responsePayload = { name: 'Lachlan' };
      mockHTTP.onGet(url).reply(200, responsePayload);

      await store.dispatch(apiCallBegan(payload));

      expect(mockHTTP.history.get.length).toBe(1);
      expect(mockHTTP.history.get[0].url).toBe(url);

      const actions = store.getActions();
      expect(actions.length).toBe(4);
      expect(actions[0].type).toBe(onStartActionCreator.type);
      expect(actions[1].type).toBe(apiCallBegan.type);
      expect(actions[1].payload).toBe(payload);
      expect(actions[2].type).toBe(apiCallSuccess.type);
      expect(actions[3].type).toBe(onSuccessActionCreator.type);
      expect(actions[3].payload).toStrictEqual(responsePayload);
    });
    it('handles action creator callback functions and dispatches the actions', async () => {
      const url = '/animals/alpaca';
      type ResponseType = { name: string };
      type SuccessPayloadType = {
        response: ResponseType;
        extraArgs: any;
      };
      const responsePayload = { name: 'Lachlan' };
      const onStartActionCreator = createAction('onStartActionType');
      const onSuccessActionCreator = createAction<SuccessPayloadType>(
        'onSuccessActionType',
      );
      const onErrorActionCreator = createAction('onErrorActionType');
      const payload = {
        url,
        method: 'GET',
        onStart: onStartActionCreator.type,
        // action creator callback functions allow passing of extra args as well as the API response payload
        onSuccess: (response: ResponseType) =>
          onSuccessActionCreator({ response, extraArgs: 'bar' }),
        onError: onErrorActionCreator.type,
      };

      mockHTTP.onGet(url).reply(200, responsePayload);

      await store.dispatch(apiCallBegan(payload));

      expect(mockHTTP.history.get.length).toBe(1);
      expect(mockHTTP.history.get[0].url).toBe(url);

      const actions = store.getActions();
      expect(actions.length).toBe(4);
      expect(actions[0].type).toBe(onStartActionCreator.type);
      expect(actions[1].type).toBe(apiCallBegan.type);
      expect(actions[1].payload).toBe(payload);
      expect(actions[2].type).toBe(apiCallSuccess.type);
      expect(actions[3].type).toBe(onSuccessActionCreator.type);
      expect(actions[3].payload).toStrictEqual({
        response: responsePayload,
        extraArgs: 'bar',
      });
    });
    it('handles generic callback functions (and takes no further action)', async () => {
      const url = '/animals/alpaca';
      type ResponseType = { name: string };
      const responsePayload = { name: 'Lachlan' };
      let callbackResult;
      const onStartActionCreator = createAction('onStartActionType');
      const onErrorActionCreator = createAction('onErrorActionType');
      const payload = {
        url,
        method: 'GET',
        onStart: onStartActionCreator.type,
        // action creator callback functions allow passing of extra args as well as the API response payload
        onSuccess: (response: ResponseType) => {
          console.log('general success callback function called');
          callbackResult = response;
        },
        onError: onErrorActionCreator.type,
      };
      mockHTTP.onGet(url).reply(200, responsePayload);

      await store.dispatch(apiCallBegan(payload));

      expect(mockHTTP.history.get.length).toBe(1);
      expect(mockHTTP.history.get[0].url).toBe(url);

      const actions = store.getActions();
      expect(actions.length).toBe(3);
      expect(actions[0].type).toBe(onStartActionCreator.type);
      expect(actions[1].type).toBe(apiCallBegan.type);
      expect(actions[1].payload).toBe(payload);
      expect(actions[2].type).toBe(apiCallSuccess.type);
      expect(callbackResult).toStrictEqual({ name: 'Lachlan' });
    });
    it('handles dispatching an error action', async () => {
      const url = '/animals/alpaca';
      const onError = 'onErrorActionType';
      const payload = {
        url,
        method: 'GET',
        onError,
      };
      mockHTTP.onGet().reply(500);

      await store.dispatch(apiCallBegan(payload));

      expect(mockHTTP.history.get.length).toBe(1);
      expect(mockHTTP.history.get[0].url).toBe(url);

      const actions = store.getActions();
      expect(actions.length).toBe(3);
      expect(actions[0].type).toBe(apiCallBegan.type);
      expect(actions[0].payload).toBe(payload);
      expect(actions[1].type).toBe(apiCallFailed.type);
      expect(actions[2].type).toBe(onError);
    });
  });
});
