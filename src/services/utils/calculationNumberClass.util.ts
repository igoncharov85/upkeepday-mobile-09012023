import { IWeekTimeSlot } from "../../common/types/schedule.types";

interface WeekTimeSlot {
    Duration: number;
    WeekTimeSlotId: string;
    DayOfWeek: number;
    StartTime: string;
}

interface LessonSchedule {
    WeekTimeSlots: WeekTimeSlot[];
}

export function getNumberOfLessonsPerPeriod(
    lessonsPerWeek: number,
    startDate: Date,
    endDate: Date,
    lessonSchedule: IWeekTimeSlot[]
): number {
    const dayMs = 24 * 60 * 60 * 1000; // количество миллисекунд в дне
    const startDateMs = startDate.getTime();
    const endDateMs = endDate.getTime();
    const schedule = lessonSchedule;

    let count = 0;
    let currentDateMs = startDateMs;

    while (currentDateMs <= endDateMs) {
        const currentDayOfWeek = new Date(currentDateMs).getDay();
        const availableTimeSlots = schedule.filter(
            (slot) => slot.DayOfWeek === currentDayOfWeek
        );

        for (const slot of availableTimeSlots) {
            const slotStartDateTime = new Date(
                currentDateMs +
                parseInt(slot.StartTime.slice(0, 2)) * 60 * 60 * 1000 + // часы
                parseInt(slot.StartTime.slice(3, 5)) * 60 * 1000 + // минуты
                parseInt(slot.StartTime.slice(6, 8)) * 1000 // секунды
            );

            let slotEndDateTime = new Date(slotStartDateTime.getTime() + slot.Duration * 60 * 1000);

            // Если конечное время занятия попадает в следующий день, то
            // переносим его на этот день.
            if (slotEndDateTime.getDay() !== currentDayOfWeek) {
                slotEndDateTime = new Date(
                    slotEndDateTime.getTime() - dayMs + // вычитаем день
                    parseInt(slot.StartTime.slice(0, 2)) * 60 * 60 * 1000 + // часы
                    parseInt(slot.StartTime.slice(3, 5)) * 60 * 1000 + // минуты
                    parseInt(slot.StartTime.slice(6, 8)) * 1000 // секунды
                );
            }

            let currentDateTime = new Date(slotStartDateTime);
            while (currentDateTime <= slotEndDateTime) {
                if (currentDateTime.getTime() >= startDateMs && currentDateTime.getTime() <= endDateMs) {
                    count++;
                }

                currentDateTime = new Date(currentDateTime.getTime() + (7 / lessonsPerWeek) * dayMs);
            }
        }

        currentDateMs += dayMs;
    }

    return count;
}