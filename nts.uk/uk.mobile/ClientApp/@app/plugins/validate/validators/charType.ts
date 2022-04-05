import { IRule } from 'declarations';
import { text, constraint } from '@app/utils';

export const charType = function (value: string, type: 'Any' | 'Kana' | 'AnyHalfWidth' | 'AlphaNumeric' | 'Numeric', rule: IRule) {
    let cl: string = `${constraint.getCharLength(rule)}`;

    switch (type) {
        case 'Any':
            break;
        case 'AnyHalfWidth':
            if (!text.is.halfAlphabet(value)) {
                return ['MsgB_33', cl];
            }

            break;
        case 'Numeric':
            if (!text.is.halfNumeric(value)) {
                return ['MsgB_34', cl];
            }

            break;
        case 'AlphaNumeric':
            if (!text.is.halfAlphanumeric(value)) {
                return ['MsgB_35', cl];
            }

            break;
        case 'Kana':
            if (!text.is.fullKatakanaReg(value)) {
                return ['MsgB_36', cl];
            }

            break;
        default:
            break;
    }

    return null;
};