##### 2. ビューで

チェックボックスを作るために`<nts-checkbox>`タグを使って`v-model`と`value`大切な属性を渡してください。  
`v-model`はビューモデルにバインドされる属性  
`value`はあのチェックボックスのオプションの値
```html
<nts-checkbox v-model="checked1s" v-bind:value="1">Check 1</nts-checkbox>
<nts-checkbox v-model="checked1s" v-bind:value="2">Check 2</nts-checkbox>
<nts-checkbox v-model="checked1s" v-bind:value="3">Check 3</nts-checkbox>
<nts-checkbox v-model="checked1s" v-bind:value="4">Check 4</nts-checkbox>
```

チェックボックスの一覧を自動的に作るために`v-for`を使ってください。
```html
<nts-checkbox v-for="option in datasource" 
    v-model="checked2s" 
    v-bind:value="option.id" >
        {{option.name}}
</nts-checkbox>
```
> Use inline checkbox, add class `form-check-inline` to `nts-checkbox`.

##### 3. ビューモデル
```typescript
export class FormCheckComponent extends Vue {
    
    //　v-forを使わない
    public checked1s: Array<number> = [1, 3];

    // v-forを使う
    public datasource = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' }
    ];
    public checked2s: Array<number> = [2, 4];
}
```
##### 3. 補足情報

| 属性名 | 種類 | 初期値 | 説明 |
| -----|---------|--------------|-----------|
| `disabled` | `boolean` | false | 無効？ |

**著者：Pham Van Dan**