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
export function calculateEndTimeDate(
    weekTimeSlots: IWeekTimeSlot[],
    startTimeDate: string,
    numClasses: number
): Date {
    const startDateTime = new Date(startTimeDate);
    let classesCount = 0;
    let currentDate = new Date(startDateTime);
    let endDateTime = null;

    while (classesCount < numClasses) {
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

                if (startDateTimeWithTimeSlot >= startDateTime) {
                    classesCount++;
                    endDateTime = startDateTimeWithTimeSlot;
                }
                if (classesCount === numClasses) {
                    break;
                }
            }
        }

        currentDate.setDate(currentDate.getDate() + 1);
    }

    if (endDateTime === null) {
        throw new Error("Cannot calculate end time date");
    }

    return endDateTime;
}
