export const regexp = {
    allHalfNumeric: /^\d*$/,
    allHalfAlphabet: /^[a-zA-Z]*$/,
    allHalfAlphanumeric: /^[a-zA-Z0-9]*$/,
    allHalfKatakanaReg: /^[ｱ-ﾝｧ-ｫｬ-ｮｯｦ ﾞﾟ｡.ｰ､･'-]*$/,
    allFullKatakanaReg: /^[ァ-ー　。．ー、・’－ヴヽヾ]*$/,
    allHiragana: /^[ぁ-ん　ー ]*$/,
    workplaceCode: /^[a-zA-Z0-9_-]{1,10}$/,
    employeeCode: /^[a-zA-Z0-9 ]*$/
}, text = {
    countHalf(text: string): number {
        let count = 0;

        for (let i = 0; i < text.length; i++) {
            let c = text.charCodeAt(i);

            // 0x20 ～ 0x80: 半角記号と半角英数字
            // 0xff61 ～ 0xff9f: 半角カタカナ
            if ((0x20 <= c && c <= 0x7e) || (0xff61 <= c && c <= 0xff9f)) {
                count += 1;
            } else {
                count += 2;
            }
        }

        return count;
    },
    is: {
        halfNumeric(value: string) {
            return regexp.allHalfNumeric.test(value);
        },
        halfAlphabet(value: string) {
            return regexp.allHalfAlphabet.test(value);
        },
        halfAlphanumeric(value: string) {
            return regexp.allHalfAlphanumeric.test(value);
        },
        halfKatakanaReg(value: string) {
            return regexp.allHalfKatakanaReg.test(value);
        },
        fullKatakanaReg(value: string) {
            return regexp.allFullKatakanaReg.test(value);
        },
        allHiragana(value: string) {
            return regexp.allHiragana.test(value);
        }
    }
};