interface IModalQueue {
    queue: Array<Function>;
    addToQueue: Function;
    deleteFromQueue: () => void;
};

export const modalQueue: IModalQueue = {
    queue: [],
    addToQueue: (callBack: Function) => {
        modalQueue.queue.push(callBack);
        if (modalQueue.queue.length === 1) {
            callBack(true);
        }
    },
    deleteFromQueue: () => {
        modalQueue.queue.shift();
        if (modalQueue.queue.length) {
            modalQueue.queue[0](true);
        }
    },
};