##### 1. Giải thích
> Để xoá các `float` đã áp dụng vào các element con, ta chỉ cần thêm class `.clearfix` **vào các thẻ cha**.

**HTML Code:**
```html
<div class="clearfix">...</div>
```

> Hoặc sử dụng mixin (include) vào thẻ cuối của thẻ được áp dụng `float`.

**Scss code:**
```scss
// Đã được định nghĩa
@mixin clearfix() {
  &::after {
    display: block;
    content: "";
    clear: both;
  }
}

// Sử dụng như một mixin
.element {
  @include clearfix;
}
```
##### 2. Tài liệu liên quan