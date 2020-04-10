export const constants = {
  apiUrl: "https://covid19.mathdro.id/api/",
  recoveredColor: "#079F41",
  deathColor: "#ED163D"
};

export const getPercentage = (amount, total) =>
  ((amount / total) * 100).toFixed(2);
