## 2. Khai báo trong index.html

```html
<nts-year-month
      v-model="yearMonth"
      name="対象月"
    />
```

## 3. Khai báo trong index.ts

Khai báo một biến 'yearMonth' trong class chính để bind vào giá trị 'yearMonth' trong v-model="yearMonth"  
Giá trị của yearMonth là kiểu **number**, có dạng 'yyyymm'.

```ts
export class ViewModel extends Vue {
    *
    *
    public yearMonth: number = 201905;
    *
    *
}
```
## 4. Thông tin bổ sung

"nts-year-month" là một dạng input trong UK-Mobile, vì thế nó có các thuộc tính chung của Input như là: 

| Tên Thuộc tính| Type | Mặc định | Mô tả |
| --------------|------| -------- | ------|
| name | string | '' | Tên hiển thị của item |
| disabled | boolean | false | Item có bị disable hay không? |
| showTitle | boolean | true | Có hiển thị title cùng input hay không? |
| inlineTitle | boolean | false | Constraint có hiển thị cùng một dòng mới title hay không? |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | Điều chỉnh để title và input hiển thị cùng một dòng. (Ví dụ: { title: 'col-md-6', input: 'col-md-6'})|

Khi khai báo nts-year-month trong index.html, bạn có thể truyền thêm các tham số này nếu muốn.  

---
(update tài liệu 09/09/2019)  
Với item tùy chọn, khi bật picker lên, sẽ hiển thị button "xóa". Trong khi đó, item bắt buộc sẽ không hiển thị button "xóa".  
Để biết cách cài đặt item là "tùy chọn" hay "bắt buộc", xem [Validations](/nts.uk.mobile.web/documents/plugins/validation)

**Tạo bởi: Phạm Văn Dân**

