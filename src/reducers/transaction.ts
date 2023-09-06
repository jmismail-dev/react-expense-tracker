import { createSlice } from "@reduxjs/toolkit";
import { InitialStoreStateType, Transaction } from "../types";

const initTxnInitState: InitialStoreStateType<Transaction> = {
  data: {
    create: null,
    delete: null,
    edit: null,
    get: null,
    list: []
  },
  error: {
    create: null,
    delete: null,
    edit: null,
    get: null,
    list: null
  },
  loading: {
    create: false,
    delete: false,
    edit: false,
    get: false,
    list: false
  },
  has_error: {
    create: false,
    delete: false,
    edit: false,
    get: false,
    list: false
  }
};

const txnSlice = createSlice({
  initialState: initTxnInitState,
  name: "transaction",
  reducers: {
    /** Create TXN  */
    createTransaction(state, { payload }) {
      console.log("payload", payload);

      // state.data.list.push(payload);
    }
  }
});

export const { createTransaction } = txnSlice.actions;

export default txnSlice.reducer;
