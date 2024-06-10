const CUSTOMER_CREATE = "customer/create";
const CUSTOMER_UPDATE = "customer/update";

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export function customerReducer(
  state: any = initialStateCustomer,
  actions: ActionsType
) {
  switch (actions.type) {
    case CUSTOMER_CREATE:
      return {
        ...state,
        fullName: actions.payload.fullName,
        nationalID: actions.payload.nationalID,
        createdAt: actions.payload.createdAt,
      };
    case CUSTOMER_UPDATE:
      return { ...state, fullName: actions.payload.fullName };
    default:
      return state;
  }
}

export function createCustomer(fullName: string, nationalID: string) {
  return {
    type: CUSTOMER_CREATE,
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
export function updateName(fullName: string) {
  return { type: CUSTOMER_UPDATE, payload: fullName };
}
