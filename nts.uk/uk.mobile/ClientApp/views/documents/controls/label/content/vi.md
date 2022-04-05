##### 2. Mã html
> `nts-label` là view control được sử dụng để bind `name` và `constraint` của một `model` lên view để người sử dụng có thể nhận biết một cách trực quan các thông tin cần nhập vào `model` thông qua các input control.
> <br />Có một số dạng `label` mà `nts-label` hỗ trợ như ví dụ dưới đây.
-----
###### 2.1 Không có ràng buộc
```html
<nts-label>{{'not_required_label' | i18n}}</nts-label>
```
###### 2.2 Có ràng buộc

> Thêm `v-bind:constraint` vào control, giá trị nhận vào là một `object`, có thể lấy các `constraint` này trực tiếp từ `validations` được khai báo trên [`decorator`](/nts.uk.mobile.web/documents/component/basic).
```html
<nts-label v-bind:constraint="{required: true}">{{'required_label' | i18n}}</nts-label>
```
###### 2.3 Có ràng buộc (chế độ 1 dòng)
> Để hiển thị một label có `name` & `constraint` dưới dạng `inline` (một dòng), chỉ cần thêm `class`: `control-label-inline` vào như một `attribute` của control theo ví dụ dưới đây.
```html
<nts-label v-bind:constraint="{required: true, min: 100, max: 1000}" class="control-label-inline">{{'sample_label' | i18n}}</nts-label>
```

###### 2.4 Không hiển thị ràng buộc
> Để ẩn ràng buộc của một label (*cho một model*) ta có thể không sử dụng `constraint` hoặc chỉ sử dụng `constraint` có thuộc tính `required`.
> <br/>Một cách khác là ta thêm bind: `v-bind:show-constraint="false"` hoặc dùng đơn giản hơn: `show-constraint="false"` để ẩn `constraint` trong label đi.

> **Chú ý**: Nếu binding: `show-constraint` mang giá trị `false`, class: `control-label-inline` là không cần thiết.

###### 2.5 Tài liệu khác

<b>Tạo bởi: Nguyễn Văn Vương</b>