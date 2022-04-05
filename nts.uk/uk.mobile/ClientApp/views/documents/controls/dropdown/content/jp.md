##### 2. 説明
>　「nts-dropdown」は「UK－MOBILE」にビューモデルからビューへにデータのバインドをサポートするコンポネントである。  

###### 2.1 ビューでの定義
>「nts-dropdown」を定義のため「name」と「v-model」の属性を渡しなければならない。  
■　`name`はコンポネント名でラベルが表示される時表示される。   
■　`v-model`はビューモデルとビューの連結です。  

**HTML Code:**
```html
<nts-dropdown name="DropDown Item" v-model="selectedValue">
    <option v-for="item in dropdownList" :value="item.code">
        {{item.code}} &nbsp;&nbsp;&nbsp;  {{item.text}}
    </option>
</nts-dropdown>
```
###### 2.2　ビューモデルでの定義

```typescript
export class ViewModel extends Vue {
    // nts-dropdownにバインドされる値
    selectedValue: string = '3';
    
    // 各オプションにバインドされるデータソース
    dropdownList: Array<Object> = [{
        code: '1',
        text: "The First"
    }, {
        code: '2',
        text: "The Second"
    }, {
        code: '3',
        text: "The Third"
    }, {
        code: '4',
        text: "The Fourth"
    },{
        code: '5',
        text: "The Fifth"
    }];
}
```

##### 3. API

| 属性名| 種類 | 初期値 | 説明 |
| --------------|------| -------- | ------|
| name | string | '' | 項目名 |
| disabled | boolean | false | 項目が無効される? |
| showTitle | boolean | true | ラベルを表示する？ |
| inlineTitle | boolean | false | ラベルと拘束は一行で表示する？ |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | ラベルとインプットを一行に表示したい時、これを修正ください。（例えば：{ title: 'col-md-6', input: 'col-md-6'}）|

著者：Nguyen Van Vuong
