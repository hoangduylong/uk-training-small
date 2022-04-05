##### 2. Khai báo trong index.html

```html
<nts-date-input
        v-model="date"
        name='DateItem'/>
```
##### 3. Khai báo trong index.ts
Khai báo một biến 'date' trong ViewModel để bind vào giá trị 'date' sử dụng ở v-model="date"

```ts
export class ViewModel extends Vue {
    *
    *
    date: Date = null;
    *
    *
}
```
<span class="fas fa-exclamation-triangle uk-text-required"></span> **Chú ý**:   
> Nếu tạo Date ở client, hãy sử dụng UTC. Việc này sẽ tạo ra một giá trị ngày theo múi giờ 0. <a href="https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC" target="_blank">Tham khảo Date.UTC</a> <br/>
> Trong trường hợp giá trị `date` được lấy về từ Server, thay vì trả về date ở dạng String, hãy sử dụng Date ở DTO.

##### 4. Thông tin bổ sung

"nts-date-input" là một dạng input trong UK-Mobile, vì thế nó có các thuộc tính chung của Input như là: 

| Tên Thuộc tính| Type | Mặc định | Mô tả |
| --------------|------| -------- | ------|
| name | string | '' | Tên hiển thị của item |
| disabled | boolean | false | Item có bị disable hay không? |
| showTitle | boolean | true | Có hiển thị title cùng input hay không? |
| inlineTitle | boolean | false | Constraint có hiển thị cùng một dòng mới title hay không? |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | Điều chỉnh để title và input hiển thị cùng một dòng. (Ví dụ: { title: 'col-md-6', input: 'col-md-6'})|

Người tạo: Phạm Văn Dân