import {
  Box,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Ship, ShipCargo, ShipCargoItem } from "../../../types";

const CargoCapacityProgress = ({ cargo }: { cargo: ShipCargo }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={cargo.units / cargo.capacity}
        />
      </Box>
      <Box sx={{ minWidth: 50 }}>
        <Typography variant="body2" color="text.secondary">
          {cargo.units} / {cargo.capacity}
        </Typography>
      </Box>
    </Box>
  );
};
const CargoItems = ({ cargo }: { cargo: ShipCargo }) => {
  return (
    <Box>
      {cargo.inventory.length === 0 ? (
        <Typography>No cargo</Typography>
      ) : (
        <List>
          {cargo.inventory.map((item: ShipCargoItem) => (
            <ListItem key={item.symbol}>
              <ListItemText primary={item.symbol} secondary={item.units} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
const FleetCargoTab: React.FC<{ ship: Ship }> = ({ ship }) => {
  const cargo: ShipCargo = ship.cargo;
  return (
    <Box>
      <CargoCapacityProgress cargo={cargo} />
      <CargoItems cargo={cargo} />
    </Box>
  );
};

export default FleetCargoTab;
