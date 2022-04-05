##### 2. 説明
`nts-date-range-input`は開始日と終了日を入力させるコンポネントである。  

##### 3. ViewModel

ViewModelでは` { start: Date | null; end: Date | null }`のタイプの変数を定義してください。

```typescript
@component({
})
export class ViewModel extends Vue {
    // 定義して割り当てます
    public dateRange: { start: Date | null; end: Date | null } = {
        start: null,
        end: null
    };

}
```

##### 4. HTML

HTMLには`name`を`v-model`の属性を持つ&lt;nts-date-range-input&gt;タグを定義する:
- name: 項目名でラベルに表示される
- v-model: ViewModelに定義された変数を渡し、インプットの値を持つ

```html
<nts-date-range-input 
    name="Date range" 
    v-model="dateRange" />
```

##### 4. 補足情報

| 属性名| 種類 | 初期値 | 説明 |
| --------------|------| -------- | ------|
| name | string | '' | 項目名 |
| disabled | boolean | false | 項目が無効される? |
| showTitle | boolean | true | ラベルを表示する？ |
| inlineTitle | boolean | false | ラベルと制約は一行で表示する？ |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | ラベルとインプットを一行に表示したい時、これを修正ください。（例えば：{ title: 'col-md-6', input: 'col-md-6'}）|

著者：Nguyen Van Vuong
  