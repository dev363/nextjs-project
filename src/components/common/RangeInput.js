import { Badge } from "react-bootstrap";

const RangeInput = ({
  min,
  max,
  step,
  value,
  onChange,
  isCurrency,
  ...props
}) => {
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
      <Badge>
        {isCurrency
          ? Number(value)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")
          : value}
      </Badge>
    </div>
  );
};
RangeInput.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 0,
  isCurrency: false,
};
export default RangeInput;
