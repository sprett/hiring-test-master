import {combineReducers} from 'redux';
import sites from './sites/sites';
import oilRigs from './oil-rigs/oil-rigs';

export default combineReducers({
  sites,
  oilRigs,
});
