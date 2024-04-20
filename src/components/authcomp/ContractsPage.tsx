import { useSpaceTrader } from "../../contexts/SpaceTraderContext";
import {
  Box,
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Contract, ContractDeliverGood } from "../../types";
import { getDate } from "../../utils";
import { Fragment } from "react/jsx-runtime";
const ContractTable: React.FC<{
  contracts: Contract[];
  acceptContractButton?: (contractId: string) => void;
}> = ({ contracts, acceptContractButton }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Faction</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Terms</TableCell>
            <TableCell>Accepted</TableCell>
            <TableCell>Fulfilled</TableCell>
            <TableCell>Expiration</TableCell>
            <TableCell>Deadline to Accept</TableCell>
            {acceptContractButton ? <TableCell></TableCell> : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {contracts.map((contract: Contract) => (
            <TableRow key={contract.id}>
              <TableCell>{contract.factionSymbol}</TableCell>
              <TableCell>{contract.type}</TableCell>
              <TableCell>
                <ul>
                  <li>
                    Deadline:{" "}
                    {
                      getDate(contract.terms.deadline.toString())
                        .formattedDateTime
                    }
                    <br />(
                    {getDate(contract.terms.deadline.toString()).remainingTime}{" "}
                    remaining)
                  </li>
                  <li>
                    Payment on Acceptance: {contract.terms.payment.onAccepted}
                  </li>
                  <li>
                    Payment on Fulfillment:{" "}
                    {contract.terms.payment.onFullfilled}
                  </li>
                  <li>
                    Delivery:
                    <ul>
                      {contract.terms.deliver.map(
                        (delivery: ContractDeliverGood, index: number) => (
                          <Fragment key={index + delivery.tradeSymbol}>
                            <li>{delivery.tradeSymbol}</li>
                            <ul>
                              <li>Destination: {delivery.destinationSymbol}</li>
                              <li>
                                Required:{" "}
                                {delivery.unitsFullfilled
                                  ? delivery.unitsFullfilled
                                  : 0}{" "}
                                / {delivery.unitsRequired}
                              </li>
                            </ul>
                          </Fragment>
                        )
                      )}
                    </ul>
                  </li>
                </ul>
              </TableCell>
              <TableCell>{contract.accepted ? "Yes" : "No"}</TableCell>
              <TableCell>{contract.fullfilled ? "Yes" : "No"}</TableCell>
              <TableCell>
                {getDate(contract.expiration.toString()).formattedDateTime}
                <br />({
                  getDate(contract.expiration.toString()).remainingTime
                }{" "}
                remaining)
              </TableCell>
              <TableCell>
                {
                  getDate(contract.deadlineToAccept.toString())
                    .formattedDateTime
                }
                <br />(
                {getDate(contract.deadlineToAccept.toString()).remainingTime}{" "}
                remaining)
              </TableCell>
              {acceptContractButton ? (
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => acceptContractButton(contract.id)}
                  >
                    Accept
                  </Button>
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ContractPage: React.FC = () => {
  const { fetchContracts, acceptContract, contracts } = useSpaceTrader();
  const acceptContractButton = (contractId: string) => {
    console.log("accepting contract", contractId);
    acceptContract(contractId);
    fetchContracts();
  };
  fetchContracts();

  if (!contracts) {
    return (
      <Skeleton animation="wave" variant="text" width="100%" height={120} />
    );
  }
  const availableContracts = contracts.contracts.filter((contract) => {
    return contract.accepted === false;
  });
  const acceptedContracts = contracts.contracts.filter((contract) => {
    return contract.accepted === true;
  });

  return (
    <Box>
      <Typography variant="h4">Available Contracts</Typography>
      <ContractTable
        contracts={availableContracts}
        acceptContractButton={acceptContractButton}
      />
      <Typography variant="h4">Accepted Contracts</Typography>
      <ContractTable contracts={acceptedContracts} />
    </Box>
  );
};
export default ContractPage;
