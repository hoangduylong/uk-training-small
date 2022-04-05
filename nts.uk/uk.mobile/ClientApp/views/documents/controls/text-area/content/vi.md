##### 2. Khai báo trong index.html

```html
<nts-text-area
    v-model="text"
    name='Textarea Item'/>
```

##### 3. Khai báo trong index.ts

Khai báo một biến 'text' trong class chính để bind vào giá trị 'text' trong v-model="text"

```ts
export class ViewModel extends Vue {
    *
    *
    text: string = 'Init Value';
    *
    *
}
```
##### 4. Thông tin bổ sung

"nts-text-area" là một dạng input trong UK-Mobile, vì thế nó có các thuộc tính chung của Input như là: 

| Tên Thuộc tính| Type | Mặc định | Mô tả |
| --------------|------| -------- | ------|
| name | string | '' | Tên hiển thị của item |
| disabled | boolean | false | Item có bị disable hay không? |
| showTitle | boolean | true | Có hiển thị title cùng input hay không? |
| rows | number| 3 |　Số dòng được hiển thị của text area |
| inlineTitle | boolean | false | Constraint có hiển thị cùng một dòng mới title hay không? |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | Điều chỉnh để title và input hiển thị cùng một dòng. (Ví dụ: { title: 'col-md-6', input: 'col-md-6'})|

Khi khai báo nts-text-area trong index.html, bạn có thể truyền thêm các tham số này nếu muốn.  
   
    
**Tạo bởi: Phạm Văn Dân**
