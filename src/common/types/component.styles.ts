export interface INavigationBase {
    navigation: any
    route: any
}
export interface IToastModal {
    type: 'warning' | 'error' | 'info',
    text1?: string,
    text2?: string
    autoHide?: boolean
}
export type TSetPasswordScreen = 'email' | 'setpass';
export type TRegistrationScreen = 'tutor' | 'type' | 'student' | 'final'