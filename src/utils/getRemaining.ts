import dayjs from "dayjs";

const now: Date = new Date();
const oneDay: number = 86400000;

export const getYear = (): number => {
  const start: Date = new Date(now.getFullYear(), 0, 0);
  const diff: number = now.valueOf() - start.valueOf();
  const dayOfTheYear: number = Math.floor(diff / oneDay);

  const year: number = ((dayOfTheYear - 1) / 365) * 100 + getDay() / 365;
  return year;
};

export const getMonth = (): number => {
  const start: Date = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const remain: number =
    start.getDate() > now.getDate() ? start.getDate() - now.getDate() : 0;

  const month: number =
    (remain / dayjs().daysInMonth()) * 100 + getDay() / dayjs().daysInMonth();
  return 100 - month;
};

export const getWeek = (): number => {
  const remain: number = 6 - dayjs().day();

  const week: number = ((6 - remain) / 7) * 100 + getDay() / 7;
  return week;
};

export const getDay = (): number => {
  const start: Date = new Date();
  start.setHours(24, 0, 0);
  if (now > start) start.setDate(start.getDate() + 1);
  const remain: number = start.valueOf() - now.valueOf();

  const day: number = ((oneDay - remain) / oneDay) * 100;
  return day;
};
