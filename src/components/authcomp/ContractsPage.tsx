import { useSpaceTrader } from "../../contexts/SpaceTraderContext";
import { Skeleton } from "@mui/material";
import { Contract, ContractDeliverGood } from "../../types";
const ContractPage: React.FC = () => {
  const { fetchContracts, contracts } = useSpaceTrader();
  fetchContracts();
  if (!contracts) {
    return (
      <Skeleton animation="wave" variant="text" width="100%" height={120} />
    );
  }
  return (
    <div>
      <h1>Contracts</h1>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Deadline</th>
            <th>On Accept</th>
            <th>On Fulfill</th>
            <th>Goods</th>
          </tr>
        </thead>
        <tbody>
          {contracts.contracts.map((contract: Contract) => (
            <tr key={contract.id}>
              <td>{contract.type}</td>
              <td>{contract.terms.deadline.toString()}</td>
              <td>{contract.terms.payment.onAccepted}</td>
              <td>{contract.terms.payment.onFullfilled}</td>
              <td>
                {contract.terms.deliver.map((good: ContractDeliverGood) => {
                  return good.tradeSymbol;
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ContractPage;
