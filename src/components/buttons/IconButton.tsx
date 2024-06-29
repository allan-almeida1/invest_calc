import { SvgIconComponent } from "@mui/icons-material";
import { Button, ThemeProvider, Typography } from "@mui/material";

import React from "react";
import theme from "../../ui/theme";
import { Link, useNavigate } from "react-router-dom";

interface IconButtonProps {
  text?: string;
  icon: SvgIconComponent;
  href: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  text = "",
  icon: Icon,
  href,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        startIcon={<Icon style={{ fontSize: 40 }} />}
        className="button"
        LinkComponent={Link}
        onClick={handleClick}
        sx={{ padding: "20px", color: "#fff", minWidth: "300px" }}
      >
        <Typography fontSize={19}>{text}</Typography>
      </Button>
    </ThemeProvider>
  );
};

export default IconButton;
