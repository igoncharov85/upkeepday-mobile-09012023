

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

export function convertUTCToLocal(data: any): any {
    if (typeof data === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(data)) {
        let date = new Date(data);
        let localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return localDate.toISOString().slice(0, -1);
    } else if (Array.isArray(data)) {
        return data.map(convertUTCToLocal);
    } else if (typeof data === 'object') {
        let result: any = {};
        for (const key in data) {
            result[key] = convertUTCToLocal(data[key]);
        }
        return result;
    } else {
        return data;
    }
}
