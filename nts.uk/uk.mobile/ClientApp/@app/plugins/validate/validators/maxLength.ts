import { IRule } from 'declarations';
import { text, constraint } from '@app/utils';

export const maxLength = function (value: string, length: number, rule: IRule) {
    if (value.length && text.countHalf(value) > Number(length)) {
        let cl: string = `${constraint.getCharLength(rule)}`;

        switch (rule.charType) {
            case 'Any':
                return ['MsgB_32', cl];
            case 'Kana':
                return ['MsgB_36', cl];
            case 'Numeric':
                return ['MsgB_34', cl];
            case 'AlphaNumeric':
                return ['MsgB_35', cl];
            case 'AnyHalfWidth':
                return ['MsgB_33', cl];
            default:
                break;
        }
    }

    return null;
};