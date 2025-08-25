import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducer';
import api, {
  apiCallBegan,
  apiCallSuccess,
  apiCallFailed,
} from './middleware/api/api';

export const configureAppStore = () => {
  return configureStore({
    // configures Redux DevTools automatically
    reducer: rootReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            apiCallBegan.type,
            apiCallSuccess.type,
            apiCallFailed.type,
          ],
        },
      })
        .concat(api),
  });
};
const store = configureAppStore();

export { store };
