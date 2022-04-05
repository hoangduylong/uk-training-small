##### 2. Validationとは？

`Validation`は入力した値を検証するプラグインです。  
このプラグインを使うため、`@component`の中に`validations`属性を定義してください。  

例えば：

```typescript
@component({
    validations: {
        textValue: {
            required: true,
        },
        numberValue: {
            required: true
        }
    }
})
export class ViewModel extends Vue {
    
    public textValue: string = 'nittsu';

    public numberValue: number = 1;

}
```

'textValue'や'numberValue'は`validations`に`required: true`と定義されたから入力しないと`Validation`プライマスがエラーを出します。

検証は2タイプがります：
- `fixed validate`: 基盤チームが定義した検証タイプ. 例えば: required, min, max.
- `custom validate`: 実装者が定義する検証タイプ


##### 3. Fixed validators
検証タイプ | 値型 | 初期値 | 説明
----|----|---------| ------------
required | Boolean | false | 必須
min | Number | undefined | 最小
max | Number | undefined | 最大
maxLength | Number | undefined | 最大長
charType | String | undefined |　文字型: Kana, AnyHalfWidth, AlphaNumeric, Numeric, Any
dateRange | Boolean | false | 値型はdate-rangeタイプ？
timeRange | Boolean | false | 値型はtime-rangeタイプ？

##### 4. Custom validators

例えば`textValue`変数を検証したい場合はこういう方で定義してください。
```typescript
@component({
    validations: {
        textValue: {
            test: Regex; //正規表現
            message: string;
        }
    }
})
```
や
```typescript
@component({
    validations: {
        textValue: {
            test: (value) {
                // 実装者の処理
            };
            message: string;
        }
    }
})
```
`textValue`の値が変更されると`test`関数が呼ばれます。`test`関数が`false`を渡ったら、エラーメッセージが出てきます。  

著者: **Nguyen Van vuong**