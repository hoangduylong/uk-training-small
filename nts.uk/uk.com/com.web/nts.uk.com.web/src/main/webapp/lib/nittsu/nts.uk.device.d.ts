declare module nts.uk.devices {
    export type Felica = {
        close: () => void;
        status: () => number;
    };

    export type COMMAND = 'open' | 'close' | 'status' | 'connect' | 'disconnect' | 'read';
    export type CALL_BACK = (command: COMMAND, status: boolean | undefined, cardNo: string | undefined) => void;

    export function felica(callback: CALL_BACK): Felica;
}