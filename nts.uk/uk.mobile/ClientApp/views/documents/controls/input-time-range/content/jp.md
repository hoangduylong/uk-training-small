##### 2. 説明

`nts-time-range-input`は開始と終了の入力をサポートするコンポネントです。

##### 3. ViewModel

ViewModelには時間範囲値を持つ変数を定義してください。  
`@Component.validations`に変数に同じ名前を定義して`timeRange = true`を設定してください。

```typescript
@component({
    ..
    validations: {
        value: {
            timeRange: true
            ..
        }
    }
})
export class ViewModel extends Vue {

    public value: { start: number, end: number} = null;
    ...
}
```

##### 3. HTML

time-range-inputを作るために&lt;nts-time-range-input&gt;作ってViewModelに定義した変数を`v-model`に設定してください。
```html
<nts-time-range-input v-model="value"/>
```

ラベルと一緒に表示するために`name`と`v-bind:showTitle="true"`を追加してください。

```html
<nts-time-range-input v-model="value" v-bind:showTile="true" name="Time Range"/>
```

##### 4. 補足情報

| 属性名| 種類 | 初期値 | 説明 |
| --------------|------| -------- | ------|
| name | string | '' | 項目名 |
| disabled | boolean | false | 項目が無効される? |
| showTitle | boolean | **false** | ラベルを表示する？ |
| inlineTitle | boolean | false | ラベルと制約は一行で表示する？ |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | ラベルとインプットを一行に表示したい時、これを修正ください。（例えば：{ title: 'col-md-6', input: 'col-md-6'}）|

著者：Nguyen Van Vuong