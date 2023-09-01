import { FirebaseMessaging, IMessaging } from "./firebase";
import { notificationHandler } from "./pushNotification/NotificationHandler";
import { IRestPost, requester } from "../requester";
import { ILinks, links } from "../../utils/Links";
import { IResponse } from "../requester/IRequester/IResponse";
import { Utils } from "../../utils/Utils";

class NotificationService {
    private static instance: NotificationService;

    _notificationHandler = notificationHandler;
    _messaging!: IMessaging;

    constructor(private requester: IRestPost, private links: ILinks,) {
        if (NotificationService.instance) {
            return NotificationService.instance;
        }
        this._messaging = new FirebaseMessaging();
        NotificationService.instance = this;
    }

    removeAllDeliveredNotifications = () => {
        this._notificationHandler.removeAllDeliveredNotifications();
    }

    register = async () => {
        try {
            const token = await this._messaging.getFCMToken();
            const body = { token, platform: Utils.isIOS ? 'ios' : 'android' }
            const response = await this.requester.post(this.links.registerToken, body);
            const result = this.processingResponse(response);
            return result;
        } catch (error) {
            console.warn('NotificationService -> register', JSON.stringify(error))
            return null;
        }
    }

    deleteToken = async () => {
        // const token = await this._messaging.getFCMToken();
        // await this._messaging.removeFCMToken();
        // const response = await this.requester.post(this.links.DELETE_FCM_TOKEN, { token });
        // const result = this.processingResponse(response);
        // return result;
    }

    subscribe = async () => {
        await this._messaging.getFCMToken();
        const unsubscribe = this._messaging?.subscribeAppWithFCM(this.onReceiveNotification);
        return unsubscribe;
    }

    private onReceiveNotification = (notification: any, _type: string) => {
        try {
            if (notification) {
                const { title, body } = notification?.notification;
                console.log(notification);
                this._notificationHandler.createLocalNotification(title, body, notification?.messageId, notification?.data);
            };
        } catch (error) {
            console.warn('NotificationService -> onReceiveNotification: ', error);
        }
    }

    private processingResponse = (response: any): IResponse => {
        let result: any = { isError: true, message: '' };
        if (response?.status < 400) {
            result = { isError: false, data: response.data, message: '' };
        } else if (response.error === 'validation') {
            result = { isError: true, message: response?.messages };
        } else {
            result = { isError: true, message: response?.message };
        }
        return result;
    }

}
export const notificationService = new NotificationService(requester, links);
