import { isFunction, isString } from 'lodash';
import axios, {
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
} from 'axios';
import {
    Dispatch,
    Middleware,
    createAction,
    Action,
    PayloadAction,
    MiddlewareAPI,
} from '@reduxjs/toolkit';

const defaultBaseURL = 'http://localhost:3000/api';

type GeneralCallback = (payload: any) => any;

type PayloadActionCreatorCallback = (payload: any) => PayloadAction<any>;

type APICallbackActionType =
    | string
    | Action
    | PayloadActionCreatorCallback
    | GeneralCallback;

export type APIActionPayload = AxiosRequestConfig & {
    onStart?: APICallbackActionType;
    onSuccess?: APICallbackActionType;
    onError?: APICallbackActionType;
};

export const apiCallBegan = createAction<APIActionPayload>('api/CallBegan');

export const apiCallSuccess = createAction<AxiosResponse>('api/CallSuccess');

export const apiCallFailed = createAction<AxiosError | unknown>(
    'api/CallFailed',
);

export const dispatchAPICallback = (
    dispatch: Dispatch,
    action?: APICallbackActionType,
    payload?: unknown,
) => {
    if (action) {
        if (isFunction(action)) {
            // invoke the callback function
            const result = action(payload);
            // if the function was an action creator, the result will have an action type, so dispatch it
            if (result?.type) {
                dispatch(result);
            }
        } else if (isString(action)) {
            dispatch({ type: action, payload });
        }
    }
};

const api: Middleware =
    ({ dispatch }: MiddlewareAPI) =>
        (next) =>
            async (action) => {
                if (
                    (action as PayloadAction<APIActionPayload>).type !== apiCallBegan.type
                ) {
                    return next(action);
                }

                const { baseURL, onStart, onSuccess, onError }: APIActionPayload =
                    (action as PayloadAction<APIActionPayload>).payload;

                if (onStart) {
                    dispatchAPICallback(dispatch, onStart);
                }
                next(action);

        try {
          const response = await axios.request({
            ...(action as PayloadAction<APIActionPayload>).payload,
            baseURL: baseURL ?? defaultBaseURL,
          });
          dispatch(apiCallSuccess(response.data));
          dispatchAPICallback(dispatch, onSuccess, response.data);
        } catch (error) {
          dispatch(apiCallFailed(error));
          dispatchAPICallback(dispatch, onError, error);
        }
      };

export default api;
