##### 1. 説明

`子のエレメント`に適用した`float`を消するために`clearfix`というクラスを`親のエレメント`に追加してください。  

##### 2. HTML

```html
<div class="clearfix">
    .
    .
    .
</div>
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