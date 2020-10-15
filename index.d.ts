declare module 'react-native-modal-alert-wrapper' {
    import * as React from 'react';
    interface ModalWrapperProps {
        animationType?: 'none' | 'slide' | 'fade' | undefined;
        hardwareAccelerated?: boolean;
        onDismiss?: () => void;
        onOrientationChange?: (event: any) => void | undefined;
        onRequestClose?: () => void | undefined;
        onShow?: (event: any) => void | undefined;
        presentationStyle?: 'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen' | undefined;
        statusBarTranslucent?: boolean;
        supportedOrientations?: ('portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right')[] | undefined;
        transparent?: boolean;
        visible: boolean;
    };

    export class ModalWrapper extends React.Component<ModalWrapperProps> { }

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

    export class AlertWrapper implements IAlertWrapper { }
};