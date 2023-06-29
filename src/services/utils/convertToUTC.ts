import moment from 'moment';


export function convertToUTC(data: any): any {
    moment(data).utc().format('YYYY-MM-DDTHH:mm:ss')
}

export function convertToLocaleTime(data: any[]): any[] {
    return data.map((session: any) => {
        const { StartDateTime, ...rest } = session;
        const localStartDateTime = moment.utc(StartDateTime).local().format('YYYY-MM-DDTHH:mm:ss');
        return { StartDateTime: localStartDateTime, ...rest };
    });
}
export function convertLocalToUTC(localTime: string): string {
    return moment(moment(localTime).add(1, 'day').format('YYYY-MM-DD')).utc().format('YYYY-MM-DDTHH:mm:ss');
}

export function convertSessionsToLocalTime(CurrentSessions: any) {
    const convertedSessions: any = [];

    CurrentSessions.forEach((session: any) => {
        const { StartDateTime, ...rest } = session;

        const localStartDateTime = moment.utc(StartDateTime).local().format('YYYY-MM-DDTHH:mm:ss');

        const convertedSession = {
            StartDateTime: localStartDateTime,
            ...rest,
        };

        convertedSessions.push(convertedSession);
    });

    return convertedSessions;
}