import { ReactNode, createContext, useContext, useState } from "react";
import { SpaceTraderAPI } from "../API";
import { AgentData, ContractResponse, FleetResponse } from "../types";
import { useAuth } from "./AuthProviderContext";
interface SpaceTraderContextType {
  agent: AgentData | null;
  fetchAgent: (forceUpdate?: boolean) => Promise<AgentData | null>;
  fleet: FleetResponse | null;
  fetchFleet: (
    forceUpdate?: boolean,
    page?: number
  ) => Promise<FleetResponse | null>;
  contracts: ContractResponse | null;
  fetchContracts: (
    forceUpdate?: boolean,
    page?: number
  ) => Promise<ContractResponse | null>;
}

const SpaceTraderContext = createContext<SpaceTraderContextType | undefined>(
  undefined
);
export const SpaceTraderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [agent, setAgent] = useState<AgentData | null>(null);
  const [fleet, setFleet] = useState<FleetResponse | null>(null);
  const [contracts, setContracts] = useState<ContractResponse | null>(null);
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
  const fetchContracts = async (
    forceUpdate = false,
    page = 1
  ): Promise<ContractResponse | null> => {
    const { validateLogin } = useAuth();
    try {
      await validateLogin();
      console.log("fetching fleet");
      if ((contracts && !forceUpdate) || page !== 1) {
        return contracts;
      }
      const response = await SpaceTraderAPI.get(`my/contracts?page=${page}`);
      const contractResponse: ContractResponse = {
        contracts: response.data.data,
        meta: response.data.meta,
      };
      if (contractResponse) {
        if (contracts) {
          contractResponse.contracts = contracts.contracts.concat(
            contractResponse.contracts
          );
        }
      }
      console.log(contractResponse);
      setContracts(contractResponse);
      return contractResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return (
    <SpaceTraderContext.Provider
      value={{
        agent,
        fetchAgent,
        fleet,
        fetchFleet,
        contracts,
        fetchContracts,
      }}
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
