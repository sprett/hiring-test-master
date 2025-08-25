import oilRigs, {oilRigsLoaded, oilRigsRequested} from './oil-rigs';
import { configureAppStore } from '../../configureStore';

const hello = () => 'hello world test';

describe('employees', () => {
  let store;
  beforeEach(() => {
    store = configureAppStore();
    fetchMock.resetMocks();
  })

  const oilRigsSlice = () => store.getState().entities.oilRigs;

  /*
    Hello world test
  */

  test('hello world test', () => {
    expect(hello()).toBe('hello world test');
  });

  /*
    Solitary reducer tests
  */

  it('should handle initial state', () => {
    expect(oilRigs(undefined, {})).toEqual({list: [], loading: false})
  });

  it('should set loading when requested', () => {
    expect(oilRigs({list: [], loading: false}, oilRigsRequested()))
      .toEqual({list: [], loading: true})
  });
});
