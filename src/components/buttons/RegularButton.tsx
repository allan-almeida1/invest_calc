import { ThemeProvider } from "@emotion/react";
import theme from "../../ui/theme";
import { Button } from "@mui/material";

interface RegularButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

const RegularButton: React.FC<RegularButtonProps> = ({
  children,
  onClick,
  fullWidth,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={onClick}
        variant="contained"
        size="large"
        fullWidth={fullWidth}
      >
        {children}
      </Button>
    </ThemeProvider>
  );
};

export default RegularButton;
