import { combineReducers, createStore } from "redux";
import type { Store } from "redux";
import { accoutReducer } from "./features/account/accountSlice";
import { customerReducer } from "./features/customer/customerSlice";

const rootReducer = combineReducers({
  account: accoutReducer,
  customer: customerReducer,
});

const store: Store = createStore(rootReducer);

export default store;
