##### 2. Code HTML

Để tạo ra các radios, hãy sử dụng cặp thẻ `<nts-radio>` và truyền vào 2 thuộc tính quan trọng là `v-model` và `value`  
`v-model` là giá trị sẽ được bind vào `ViewModel`  
`value` là giá trị tương ứng với 1 radio option  
```html
<nts-radio v-model="checked2" value="1">Radio 1</nts-radio>
<nts-radio v-model="checked2" value="2">Radio 2</nts-radio>
<nts-radio v-model="checked2" value="3">Radio 3</nts-radio>
<nts-radio v-model="checked2" value="4">Radio 4</nts-radio>
```

Bạn cũng có thể sử dụng v-for để tự động sinh ra một list `<nts-radio>` như sau.  

```html
<nts-radio v-for="radio in radios"
    v-model="checked1"
    v-bind:value="radio.id">
    {{radio.name}}
</nts-radio>
```
> Để sử dụng inline radio, chỉ cần thêm class `form-check-inline` vào `nts-radio` tương ứng.

##### 3. Code ViewModel
```typescript
export class FormCheckComponent extends Vue {
    
    // don't use v-for
    public checked1: number = 3;

    // use v-for
    public radios = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' },
        { id: 4, name: 'Option 4' }
    ];
    public checked2: number = 2;
}
```
##### 3. Các thuộc tính bổ xung

| Tên | Kiểu dữ liệu | Mặc định | Diễn giải |
| -----|---------|--------------|-----------|
| `disabled?` | `boolean` | false | Radio đó có bị disable hay không? |

**Tạo bởi: Nguyễn Văn Vương**