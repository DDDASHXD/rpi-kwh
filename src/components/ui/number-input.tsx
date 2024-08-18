import React from "react";
import { Button } from "./button";
import { MinusIcon, PlusIcon, RefreshCcw } from "lucide-react";

interface iNumberInputProps {
  onChange?: (e: number) => void;
  step?: number;
  value?: number;
}

const NumberInput = ({ onChange, value, step }: iNumberInputProps) => {
  const [numValue, setNumValue] = React.useState(0);

  React.useEffect(() => {
    if (value) {
      setNumValue(value);
    }
  }, [value]);

  const handleMinus = () => {
    let newValue;
    if (step) {
      newValue = Number((numValue - step).toFixed(3));
    } else {
      newValue = Number((numValue - 0.01).toFixed(3));
    }
    if (onChange) {
      onChange(newValue);
    }

    setNumValue(newValue);
  };

  const handlePlus = () => {
    let newValue;
    if (step) {
      newValue = Number((numValue + step).toFixed(3));
    } else {
      newValue = Number((numValue + 0.01).toFixed(3));
    }

    if (onChange) {
      onChange(newValue);
    }

    setNumValue(newValue);
  };

  const handleReset = () => {
    if (onChange) {
      onChange(0);
    }

    setNumValue(0);
  };

  return (
    <div className="flex gap-[2px]">
      <Button
        variant="secondary"
        className="rounded-tr-none rounded-br-none p-1 h-max"
        onClick={() => handleMinus()}
      >
        <MinusIcon />
      </Button>
      <input
        className="w-14 bg-secondary text-center"
        type="number"
        value={value ? value : numValue}
      />
      <Button
        variant="secondary"
        className="rounded-tl-none rounded-bl-none p-1 h-max"
        onClick={() => handlePlus()}
      >
        <PlusIcon />
      </Button>
      <Button
        variant="ghost"
        className="p-1 h-max"
        onClick={() => handleReset()}
      >
        <RefreshCcw />
      </Button>
    </div>
  );
};

export default NumberInput;
