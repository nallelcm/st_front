import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { Ship } from "../../types";
import { useState } from "react";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
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
  return (
    <Box>
      <Tabs
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Navigation" />
        <Tab label="Crew" />
        <Tab label="Frame" />
        <Tab label="Reactor" />
        <Tab label="Engine" />
        <Tab label="Cargo" />
        <Tab label="Modules" />
        <Tab label="Mounts" />
        <Tab label="Fuel" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Typography>Navigation</Typography>
        <Divider />
        <Typography>Location: {ship.nav.route.origin.symbol}</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Crew</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>Frame</Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>Reactor</Typography>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography>Engine</Typography>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <Typography>Cargo</Typography>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <Typography>Modules</Typography>
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Typography>Mounts</Typography>
      </TabPanel>
      <TabPanel value={value} index={8}>
        <Typography>Fuel</Typography>
      </TabPanel>
    </Box>
  );
};
export default FleetShipPanel;
