import { SpaceTraderDateInfo } from "./types";
export const getDate = (dateString: string): SpaceTraderDateInfo => {
  const spDate = new Date(dateString);
  const remainingTime = calculateRemainingTime(dateString);
  const formattedDateTime = spDate
    .toISOString()
    .replace("T", " ")
    .split(".")[0];
  return {
    date: spDate,
    remainingTime,
    formattedDateTime,
  };
};
function calculateRemainingTime(targetDateString: string): string {
  const targetDate = new Date(targetDateString);
  const currentDate = new Date();

  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const totalMinutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}
