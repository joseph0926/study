import { configureStore } from "@reduxjs/toolkit";
import { accoutReducer } from "./features/account/accountSlice";
import { customerReducer } from "./features/customer/customerSlice";

const store = configureStore({
  reducer: {
    account: accoutReducer,
    customer: customerReducer,
  },
});

export default store;
