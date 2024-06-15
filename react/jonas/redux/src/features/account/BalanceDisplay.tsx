import { useSelector } from "react-redux";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance } = useSelector((state) => state.account);

  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
