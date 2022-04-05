const $uuid = {
    randomId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            // tslint:disable-next-line: no-bitwise
            let r = Math.random() * 16 | 0;

            // tslint:disable-next-line: no-bitwise
            return ((c == 'x') ? r : (r & 0x3 | 0x8)).toString(16);
        });
    },
    get domId() {
        return Math.random().toString(36).slice(2, 12);
    }
};

export { $uuid };