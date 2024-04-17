import { Box, Grid, Typography } from "@mui/material";
import { Ship, ShipNav } from "../../../types";
interface NavigationProps {
  ship: Ship;
}
const FleetNavigationTab: React.FC<NavigationProps> = ({ ship }) => {
  const nav: ShipNav = ship.nav;
  console.log(nav.route.arrival);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Current System:</strong> {nav.systemSymbol}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Current Waypoint:</strong> {nav.waypointSymbol}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Flight Mode:</strong> {nav.flightMode}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Status:</strong> {nav.status}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Box display="flex" justifyContent="space-between">
          <Typography>
            <strong>Origin:</strong> {nav.route.origin.symbol}
          </Typography>
          <Typography variant="caption">
            {nav.route.departureTime.toString()} <span>&#8594;</span>{" "}
            {nav.route.arrival.toString()}
          </Typography>
          <Typography>
            <strong>Destination:</strong> {nav.route.destination.symbol}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FleetNavigationTab;
