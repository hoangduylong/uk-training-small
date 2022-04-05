import { IRule } from 'declarations';
import { Vue, DirectiveBinding, VNode } from '@app/provider';

const nts_keydown = '$nts_number_keydown';

Vue.directive('number', {
    bind(el: HTMLInputElement) {
        el.type = 'text';
    },
    update(el: HTMLInputElement, binding: DirectiveBinding, vnode: VNode) {
        let rule = binding.value as IRule;

        if (el[nts_keydown]) {
            el.removeEventListener('keydown', el[nts_keydown]);
        }

        if (rule && (['Decimal', 'Integer', 'HalfInt'].indexOf(rule.valueType) > -1 || (rule.valueType === 'String' && rule.charType === 'Numeric'))) {
            el[nts_keydown] = (evt: KeyboardEvent) => {
                let val = el.value,
                    ss = el.selectionStart,
                    se = el.selectionEnd;

                // filter specs key
                if ([8, 9, 13, 16, 17, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46].indexOf(evt.keyCode) == -1) {
                    // fix bug cannot press [.] on numpad
                    if (!evt.key.match(/[\-\.0-9]|(Decimal)/g)) {
                        evt.preventDefault();
                    } else {
                        // calc new value after keypress
                        if (ss == se) {
                            if (se == 0) {
                                val = evt.key + val;
                            } else if (se == val.length) {
                                val += evt.key;
                            } else {
                                val = val.substring(0, ss) + evt.key + val.substring(se, val.length);
                            }
                        } else {
                            val = val.replace(val.substring(ss, se), evt.key);
                        }

                        // fix bug cannot press [.] on numpad
                        val = val.replace(/Decimal/, '.');

                        // accept negative key only first press
                        if (evt.key == '-' && (ss || el.value.indexOf('-') > -1)) {
                            evt.preventDefault();

                            return;
                        }

                        // accept only one pointer
                        if (evt.key == '.' && el.value.indexOf('.') > -1) {
                            evt.preventDefault();

                            return;
                        }

                        if (rule.valueType === 'String') {
                            let maxL = rule.maxLength;

                            if (val.length > maxL || ['.', '-'].indexOf(evt.key) > -1) {
                                evt.preventDefault();

                                return;
                            }
                        } else {
                            // case has constraint check value by type
                            let min = rule.min as number,
                                max = rule.max as number,
                                stma = String(Math.abs(max)),
                                stmi = String(Math.abs(min)),
                                mival = val,
                                maval = val;

                            // accept negative key if min < 0
                            if (evt.key == '-' && min >= 0) {
                                evt.preventDefault();

                                return;
                            }

                            if (min < 1) {
                                // accept once 0 char
                                if (val.match(/(^0{2,})|(^-?0{2,})/)) {
                                    evt.preventDefault();

                                    return;
                                }
                            } else {
                                // not accept char 0 offset = 0
                                if (val.match(/^0/)) {
                                    evt.preventDefault();

                                    return;
                                }
                            }

                            // calculate min & max value
                            if (max < 0) {
                                for (let i = mival.length - 1; i < stmi.length; i++) {
                                    if (stmi[i] != undefined) {
                                        if (stmi[i].match(/\d/)) {
                                            mival += '9';
                                        } else {
                                            mival += stmi[i];
                                        }
                                    }
                                }

                                for (let i = maval.length - 1; i < stma.length; i++) {
                                    if (stma[i] != undefined) {
                                        if (stma[i].match(/\d/)) {
                                            maval += '0';
                                        } else {
                                            maval += stma[i];
                                        }
                                    }
                                }
                            } else if (min < 0) {
                                if (val.indexOf('-') > -1) {
                                    for (let i = mival.length - 1; i < stmi.length; i++) {
                                        if (stmi[i] != undefined) {
                                            if (stmi[i].match(/\d/)) {
                                                mival += '9';
                                            } else {
                                                mival += stmi[i];
                                            }
                                        }
                                    }
                                } else {
                                    for (let i = maval.length; i < stma.length; i++) {
                                        if (stma[i] != undefined) {
                                            if (stma[i].match(/\d/)) {
                                                maval += '9';
                                            } else {
                                                maval += stma[i];
                                            }
                                        }
                                    }
                                }
                            } else {
                                for (let i = maval.length; i < stma.length; i++) {
                                    if (stma[i] != undefined) {
                                        if (stma[i].match(/\d/)) {
                                            maval += '9';
                                        } else {
                                            maval += stma[i];
                                        }
                                    }
                                }
                            }

                            // fix halfint max value
                            if (rule.valueType == 'HalfInt') {
                                maval = maval.replace(/\.\d$/, '.5');
                            }

                            let nmin = Number(mival),
                                nmax = Number(maval);

                            switch (rule.valueType) {
                                case 'Integer':
                                    if (evt.key == '.') {
                                        evt.preventDefault();

                                        return;
                                    }

                                    if (nmax < min || nmin > max) {
                                        evt.preventDefault();

                                        return;
                                    }
                                    break;
                                case 'HalfInt':
                                    let milen = val.replace('-', '').replace(/\d+/, '').replace('.', '').length;

                                    if (milen > 1 || (se == val.length - 1 && milen == 1 && ['0', '5'].indexOf(evt.key) == -1)) {
                                        evt.preventDefault();

                                        return;
                                    }

                                    if (nmax < min || nmin > max) {
                                        evt.preventDefault();

                                        return;
                                    }
                                    break;
                                case 'Decimal':
                                    let mdlen = val.replace('-', '').replace(/\d+/, '').replace('.', '').length;

                                    if (mdlen > rule.mantissaMaxLength) {
                                        evt.preventDefault();

                                        return;
                                    }

                                    if (nmax < min || nmin > max) {
                                        evt.preventDefault();

                                        return;
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                } else if ([8, 46].indexOf(evt.keyCode) > -1) { // key backspace || delete
                    // if value after delete out of range, preventDefault
                    let min = rule.min as number,
                        max = rule.max as number,
                        stma = String(Math.abs(max)),
                        stmi = String(Math.abs(min));

                    if (ss == se) {
                        if (evt.keyCode == 8) {
                            let mival = val.substring(0, ss - 1) + val.substring(se, val.length),
                                maval = mival;

                            // calculate min & max value
                            if (max < 0) {
                                for (let i = mival.length - 1; i < stmi.length; i++) {
                                    if (stmi[i] != undefined) {
                                        if (stmi[i].match(/\d/)) {
                                            mival += '9';
                                        } else {
                                            mival += stmi[i];
                                        }
                                    }
                                }

                                for (let i = maval.length - 1; i < stma.length; i++) {
                                    if (stma[i] != undefined) {
                                        if (stma[i].match(/\d/)) {
                                            maval += '0';
                                        } else {
                                            maval += stma[i];
                                        }
                                    }
                                }
                            } else if (min < 0) {
                                if (val.indexOf('-') > -1) {
                                    for (let i = mival.length - 1; i < stmi.length; i++) {
                                        if (stmi[i] != undefined) {
                                            if (stmi[i].match(/\d/)) {
                                                mival += '9';
                                            } else {
                                                mival += stmi[i];
                                            }
                                        }
                                    }
                                } else {
                                    for (let i = maval.length; i < stma.length; i++) {
                                        if (stma[i] != undefined) {
                                            if (stma[i].match(/\d/)) {
                                                maval += '9';
                                            } else {
                                                maval += stma[i];
                                            }
                                        }
                                    }
                                }
                            } else {
                                for (let i = maval.length; i < stma.length; i++) {
                                    if (stma[i] != undefined) {
                                        if (stma[i].match(/\d/)) {
                                            maval += '9';
                                        } else {
                                            maval += stma[i];
                                        }
                                    }
                                }
                            }

                            // fix halfint max value
                            if (rule.valueType == 'HalfInt') {
                                maval = maval.replace(/\.\d$/, '.5');
                            }

                            let nmin = Number(mival),
                                nmax = Number(maval);

                            if (nmax < min || nmin > max) {
                                evt.preventDefault();

                                return;
                            }
                        } else {
                            let mival = val.substring(0, ss) + val.substring(se + 1, val.length),
                                maval = mival;

                            // calculate min & max value
                            if (max < 0) {
                                for (let i = mival.length - 1; i < stmi.length; i++) {
                                    if (stmi[i] != undefined) {
                                        if (stmi[i].match(/\d/)) {
                                            mival += '9';
                                        } else {
                                            mival += stmi[i];
                                        }
                                    }
                                }

                                for (let i = maval.length - 1; i < stma.length; i++) {
                                    if (stma[i] != undefined) {
                                        if (stma[i].match(/\d/)) {
                                            maval += '0';
                                        } else {
                                            maval += stma[i];
                                        }
                                    }
                                }
                            } else if (min < 0) {
                                if (val.indexOf('-') > -1) {
                                    for (let i = mival.length - 1; i < stmi.length; i++) {
                                        if (stmi[i] != undefined) {
                                            if (stmi[i].match(/\d/)) {
                                                mival += '9';
                                            } else {
                                                mival += stmi[i];
                                            }
                                        }
                                    }
                                } else {
                                    for (let i = maval.length; i < stma.length; i++) {
                                        if (stma[i] != undefined) {
                                            if (stma[i].match(/\d/)) {
                                                maval += '9';
                                            } else {
                                                maval += stma[i];
                                            }
                                        }
                                    }
                                }
                            } else {
                                for (let i = maval.length; i < stma.length; i++) {
                                    if (stma[i] != undefined) {
                                        if (stma[i].match(/\d/)) {
                                            maval += '9';
                                        } else {
                                            maval += stma[i];
                                        }
                                    }
                                }
                            }

                            // fix halfint max value
                            if (rule.valueType == 'HalfInt') {
                                maval = maval.replace(/\.\d$/, '.5');
                            }

                            let nmin = Number(mival),
                                nmax = Number(maval);

                            if (nmax < min || nmin > max) {
                                evt.preventDefault();

                                return;
                            }
                        }
                    } else {
                        let mival = val.substring(0, ss) + val.substring(se, val.length),
                            maval = mival;

                        // calculate min & max value
                        if (max < 0) {
                            for (let i = mival.length - 1; i < stmi.length; i++) {
                                if (stmi[i].match(/\d/)) {
                                    mival += '9';
                                } else {
                                    mival += stmi[i];
                                }
                            }

                            for (let i = maval.length - 1; i < stma.length; i++) {
                                if (stma[i].match(/\d/)) {
                                    maval += '0';
                                } else {
                                    maval += stma[i];
                                }
                            }
                        } else if (min < 0) {
                            if (val.indexOf('-') > -1) {
                                for (let i = mival.length - 1; i < stmi.length; i++) {
                                    if (stmi[i].match(/\d/)) {
                                        mival += '9';
                                    } else {
                                        mival += stmi[i];
                                    }
                                }
                            } else {
                                for (let i = maval.length; i < stma.length; i++) {
                                    if (stma[i].match(/\d/)) {
                                        maval += '9';
                                    } else {
                                        maval += stma[i];
                                    }
                                }
                            }
                        } else {
                            for (let i = maval.length; i < stma.length; i++) {
                                if (stma[i].match(/\d/)) {
                                    maval += '9';
                                } else {
                                    maval += stma[i];
                                }
                            }
                        }

                        // fix halfint max value
                        if (rule.valueType == 'HalfInt') {
                            maval = maval.replace(/\.\d$/, '.5');
                        }

                        let nmin = Number(mival),
                            nmax = Number(maval);

                        if (nmax < min || nmin > max) {
                            evt.preventDefault();

                            return;
                        }
                    }
                }
            };

            el.addEventListener('keydown', el[nts_keydown]);
        }
    },
    unbind(el: HTMLElement) {
        if (el[nts_keydown]) {
            el.removeEventListener('keydown', el[nts_keydown]);
        }
    }
});