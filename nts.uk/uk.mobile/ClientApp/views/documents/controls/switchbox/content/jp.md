##### 2. ビューで

スイッチボックスを作るために`<nts-switchbox>`タグを使って`v-model`と`value`大切な属性を渡してください。  
`v-model`はビューモデルにバインドされる属性  
`value`はあのスイッチボックスのオプションの値
```html
<nts-switchbox v-model="switchbox1" v-bind:value="1"> Value 1</nts-switchbox>
<nts-switchbox v-model="switchbox1" v-bind:value="2"> Value 2</nts-switchbox>
<nts-switchbox v-model="switchbox1" v-bind:value="3"> Value 3</nts-switchbox>
<nts-switchbox v-model="switchbox1" v-bind:value="4"> Value 4</nts-switchbox>
```

スイッチボックスの一覧を自動的に作るために`v-for`を使ってください。
```html
<nts-switchbox v-for="option in datasource" 
    v-model="switchbox2" 
    v-bind:value="option.id">
        {{option.name}}
</nts-switchbox>
```

##### 3. ビューモデル
```typescript
export class FormCheckComponent extends Vue {
    
    // don't use v-for
    public switchbox1: number = 2;
    
    // use v-for
    public datasource = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' }
    ];
    public switchbox2: number = 3;
}
```
##### 3. 補足情報

| 属性名 | 種類 | 初期値 | 説明 |
| -----|---------|--------------|-----------|
| `disabled` | `boolean` | false | 無効？ |

**著者：Nguyen Van Vuong**