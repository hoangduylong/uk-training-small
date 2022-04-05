##### 2. Giải thích

`nts-time-range-input` là component cho phép nhập giá trị `start` và `end` dạng TimeWithDay.

##### 3. ViewModel

Ở ViewModel, khai báo biến có kiểu `{ start: number, end: number}` lưu giá trị của cặp time-range.  
Khai báo trong `@Component.validations` property giống với tên biến, và set cho giá trị `timeRange = true`.

```typescript

@component({
    ..
    validations: {
        value: {
            timeRange: true
            ..
        }
    }
})
export class ViewModel extends Vue {

    public value: { start: number, end: number} = null;
    ...
}
```

##### 3. HTML

Để tạo time-range-input, định nghĩa thẻ &lt;nts-time-range-input&gt; với `v-model` là tên biến đã khai báo ở ViewModel.  
```html
<nts-time-range-input v-model="value"/>
```

Để hiển thị time-range-input ở dạng có title, hãy thêm 2 thuộc tính `name` và `v-bind:showTitle="true"` vào thẻ &lt;nts-time-range-input&gt;.

```html
<nts-time-range-input v-model="value" v-bind:showTile="true" name="Time Range"/>
```

##### 4. Thông tin bổ sung

"nts-time-range-input" là một dạng input trong UK-Mobile, vì thế nó có các thuộc tính chung của Input như là: 

| Tên Thuộc tính| Type | Mặc định | Mô tả |
| --------------|------| -------- | ------|
| name | string | '' | Tên hiển thị của item |
| disabled | boolean | false | Item có bị disable hay không? |
| showTitle | boolean | **false** | Có hiển thị title cùng input hay không? |
| inlineTitle | boolean | false | Constraint có hiển thị cùng một dòng mới title hay không? |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | Điều chỉnh để title và input hiển thị cùng một dòng. (Ví dụ: { title: 'col-md-6', input: 'col-md-6'})|

Tạo bởi: Nguyễn Văn Vương
  