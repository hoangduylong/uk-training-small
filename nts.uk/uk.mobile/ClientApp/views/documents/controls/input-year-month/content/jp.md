##### 2. ビューでの定義

```html
<nts-year-month
      v-model="yearMonth"
      name="対象月"
    />
```

##### 3. ビューモデルでの定義

HTMLで`v-model="yearMonth"`を使えるためViewModelの中は`yearMonth`という変数を定義してください。  
`yearMonth`のフォーマットは'yyyymm'

```ts
export class ViewModel extends Vue {
    *
    *
    public yearMonth: number = 201905;
    *
    *
}
```
##### 4. 補足情報

| 属性名| 種類 | 初期値 | 説明 |
| --------------|------| -------- | ------|
| name | string | '' | 項目名 |
| disabled | boolean | false | 項目が無効される? |
| showTitle | boolean | true | ラベルを表示する？ |
| inlineTitle | boolean | false | ラベルと拘束は一行で表示する？ |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | ラベルとインプットを一行に表示したい時、これを修正ください。（例えば：{ title: 'col-md-6', input: 'col-md-6'}）|

---
(変更日 2019/09/09)  
任意項目なら、ピッカーに「削除」ボタンがあるが必須項目のピッカーには「削除」ボタンがない。  
任意項目や必須項目の設定方法について、 [Validations](/nts.uk.mobile.web/documents/plugins/validation)を参照してください。

**著者: Pham Van Dan**