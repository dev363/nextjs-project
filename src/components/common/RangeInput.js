import { currencyValue } from "actions/common";
import { Badge } from "react-bootstrap";

const defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  iscurrency: false,
};

const RangeInput = (props) => {
  const { min, max, step, value, onChange, iscurrency } = {
    ...defaultProps,
    ...props,
  };
  return (
    <div className="range-wrap d-flex mt-1">
      <input
        className="w-100"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        {...props}
        onChange={(e) => onChange(e.target.value)}
      />
      <Badge>{iscurrency ? currencyValue(value) : value}</Badge>
    </div>
  );
};

export default RangeInput;
