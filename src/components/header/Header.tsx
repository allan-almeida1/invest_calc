import { ArrowBackIos } from "@mui/icons-material";
import { AppBar, Avatar, Box, IconButton, Toolbar } from "@mui/material";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  isHome?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ isHome }) => {
  const navigate = useNavigate();

  const clickHandle = () => {
    navigate("/");
  };

  return (
    <Box>
      <AppBar position="absolute">
        <Toolbar sx={{ backgroundColor: "#a70baf" }}>
          <Box>
            <IconButton
              disabled={isHome}
              sx={{
                color: "#ffffff",
                visibility: isHome ? "hidden" : "visible",
              }}
              onClick={clickHandle}
            >
              <ArrowBackIos />
            </IconButton>
          </Box>
          <Box flexGrow={1} textAlign="center">
            <img src="/logo_text.png" alt="Invest Calc" width={115} />
          </Box>
          <Box flexGrow={0}>
            <Avatar src="/icon-192x192.png" />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
