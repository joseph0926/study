const ACCOUNT_DEPOSIT = "account/deposit";
const ACCOUNT_WITHDRAW = "account/withdraw";
const ACCOUNT_REQUESTLOAN = "account/requestLoan";
const ACCOUNT_PAYLOAN = "account/payLoan";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export function accoutReducer(
  state: any = initialStateAccount,
  actions: ActionsType
) {
  switch (actions.type) {
    case ACCOUNT_DEPOSIT:
      return { ...state, balance: state.balance + actions.payload };
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

    default:
      return state;
  }
}

export function deposit(amount: number) {
  return { type: ACCOUNT_DEPOSIT, payload: amount };
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
