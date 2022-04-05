##### 2. ビューでの定義

```html
<nts-text-area
    v-model="text"
    name='Textarea Item'/>
```

##### 3. ビューモデルでの定義

HTMLの`v-model="text"`を使えるためViewModelの中は`text`という変数を定義してください。  

```ts
export class ViewModel extends Vue {
    *
    *
    text: string = 'Init Value';
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
| ***rows*** | number| 3 |　表示される行数 |
| inlineTitle | boolean | false | ラベルと拘束は一行で表示する？ |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | ラベルとインプットを一行に表示したい時、これを修正ください。（例えば：{ title: 'col-md-6', input: 'col-md-6'}）|

**著者: Pham Van Dan**

