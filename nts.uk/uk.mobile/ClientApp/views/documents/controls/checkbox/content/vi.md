##### 2. Code HTML

Để tạo ra các checkbox, hãy sử dụng cặp thẻ `<nts-checkbox>` và truyền vào 2 thuộc tính quan trọng là `v-model` và `value`  
`v-model` là giá trị sẽ được bind vào `ViewModel`  
`value` là giá trị tương ứng với 1 checkbox option  
```html
<nts-checkbox v-model="checked1s" v-bind:value="1">Check 1</nts-checkbox>
<nts-checkbox v-model="checked1s" v-bind:value="2">Check 2</nts-checkbox>
<nts-checkbox v-model="checked1s" v-bind:value="3">Check 3</nts-checkbox>
<nts-checkbox v-model="checked1s" v-bind:value="4">Check 4</nts-checkbox>
```

Bạn cũng có thể sử dụng v-for để tự động sinh ra một list `<nts-checkbox>` như sau.  
```html
<nts-checkbox v-for="option in datasource" 
    v-model="checked2s" 
    v-bind:value="option.id" >
        {{option.name}}
</nts-checkbox>
```
> Để sử dụng inline checkbox, chỉ cần thêm class `form-check-inline` vào `nts-checkbox` tương ứng.
##### 3. Code ViewModel
```typescript
export class FormCheckComponent extends Vue {
    
    // don't use v-for
    public checked1s: Array<number> = [1, 3];

    // use v-for
    public datasource = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' }
    ];
    public checked2s: Array<number> = [2, 4];
}
```
##### 3. Các thuộc tính bổ xung

| Tên | Kiểu dữ liệu | Mặc định | Diễn giải |
| -----|---------|--------------|-----------|
| `disabled?` | `boolean` | false | Checkbox option đó có bị disable hay không? |

**Tạo bởi: Phạm Văn Dân**