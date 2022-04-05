##### 2. ビューで

ラジオを作るために`<nts-radio>`タグを使って`v-model`と`value`大切な属性を渡してください。
`v-model`はビューモデルにバインドされる属性
`value`はあのラジオの値
```html
<nts-radio v-model="checked1" value="1">Radio 1</nts-radio>
<nts-radio v-model="checked1" value="2">Radio 2</nts-radio>
<nts-radio v-model="checked1" value="3">Radio 3</nts-radio>
<nts-radio v-model="checked1" value="4">Radio 4</nts-radio>
```

ラジオの一覧を自動的に作るために`v-for`を使ってください。
```html
<nts-radio v-for="radio in radios"
    v-model="checked2"
    v-bind:value="radio.id">
    {{radio.name}}
</nts-radio>
```
> Use inline radio, add class `form-check-inline` to `nts-radio`.

##### 3. ビューモデル
```typescript
export class FormCheckComponent extends Vue {
    
    //　v-forを使わない
    public checked1: number = 3;

    // v-forを使う
    public radios = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' }
    ];
    public checked2: number = 2;
}
```
##### 3. 補足情報

| 属性名 | 種類 | 初期値 | 説明 |
| -----|---------|--------------|-----------|
| `disabled` | `boolean` | false | 無効？ |

**著者：Nguyen Van Vuong**