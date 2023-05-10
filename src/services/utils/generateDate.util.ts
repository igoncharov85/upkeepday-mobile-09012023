
export const isToday = (dayIndex: number) => {
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay();
    return dayIndex === currentDayIndex;
};
export function getToday(date: Date): [string, number] {

    const year = date.getFullYear();
    const month = (date.getMonth() + 1);
    const day = date.getDate();
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    return [dateString, day];
}
export const getStartAndEndOfWeek = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return { startOfWeek, endOfWeek };
};
export const createWeekStructure = (
    startOfWeek: Date,
    endOfWeek: Date,
    timeData: Array<string>,
    dataOfMonth?: Array<any>,
) => {
    const weekStructure = new Array(7)
        .fill(null)
        .map(() => new Array(timeData?.length).fill(null));

    dataOfMonth && dataOfMonth.forEach(event => {
        const eventDate: Date = new Date(event.StartDateTime);
        if (eventDate >= startOfWeek && eventDate <= endOfWeek) {
            const dayIndex = eventDate.getDay();
            const hourIndex = eventDate.getHours();
            weekStructure[dayIndex][hourIndex] = event;
        }
    });

    return weekStructure;
};

export const generateTimeData = (startTime: string, endTime: string) => {
    const startHour = parseInt(startTime.split(':')[0], 10);
    const endHour = parseInt(endTime.split(':')[0], 10);
    const timeData = [];

    for (let hour = startHour; hour <= endHour; hour++) {
        let amPm = hour < 12 ? 'am' : 'pm';
        let hour12 = hour === 0 ? 12 : hour <= 12 ? hour : hour - 12;
        let hourStr = hour === 12 ? 'Noon' : hour === 24 ? '12 am' : `${hour12} ${amPm}`;
        timeData.push(hourStr);
    }

    return timeData;
};

export function addDayAndHoursToDate(dateStr: string, day: number, hour: number): string {
    const date = new Date(dateStr);
    date.setDate(date.getDate() + day);
    date.setHours(date.getHours() + hour);
    return date.toISOString();
}