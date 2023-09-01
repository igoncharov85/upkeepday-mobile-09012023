export interface ILog {
    type: 'request' | 'response' | 'error' | 'library';
    name: string;
    message: string;
    id: string;
};

export type IType = 'request' | 'response' | 'error' | 'library';