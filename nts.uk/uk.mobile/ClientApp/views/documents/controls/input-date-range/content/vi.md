##### 2. Giải thích
`nts-date-range-input` là một `control` cho phép nhập dữ liệu kiểu `Date` dưới dạng khoảng thời gian `start`, `end`.  
 Giá trị bind vào `control` và được `control` trả ra là một `reactive object` có 2 thuộc tính `start`, `end` như sau: `{ start: Date | null; end: Date | null; }`.

##### 3. ViewModel

Tại Viewmodel, khởi tại một biến có type ` { start: Date | null; end: Date | null }` và khởi tạo giá trị mặc định cho nó là `{start: null,end: null}` nếu bạn chưa xác định được giá trị ban đầu. 

```typescript
@component({
})
export class ViewModel extends Vue {
    // model chứa giá trị start & end của date range
    public dateRange: { start: Date | null; end: Date | null } = {
        start: null,
        end: null
    };

}
```

##### 4. HTML

Tại HTML, tạo thẻ &lt;nts-date-range-input&gt; với 2 thuộc tính `name` và `v-model`:
- name: là tên của item, sẽ được hiển thị trên label.
- v-model: chứa giá trị của item, nó được gán cho biến đã được khai báo trong ViewModel.

```html
<nts-date-range-input 
    name="Date range" 
    v-model="dateRange" />
```

##### 3. Thông tin bổ sung

"nts-date-range-input" là một dạng input trong UK-Mobile, vì thế nó có các thuộc tính chung của Input như là: 

| Tên Thuộc tính| Type | Mặc định | Mô tả |
| --------------|------| -------- | ------|
| name | string | '' | Tên hiển thị của item |
| disabled | boolean | false | Item có bị disable hay không? |
| showTitle | boolean | true | Có hiển thị title cùng input hay không? |
| inlineTitle | boolean | false | Constraint có hiển thị cùng một dòng mới title hay không? |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | Điều chỉnh để title và input hiển thị cùng một dòng. (Ví dụ: { title: 'col-md-6', input: 'col-md-6'})|
  
Tạo bởi: Nguyễn Văn Vương