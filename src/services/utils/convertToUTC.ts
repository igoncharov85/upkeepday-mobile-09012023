import moment from 'moment';


export function convertToUTC(data: any): any {
    if (typeof data === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(data)) {
        let date = new Date(data);
        return date.toISOString();
    } else if (Array.isArray(data)) {
        return data.map(convertToUTC);
    } else if (typeof data === 'object') {
        let result: any = {};
        for (const key in data) {
            result[key] = convertToUTC(data[key]);
        }
        return result;
    } else {
        return data;
    }
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
    console.log("до", CurrentSessions);
    console.log("після", convertedSessions);

    return convertedSessions;
}