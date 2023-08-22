import { checkLessonInOtherLessons, checkTimeCoincidence } from "../src/components/Modals/EditTimeSessionModal";




describe('Lesson Utils', () => {
    describe('checkLessonInOtherLessons', () => {
        it('should return true if time is within lesson start and end time', () => {
            const lesson = {
                StartDateTime: '2023-08-23T10:00:00Z',
                Duration: 60
            };
            const timeWithinLesson = new Date('2023-08-23T10:30:00Z');
            expect(checkLessonInOtherLessons(lesson, timeWithinLesson)).toBe(true);
        });

        it('should return false if time is before lesson start time', () => {
            const lesson = {
                StartDateTime: '2023-08-23T14:00:00Z',
                Duration: 45
            };
            const timeBeforeLesson = new Date('2023-08-23T13:30:00Z');
            expect(checkLessonInOtherLessons(lesson, timeBeforeLesson)).toBe(false);
        });

        it('should return false if time is after lesson end time', () => {
            const lesson = {
                StartDateTime: '2023-08-23T18:00:00Z',
                Duration: 90
            };
            const timeAfterLesson = new Date('2023-08-23T19:30:00Z');
            expect(checkLessonInOtherLessons(lesson, timeAfterLesson)).toBe(false);
        });
    });

    describe('checkTimeCoincidence', () => {
        it('should return true if two times are the same', () => {
            const time1 = new Date('2023-08-23T10:00:00Z');
            const time2 = new Date('2023-08-23T10:00:00Z');
            expect(checkTimeCoincidence(time1, time2)).toBe(true);
        });

        it('should return false if two times are different', () => {
            const time1 = new Date('2023-08-23T12:00:00Z');
            const time2 = new Date('2023-08-23T15:30:00Z');
            expect(checkTimeCoincidence(time1, time2)).toBe(false);
        });
    });
});
