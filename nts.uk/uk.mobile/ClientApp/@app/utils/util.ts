import { _ } from '@app/provider';

export namespace util {
    
    export function orDefault(valueMaybeEmpty: any, defaultValue: any) {
        return _.isNil(valueMaybeEmpty) ? defaultValue : valueMaybeEmpty;
    }
}