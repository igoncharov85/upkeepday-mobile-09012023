import { parseISO, addMinutes, formatISO } from 'date-fns';
import moment from "moment";

export const formatDate = (
  dateString: string,
): {
  date: string[];
  time: [string, { hour: number; minute: number; dayPart: string }];
} => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const [month, day, year] = date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    })
    .split('/');
  const formattedDate2 = `${year}-${month.padStart(2, '0')}-${day?.padStart(
    2,
    '0',
  )}`;

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const timeObj = formattedTime.split(/:| /);
  const formattedTime2 = {
    hour: parseInt(timeObj[0]),
    minute: parseInt(timeObj[1]),
    dayPart: timeObj[2],
  };

  return {
    date: [formattedDate, formattedDate2],
    time: [formattedTime, formattedTime2],
  };
};

export const calculateEndDate = (
  startTime: string,
  duration: number,
): string => {
  const startDate = parseISO(startTime);
  const newDate = addMinutes(startDate, duration);
  const newDateTimeString = formatISO(newDate, { representation: 'complete' });
  return newDateTimeString;
};

type DateInput = {
  date: string;
  time: string | null;
};

export function convertDateTimeToISO({ date, time }: DateInput): string {
  const monthMapping: Record<string, string> = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const [month, dayWithComma, year] = date.split(" ");
  const day = dayWithComma.replace(",", "");
  let hourNumber, formattedHour, hour, minute, meridiem;

  if (time === null) {
    hourNumber = 0;
    formattedHour = "00";
  } else {
    [hour, minute, meridiem] = time.split(/[:\s]/);
    hourNumber = (parseInt(hour, 10) % 12) + (meridiem === "PM" ? 12 : 0);
    formattedHour = hourNumber.toString().padStart(2, "0");
  }

  const monthNumber = monthMapping[month];
  const dayNumber = day.padStart(2, "0");

  return `${year}-${monthNumber}-${dayNumber}T${formattedHour}:${minute || "00"}:00`;
}

export const getWeekDates = (date: Date) => {
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - date.getDay());
  const endDate = new Date(date);
  endDate.setDate(endDate.getDate() + 6);
  return { startDate: date, endDate: endDate };
};

export function convertDate(date: string): [string, string, string] {
  const parsedDate = moment(date, "MMM D, YYYY");
  const formattedDate = parsedDate.format("YYYY-MM-DD");
  const formattedDate2 = parsedDate.format("DD/MM/YYYY");
  const formattedDate3 = date.trim() ? parsedDate.format("MM/DD/YYYY") : "";

  return [formattedDate, formattedDate2, formattedDate3];
}
