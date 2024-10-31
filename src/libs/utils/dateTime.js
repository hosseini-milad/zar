import moment from "jalali-moment";
export const dateToPersian = (date) => {
  return moment(date, "YYYY jMMMM jDD")
    .locale("fa")
    .format("jMMMM jYYYY jDD  HH:MM");
};

export const datePersian = (date, type = "dateTime") => {
  const format = type === "dateTime" ? "YYYY/MM/DD - HH:mm" : "YYYY/MM/DD";
  return moment(date).locale("fa").format(format);
};

export const onlyDatePersian = (date) => {
  return moment(date).locale("fa").format("YYYY/MM/DD");
};
