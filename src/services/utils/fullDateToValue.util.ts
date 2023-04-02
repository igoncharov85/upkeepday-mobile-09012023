import {parseISO, addMinutes, formatISO} from 'date-fns';

export const formatDate = (
  dateString: string,
): {
  date: string[];
  time: [string, {hour: number; minute: number; dayPart: string}];
} => {
  const date = new Date(dateString);

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const [month, day, year] = date
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .split('/');
  const formattedDate2 = `${year}-${month.padStart(2, '0')}-${day.padStart(
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
  const newDateTimeString = formatISO(newDate, {representation: 'complete'});
  return newDateTimeString;
};
