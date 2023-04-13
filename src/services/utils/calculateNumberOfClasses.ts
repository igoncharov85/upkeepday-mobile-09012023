interface IWeekTimeSlot {
    Duration: number;
    DayOfWeek: number;
    StartTime: string;
}

export function calculateNumberOfClasses(
    weekTimeSlots: IWeekTimeSlot[],
    startTimeDate: string,
    endTimeDate: string
): number {
    const startDateTime = new Date(startTimeDate);
    const endDateTime = new Date(endTimeDate);
    let numClasses = 0;

    for (
        let currentDate = startDateTime;
        currentDate <= endDateTime;
        currentDate.setDate(currentDate.getDate() + 1)
    ) {
        const dayOfWeek = currentDate.getDay();

        for (const timeSlot of weekTimeSlots) {
            if (dayOfWeek === timeSlot.DayOfWeek) {
                const startHour = parseInt(timeSlot.StartTime.split(":")[0]);
                const startMinute = parseInt(timeSlot.StartTime.split(":")[1]);
                const startDateTimeWithTimeSlot = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    startHour,
                    startMinute,
                    0
                );

                if (startDateTimeWithTimeSlot >= startDateTime && startDateTimeWithTimeSlot <= endDateTime) {
                    numClasses++;
                }
            }
        }
    }

    return numClasses;
}
