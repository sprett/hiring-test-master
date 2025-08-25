import {createSlice} from '@reduxjs/toolkit';
import { apiCallBegan } from 'client/store/middleware/api/api';

const slice = createSlice({
  name: 'oilRigs',
  initialState: {
    loading: false,
    list: [],
  },
  reducers: {
    oilRigsRequested: (oilRigs) => {
      oilRigs.loading = true;
    },
    oilRigsReceived: (oilRigs, action) => {
      oilRigs.list = action.payload;
      oilRigs.loading = false;
    },
    oilRigsRequestFailed: (oilRigs) => {
      oilRigs.loading = false;
    },
  },
});

export const {
  oilRigsRequested,
  oilRigsReceived,
  oilRigsRequestFailed,
} = slice.actions;
export default slice.reducer;

const url = '/oil-rigs';
export const oilRigsLoaded = () => apiCallBegan({
  url,
  onStart: oilRigsRequested.type,
  onSuccess: oilRigsReceived.type,
  onError: oilRigsRequestFailed.type,
});
