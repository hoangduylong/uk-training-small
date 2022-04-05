##### 2. Code HTML

Để tạo ra các switchbox, hãy sử dụng cặp thẻ `<nts-switchbox>` và truyền vào 2 thuộc tính quan trọng là `v-model` và `value`  
`v-model` là giá trị sẽ được bind vào `ViewModel`  
`value` là giá trị tương ứng với 1 switchbox option  
```html
<nts-switchbox v-model="switchbox1" v-bind:value="1"> Value 1</nts-switchbox>
<nts-switchbox v-model="switchbox1" v-bind:value="2"> Value 2</nts-switchbox>
<nts-switchbox v-model="switchbox1" v-bind:value="3"> Value 3</nts-switchbox>
<nts-switchbox v-model="switchbox1" v-bind:value="4"> Value 4</nts-switchbox>
```

Bạn cũng có thể sử dụng v-for để tự động sinh ra một list `<nts-switchbox>` như sau.  
```html
<nts-switchbox v-for="option in datasource" 
    v-model="switchbox2" 
    v-bind:value="option.id">
        {{option.name}}
</nts-switchbox>
```

##### 3. Code ViewModel
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
##### 3. Các thuộc tính bổ xung

| Tên | Kiểu dữ liệu | Mặc định | Diễn giải |
| -----|---------|--------------|-----------|
| `disabled?` | `boolean` | false | switchbox option đó có bị disable hay không? |

**Tạo bởi: Nguyễn Văn Vương**