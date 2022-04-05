import { _ } from '@app/provider';

export const timeRange = function (value: { start: Number, end: Number }, checkOr: boolean) {
    if (checkOr && !_.isNil(value) && !_.isNil(value.end) && value.end < value.start) {
        return 'MsgB_49';
    }

    return null;
};