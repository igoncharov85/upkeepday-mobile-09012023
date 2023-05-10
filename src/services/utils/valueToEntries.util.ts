export const valueToEntries = (values: Array<string>) => {
    values = values?.length ? values : [];
    return values.map(el => ({ value: el, key: el }));
};