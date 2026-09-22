interface PriceProps {
  value: number;
}

const Price = ({ value }: PriceProps) => {
  return <>{value.toLocaleString("en-US")} UZS</>;
};

export default Price;
