import { IRule } from 'declarations';
import { constraint } from '@app/utils';
import { TimeWithDay, TimeDuration, TimePoint } from '@app/utils/time';

export const min = function (value: number | Date, min: number | Date, rule: IRule) {
    let lgt: boolean = value < min,
        constr: string = constraint.getMinMax(rule);

    if (lgt) {
        switch (rule.valueType) {
            case 'Integer':
                return ['MsgB_37', `${rule.min}`, `${rule.max}`];
            case 'Decimal':
                let min = `${rule.min}`,
                    max = `${rule.max}`;

                if (rule.mantissaMaxLength) {
                    if (!min.match(/\./) && !max.match(/\./)) {
                        return ['MsgB_40', min, max, `${rule.mantissaMaxLength}`];
                    } else {
                        return ['MsgB_41', `${max.split('.')[0].length}`, `${rule.mantissaMaxLength}`];
                    }
                } else {
                    return ['MsgB_39', `${rule.min}`, `${rule.mantissaMaxLength}`];
                }
            case 'Date':
                return ['MsgB_45', `${rule.min}`, `${rule.max}`];
            case 'Clock':
                return ['MsgB_45', TimeWithDay.toString(rule.min as number), TimeWithDay.toString(rule.max as number)];
            case 'Time':
            case 'TimePoint':
                return ['MsgB_45', TimePoint.toString(rule.min as number), TimePoint.toString(rule.max as number)];
            case 'Duration':
                return ['MsgB_44', TimeDuration.toString(rule.min as number), TimeDuration.toString(rule.max as number)];
            default:
                break;
        }
    }

    return null;
};
