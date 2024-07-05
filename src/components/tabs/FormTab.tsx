import { ThemeProvider } from "@emotion/react";
import { Tab, Tabs } from "@mui/material";
import { FunctionComponent, useState } from "react";
import theme from "../../ui/theme";

interface FormTabProps {
  tabNames: string[];
  onChange?: (selectedTab: number) => void;
}

const FormTab: FunctionComponent<FormTabProps> = ({ tabNames, onChange }) => {
  const [activeTab, setActiveTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, clickedTab: number) => {
    setActiveTab(clickedTab);
    if (onChange) {
      onChange(clickedTab);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Tabs value={activeTab} onChange={handleChange}>
        {tabNames.map((value, index) => {
          return (
            <Tab
              label={value}
              id={value + "_" + index.toString()}
              key={index}
              aria-controls={value + "_" + index.toString()}
            />
          );
        })}
      </Tabs>
    </ThemeProvider>
  );
};

export default FormTab;
