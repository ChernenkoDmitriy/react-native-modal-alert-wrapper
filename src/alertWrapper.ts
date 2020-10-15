import { AlertButton, AlertOptions, Alert } from "react-native";
import { modalQueue } from "./modalQueue";

interface IAlertWrapper {
    isShown: boolean;
    alert: (title: string, message?: string | undefined, buttons?: AlertButton[] | undefined, options?: AlertOptions | undefined) => void;
    addListenerOnShow: (listener: (isShown: boolean) => void) => Function;
    promt: (title: string,
        message?: string | undefined,
        callbackOrButtons?: AlertButton[] | ((text: string) => void) | undefined,
        type?: "default" | "plain-text" | "secure-text" | "login-password" | undefined,
        defaultValue?: string | undefined,
        keyboardType?: string | undefined) => void;
};

class AlertWrapperClass implements IAlertWrapper {
    static exist: boolean;
    static instance: AlertWrapperClass;
    private subscribers: Array<(isShown: boolean) => void> = [];
    private conterIsShown: number = 0;
    constructor() {
        if (AlertWrapperClass.exist) {
            return AlertWrapperClass.instance;
        }
        AlertWrapperClass.exist = true;
    }

    private toogleIsShow = (value: boolean) => {
        if ((this.conterIsShown === 0) && value) {
            this.subscribers.forEach(fn => fn(true));
        } else if ((this.conterIsShown === 1) && !value) {
            this.subscribers.forEach(fn => fn(false));
        }

        if (value) {
            this.conterIsShown += 1;
        } else {
            this.conterIsShown -= 1;
        }
    };

    get isShown(): boolean {
        return (this.conterIsShown > 0);
    };

    set isShown(_value: boolean) { };

    addListenerOnShow = (listener: (isShown: boolean) => void) => {
        this.subscribers.push(listener);
        return () => { this.subscribers = this.subscribers.filter(fn => fn !== listener) }
    };

    alert = (title: string, message?: string | undefined, buttons?: AlertButton[] | undefined, options?: AlertOptions | undefined): void => {
        let customButtons: AlertButton[] = [{ text: 'OK', onPress: () => { this.toogleIsShow(false); } }];
        if (Array.isArray(buttons)) {
            customButtons = buttons.map((item) => ({
                ...item,
                onPress: () => {
                    this.toogleIsShow(false);
                    if (item.onPress) {
                        item.onPress();
                    }
                }
            }));
        }
        this.toogleIsShow(true);
        setTimeout(() => {
            Alert.alert(title, message, customButtons, options);
        }, modalQueue.queue.length ? 250 : 0);
    }

    promt = (title: string,
        message?: string | undefined,
        callbackOrButtons?: AlertButton[] | ((text: string) => void) | undefined,
        type?: "default" | "plain-text" | "secure-text" | "login-password" | undefined,
        defaultValue?: string | undefined,
        keyboardType?: string | undefined): void => {

        let customButtons: AlertButton[] | Array<((text: string) => void)> = [
            { text: 'Cancel', onPress: () => { this.toogleIsShow(false); }, style: 'cancel' },
            { text: 'Ok', onPress: () => { this.toogleIsShow(false); } }
        ];

        if (Array.isArray(callbackOrButtons)) {
            customButtons = callbackOrButtons.map((item) => ({
                ...item,
                onPress: (value?: string) => {
                    this.toogleIsShow(false);
                    if (item.onPress) {
                        item.onPress(value);
                    }
                }
            }));
        }

        Alert.prompt(title, message, customButtons, type, defaultValue, keyboardType);
    }
}

const AlertWrapper = new AlertWrapperClass();

export default AlertWrapper;
