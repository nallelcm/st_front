import {
  Box,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSpaceTrader } from "../../contexts/SpaceTraderContext";
import { FleetResponse, Ship } from "../../types";
import { useState } from "react";
import FleetShipPanel from "./FleetShipPanel";

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
interface FleetDataProps {
  fleet: FleetResponse;
}
const FleetData = ({ fleet }: FleetDataProps) => {
  const [value, setValue] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        height: "100%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider", width: "300px" }}
      >
        {fleet.ships.map((ship: Ship, index: number) => (
          <Tab
            label={ship.registration.name + " (" + ship.registration.role + ")"}
            key={ship.symbol}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
      {fleet.ships.map((ship: Ship, index: number) => (
        <TabPanel value={value} index={index} key={ship.symbol}>
          {/* the ships information */}
          <Typography variant="h4">{ship.registration.name}</Typography>
          <Stack direction="row" spacing={1}>
            <Chip
              label={"Crew: " + ship.crew.current + "/" + ship.crew.capacity}
              size="small"
              variant="outlined"
            />
            <Chip
              label={"Fuel: " + ship.fuel.current + "/" + ship.fuel.capacity}
              size="small"
              variant="outlined"
            />
            <Chip
              label={"Modules: " + ship.modules.length}
              size="small"
              variant="outlined"
            />
            <Chip
              label={"Cargo: " + ship.cargo.units + "/" + ship.cargo.capacity}
              size="small"
              variant="outlined"
            />
            <Chip
              label={"Mounts: " + ship.mounts.length}
              size="small"
              variant="outlined"
            />
            <Chip label={ship.nav.flightMode} size="small" variant="outlined" />
            <Chip label={ship.nav.status} size="small" variant="outlined" />
          </Stack>
          <Divider />
          <FleetShipPanel ship={ship} />
        </TabPanel>
      ))}
    </Box>
  );
};

const Fleet: React.FC = () => {
  const { fleet, fetchFleet } = useSpaceTrader();

  fetchFleet();

  return (
    <>
      {fleet ? (
        <FleetData fleet={fleet} />
      ) : (
        <Skeleton animation="wave" variant="text" width="100%" height={120} />
      )}
    </>
  );
};

export default Fleet;
