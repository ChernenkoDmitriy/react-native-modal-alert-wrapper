import React, { FC, memo, useEffect, useState } from 'react';
import { Modal } from 'react-native';
import AlertWrapper from './alertWrapper';
import { modalQueue } from './modalQueue';

interface Props {
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
    children: any;
};

const ModalWrapper: FC<Props> = memo((props: Props) => {
    const { transparent, animationType, hardwareAccelerated, onDismiss, onOrientationChange, onRequestClose, presentationStyle, statusBarTranslucent, supportedOrientations } = props;
    const [isAlertShown, setIsAlertShown] = useState(AlertWrapper.isShown);
    const [isModalShown, setIsModalShown] = useState(false);

    useEffect(() => {
        const unsubscribers = AlertWrapper.addListenerOnShow(setIsAlertShown);
        return unsubscribers;
    }, []);

    useEffect(() => {
        if (props.visible && !isModalShown) {
            modalQueue.addToQueue(setIsModalShown);
        } else if (isModalShown && !props.visible) {
            modalQueue.deleteFromQueue();
        }
    }, [props.visible, isModalShown])

    return (
        <Modal
            visible={props.visible && !isAlertShown && isModalShown}
            onShow={props.onShow}
            transparent={transparent}
            supportedOrientations={supportedOrientations}
            statusBarTranslucent={statusBarTranslucent}
            presentationStyle={presentationStyle}
            onRequestClose={onRequestClose}
            onOrientationChange={onOrientationChange}
            onDismiss={onDismiss}
            hardwareAccelerated={hardwareAccelerated}
            animationType={animationType}>
            {props.children}
        </Modal>
    );
});

export default ModalWrapper;