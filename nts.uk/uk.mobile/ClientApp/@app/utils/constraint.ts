import { obj } from '@app/utils';
import { IRule } from 'declarations';
import { TimeWithDay, TimePoint, TimeDuration} from '@app/utils/time';

const charTypes: {
    [key: string]: {
        width: number;
        viewName: string;
    }
} = {
    AnyHalfWidth: {
        width: 0.5,
        viewName: '半角'
    },
    AlphaNumeric: {
        width: 0.5,
        viewName: '半角英数字'
    },
    Alphabet: {
        width: 0.5,
        viewName: '半角英字'
    },
    Numeric: {
        width: 0.5,
        viewName: '半角数字'
    },
    Any: {
        width: 1,
        viewName: '全角'
    },
    Kana: {
        width: 1,
        viewName: 'カナ'
    },
    HalfInt: {
        width: 0.5,
        viewName: '半整数'
    },
    WorkplaceCode: {
        width: 0.5,
        viewName: '半角英数字'
    },
    EmployeeCode: {
        width: 0.5,
        viewName: '半角英数字'
    }
};

export const constraint = {
    html(primitive: IRule) {
        let $content = '';

        if (obj.isEmpty(primitive)) {
            return $content;
        }

        switch (primitive.valueType) {
            case 'String':
                let char = charTypes[primitive.charType] || charTypes.Any;

                $content += `${char.viewName}${constraint.getCharLength(primitive)}文字`;
                break;
            case 'Date':
                break;
            case 'Time':
            case 'Clock':
            case 'Duration':
            case 'TimePoint':
                $content += constraint.getTimeMinMax(primitive);
                break;
            case 'Decimal':
            case 'Integer':
                // $content += $content.length > 0 ? "/" : "";
                $content += constraint.getMinMax(primitive);
                break;
            default:
                break;
        }

        return $content;
    },
    getMinMax(primitive: IRule): string {
        return `${primitive.min}～${primitive.max}`;
    },
    getTimeMinMax(primitive: IRule): string {
        switch (primitive.valueType) {
            default:
                return '#{not_found}';
            case 'Clock':
                return `${TimeWithDay.toString(primitive.min as number)}～${TimeWithDay.toString(primitive.max as number)}`;
            case 'Duration':
                return `${TimeDuration.toString(primitive.min as number)}～${TimeDuration.toString(primitive.max as number)}`;
            case 'Time':
            case 'TimePoint':
                return `${TimePoint.toString(primitive.min as number)}～${TimePoint.toString(primitive.max as number)}`;
        }

    },
    getCharLength(primitive: IRule): number {
        let char = charTypes[primitive.charType] || charTypes.Any;

        return Math.floor(primitive.maxLength / (char.width * 2));
    },
    charTypes
};
