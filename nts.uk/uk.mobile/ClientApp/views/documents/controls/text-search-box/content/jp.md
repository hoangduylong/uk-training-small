##### 2. 説明
`nts-text-search`検索のためのコンポーネントである。  

検索タイプは２ある:  
- 手動検索: 検索ボタン<span class="fa fa-search"></span>を押したら検索する.
- 自動検索: 入力すると検索.

##### 3. 手動検索

ViewModelでは検索のために新しいメソッドを作ってください。このメソッドはパラメータが１ある。

**ViewModel**
```typescript
export class ViewModel extends Vue {

    // 検索ボタンを押すとき検索する
    public searchEvent(value: string) {
        
    }
}
```

HTMLでは`v-on:search`属性を持つ`nts-text-search`タグを作ってください。

**HTML**
```html
<nts-text-search v-on:search="searchEvent"/>
```

##### 4. 自動検索

ViewModelでは新しい変数を作ってください。

**ViewModel**
```typescript
export class ViewModel extends Vue {

    public searchText: string = null;
}
```

HTMLでは`v-model`を持つ`nts-text-search`タグを作ってください。

**HTML**
```html
<nts-text-search v-model="searchText"/>
```

##### 5. 補足情報

| 属性名　| 種類 | 初期値 | 説明 |
| --------------|------| -------- | ------|
| placeholder | string | '' | インプットのヒント |
| class-input | string | '' | インプットに適用するクラス |
| class-container | string | '' | コンポネントに適用するクラス |

著者：　Pham Van Dan