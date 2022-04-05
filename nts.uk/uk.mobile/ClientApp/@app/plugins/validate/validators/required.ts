import { _ } from '@app/provider';
import { IRule } from 'declarations';

export const required = function (value: any, checkOr: boolean, rule: IRule) {
    let msg = false;

    if (checkOr) {
        if (Array.isArray(value)) {
            msg = value.length === 0;
        } else if (value === undefined || value === null) {
            msg = true;
        } else if (value === false) {
            msg = false;
        } else if (value instanceof Date) {
            // invalid date won't pass
            msg = isNaN(value.getTime());
        } else if (typeof value === 'object') {
            if (rule.timeRange || rule.dateRange) {
                msg = _.isNil(value.start) || _.isNil(value.end);
            } else {
                msg = Object.keys(value).length === 0;
            }
        } else {
            msg = String(value).length === 0;
        }
    }

    return !msg ? null : 'MsgB_30';
};