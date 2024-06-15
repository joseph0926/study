import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import { thunk } from "redux-thunk";
import { accoutReducer } from "./features/account/accountSlice";
import { customerReducer } from "./features/customer/customerSlice";

import type { Store } from "redux";

const rootReducer = combineReducers({
  account: accoutReducer,
  customer: customerReducer,
});

const store: Store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
