import { Box, Grid, Skeleton, Typography } from "@mui/material";
import { AgentData } from "../../types";
import { useSpaceTrader } from "../../contexts/SpaceTraderContext";

// Extracted DataDisplay component for better separation of concerns
const DataDisplay: React.FC<{ agent: AgentData }> = ({ agent }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Account ID:</strong> {agent?.accountId}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Symbol:</strong> {agent?.symbol}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Headquarters:</strong> {agent?.headquarters}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Credits:</strong> {agent?.credits}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Starting Faction:</strong> {agent?.startingFaction}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body1">
          <strong>Ship Count:</strong> {agent?.shipCount}
        </Typography>
      </Grid>
    </Grid>
  );
};

const HomePage: React.FC = () => {
  const { agent, fetchAgent } = useSpaceTrader();
  fetchAgent();
  return (
    <Box sx={{ padding: 2 }}>
      {agent ? (
        <DataDisplay agent={agent} />
      ) : (
        <Skeleton animation="wave" variant="text" width="100%" height={120} />
      )}
    </Box>
  );
};

export default HomePage;
