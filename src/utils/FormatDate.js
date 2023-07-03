const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

export const formatDate = (date) => {
  return date.toLocaleDateString("tr-TR", options);
};
