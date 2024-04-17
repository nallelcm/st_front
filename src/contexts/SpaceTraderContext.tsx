import { ReactNode, createContext, useContext, useState } from "react";
import { SpaceTraderAPI } from "../API";
import { AgentData, FleetResponse } from "../types";
import { useAuth } from "./AuthProviderContext";
interface SpaceTraderContextType {
  agent: AgentData | null;
  fetchAgent: (forceUpdate?: boolean) => Promise<AgentData | null>;
  fleet: FleetResponse | null;
  fetchFleet: (
    forceUpdate?: boolean,
    page?: number
  ) => Promise<FleetResponse | null>;
}

const SpaceTraderContext = createContext<SpaceTraderContextType | undefined>(
  undefined
);
export const SpaceTraderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [fleet, setFleet] = useState<FleetResponse | null>(null);

  const fetchAgent = async (forceUpdate = false): Promise<AgentData | null> => {
    try {
      const { validateLogin } = useAuth();
      await validateLogin();
      if (agent && !forceUpdate) {
        return agent;
      }
      const response = await SpaceTraderAPI.get("my/agent");
      setAgent(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const fetchFleet = async (
    forceUpdate = false,
    page = 1
  ): Promise<FleetResponse | null> => {
    const { validateLogin } = useAuth();
    try {
      await validateLogin();
      console.log("fetching fleet");
      if ((fleet && !forceUpdate) || page !== 1) {
        return fleet;
      }
      const response = await SpaceTraderAPI.get(`my/ships?page=${page}`);
      const fleetResponse: FleetResponse = {
        ships: response.data.data,
        meta: response.data.meta,
      };
      if (fleetResponse) {
        if (fleet) {
          fleetResponse.ships = fleet.ships.concat(fleetResponse.ships);
        }
      }
      console.log(fleetResponse);
      setFleet(fleetResponse);
      return fleetResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <SpaceTraderContext.Provider
      value={{ agent, fetchAgent, fleet, fetchFleet }}
    >
      {children}
    </SpaceTraderContext.Provider>
  );
};
export const useSpaceTrader = () => {
  const context = useContext(SpaceTraderContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
