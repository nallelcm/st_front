import { Box, Tab, Tabs, Typography } from "@mui/material";
import { Ship } from "../../../types";
import { ReactNode, useState } from "react";
import FleetNavigationTab from "./FleetNavigationTab";
import FleetCargoTab from "./FleetCargoTab";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  element?: ReactNode;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, element, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{element ? element : children}</Box>
      )}
    </Box>
  );
}
interface FleetShipPanelProps {
  ship: Ship;
}
const FleetShipPanel: React.FC<FleetShipPanelProps> = ({ ship }) => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const tabContent = [
    { label: "Navigation", element: <FleetNavigationTab ship={ship} /> },
    { label: "Cargo", element: <FleetCargoTab ship={ship} /> },
    { label: "Information", element: <Typography>Info</Typography> },
  ];
  return (
    <Box>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        scrollButtons="auto"
        value={value}
        onChange={handleChange}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        {tabContent.map((tab) => (
          <Tab key={tab.label + "tab"} label={tab.label} />
        ))}
      </Tabs>
      {tabContent.map((tab, index) => (
        <TabPanel
          key={tab.label + "panel"}
          value={value}
          index={index}
          element={tab.element}
        />
      ))}
    </Box>
  );
};
export default FleetShipPanel;
