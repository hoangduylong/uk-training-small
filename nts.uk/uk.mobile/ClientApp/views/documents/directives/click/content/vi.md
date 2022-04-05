##### 2. Giải thích

> Trong **một số trường hợp cụ thể** như là một thao tác nhấp chuột có những thao tác yêu cầu truy vấn tới máy chủ để tải dữ liệu xuống. Những thao tác này không được phép xảy ra liên tục vì quá trình xử lý thao tác này là quá trình xử lý bất đồng bộ, nên có thể gây ra sai lệch dữ liệu hoặc làm máy chủ bị quá tải do phải xử lý nhiều truy vấn giống nhau.

> Để giải quyết vấn đề trên, một directive `v-click` được tạo ra để giải quyết vấn đề này. Cách sử dụng tương tự như `v-on:click` nhưng có thêm `arg`: `v-click:500`.

- `v-click` là directive thay thế cho `v-on:click`.
- `500` là giá trị thời gian (*ms*) được tính để hạn chế thao tác nhấp chuột liên tiếp, giá trị này được đặt mặc định là `0` nếu không được truyền vào.

> **Chú ý**: Giá trị 500 ở trên là giá trị tượng trưng, tuỳ thuộc vào từng thao tác mà có thể sẽ có giá trị khác nhau.

**HTML Code:**

```html
<button class="btn btn-primary mb-2" v-click:500="multiClick">{{ 'prevent_multi_click' | i18n }}</button>
```

**Typescript code:**

```typescript
class PreventMultiClick {
    multiClick() {
        this.results.push('Click time: ' + new Date().toISOString());
    }
}
```

##### 3. API

| Prop | Kiểu | Diễn giải |
| -----|--------------|-----------|
| v-click | directive | Tên của directive sử dụng để bind event click |
| arg | number | Giá trị thời gian cài đặt chống nhấp chuột liên tiếp |
