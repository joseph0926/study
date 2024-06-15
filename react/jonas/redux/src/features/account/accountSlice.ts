const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUESTLOAN = "account/requestLoan";
const ACCOUNT_PAYLOAN = "account/payLoan";
const ACCOUNT_CONVERTING = "account/convertingCurrency";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export function accoutReducer(
  state: any = initialStateAccount,
  actions: ActionsType
) {
  switch (actions.type) {
    case ACCOUNT_DEPOSIT:
      return {
        ...state,
        balance: state.balance + actions.payload,
        isLoading: false,
      };
    case ACCOUNT_WITHDRAW:
      return { ...state, balance: state.balance - actions.payload };
    case ACCOUNT_REQUESTLOAN:
      if (state.loan > 0) {
        return state;
      }
      return { ...state, loan: actions.payload };
    case ACCOUNT_PAYLOAN:
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case ACCOUNT_CONVERTING:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

export function deposit(amount: number | string, currency: string) {
  console.log(currency);

  if (!currency || currency === "") {
    return;
  }
  if (currency === "USD") {
    return { type: ACCOUNT_DEPOSIT, payload: amount };
  }

  return async function (dispatch, getState) {
    dispatch({ type: ACCOUNT_CONVERTING });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}0&from=${currency}&to=USD`
    );

    const data = await res.json();
    const convertedData = data.rates.USD;

    dispatch({ type: ACCOUNT_DEPOSIT, payload: convertedData });
  };
}
export function withdraw(amount: number) {
  return { type: ACCOUNT_WITHDRAW, payload: amount };
}
export function requestLoan(amount: number, purpose: string) {
  return { type: ACCOUNT_REQUESTLOAN, payload: { amount, purpose } };
}
export function payLoan() {
  return { type: ACCOUNT_PAYLOAN };
}
