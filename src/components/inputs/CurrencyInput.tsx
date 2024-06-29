import * as React from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import TextField from "@mui/material/TextField";
import { InputAdornment, ThemeProvider } from "@mui/material";
import theme from "../../ui/theme";

interface CurrencyCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const CurrencyFormat = React.forwardRef<
  NumericFormatProps,
  CurrencyCustomProps
>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      // valueIsNumericString
      decimalScale={2}
      fixedDecimalScale
    />
  );
});

interface CurrencyInputProps {
  name: string;
  label?: string;
  onChange?: (value: number) => void;
}

const CurrencyInput: React.FunctionComponent<CurrencyInputProps> = ({
  onChange,
  label = "Some Label",
  name,
}) => {
  const [value, setValue] = React.useState<string | number>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const parsedValue =
      event.target.value === "" ? 0 : parseFloat(event.target.value);
    if (onChange) onChange(parsedValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <TextField
        label={label}
        value={value}
        onChange={handleChange}
        fullWidth
        name={name}
        placeholder="0,00"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: CurrencyFormat as any,
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
        variant="outlined"
      />
    </ThemeProvider>
  );
};

export default CurrencyInput;
