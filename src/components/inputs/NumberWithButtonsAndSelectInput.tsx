import { NumericFormat, NumericFormatProps } from "react-number-format";
import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "../../ui/theme";
import {
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

interface NumberWithButtomCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  isInteger: boolean;
}

const NumberWithButtonFormat = React.forwardRef<
  NumericFormatProps,
  NumberWithButtomCustomProps
>(function NumericFormatCustom(props, ref) {
  const { onChange, isInteger, ...other } = props;
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
      allowLeadingZeros={false}
      decimalScale={isInteger ? 0 : 2}
      valueIsNumericString
      inputMode="decimal"
      isAllowed={(values) => {
        const { floatValue } = values;
        return (
          floatValue === undefined ||
          (isInteger
            ? floatValue % 1 === 0 && floatValue >= 0
            : floatValue >= 0)
        );
      }}
    />
  );
});

interface NumberWithButtonInputProps {
  showSelect?: boolean;
  selectOptions?: string[];
  showButtons?: boolean;
  isInteger?: boolean;
  label?: string;
  name: string;
  onChange?: (value: number, selected: string) => void;
}

const NumberButtonSelectInput: React.FunctionComponent<
  NumberWithButtonInputProps
> = ({
  onChange,
  showButtons = true,
  showSelect = true,
  selectOptions = ["option 1", "option 2"],
  name,
  isInteger,
  label = "Some Label",
}) => {
  const [value, setValue] = useState<string>("");
  const [selected, setSelected] = useState<string>(
    selectOptions ? selectOptions[0] : ""
  );

  const handleButtonClick = (button: "+" | "-") => {
    let parsedValue = value === "" ? 0 : parseInt(value);
    if (button === "+") {
      parsedValue++;
    } else {
      if (parsedValue > 0) parsedValue--;
    }
    setValue(parsedValue.toString());
    // if (onChange) onChange(parsedValue, selected);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    const parsedVal = val === "" ? 0 : parseFloat(val);
    setValue(val);
    if (onChange) onChange(parsedVal, selected);
  };
  return (
    <ThemeProvider theme={theme}>
      <TextField
        label={label}
        name={name}
        fullWidth
        value={value}
        onChange={handleChange}
        variant="outlined"
        placeholder={isInteger ? "0" : "0,00"}
        InputProps={{
          inputComponent: NumberWithButtonFormat as any,
          inputProps: { isInteger },
          startAdornment: <></>,
          endAdornment: (
            <>
              {showButtons ? (
                <InputAdornment position="end">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleButtonClick("-");
                    }}
                  >
                    <Remove />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleButtonClick("+");
                    }}
                  >
                    <Add />
                  </IconButton>
                </InputAdornment>
              ) : (
                ""
              )}
              {showSelect ? (
                <InputAdornment position="end">
                  {selectOptions ? (
                    <Select
                      variant="standard"
                      onChange={(event) => {
                        const selectedValue = event.target.value;
                        setSelected(selectedValue);
                        const parsedValue =
                          value === "" ? 0 : parseFloat(value);
                        if (onChange) onChange(parsedValue, selectedValue);
                      }}
                      size="small"
                      sx={{ width: 100 }}
                      defaultValue={selectOptions[0]}
                    >
                      {selectOptions.map((value, _) => {
                        return <MenuItem value={value}>{value}</MenuItem>;
                      })}
                    </Select>
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ) : (
                ""
              )}
            </>
          ),
        }}
      />
    </ThemeProvider>
  );
};

export default NumberButtonSelectInput;
