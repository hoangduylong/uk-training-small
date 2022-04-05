
##### 1. Preview

<div class="clearfix">
    <div class="float-left" style="background-color: #4285f4; color: yellow">Trôi về bên trái với tất cả mọi kích thuớc màn hình</div>
    <br>
    <br>
    <div class="float-right" style="background-color: #4285f4; color: yellow">Trôi về bên phải với tất cả mọi kích thuớc màn hình</div>
    <br>
    <br>
    <div class="float-none" style="background-color: #4285f4; color: yellow">Giữ nguyên vị trí</div>
</div>

---

##### 2. Giải thích
Trong quá trình thiết kế màn hình, sẽ có những đối tượng được yêu cầu đẩy trôi về bên trái hoặc bên phải màn hình.   
Với những yêu cầu như vậy, hãy sử dụng class `.float-left` hoặc `.float-right` để đáp ứng những yêu cầu trên.

Trong trường hợp element con dùng `.float-left` hoặc `.float-right`, heigh của element cha sẽ là `0px`.  
Để giải quyết vấn đề này, hãy thêm class `clearfix` vào element cha.

```html
<div class="clearfix">
    <div class="float-left">Trôi về bên trái với tất cả mọi kích thuớc màn hình</div>
    <div class="float-right">Trôi về bên phải với tất cả mọi kích thuớc màn hình</div>
    <div class="float-none">Giữ nguyên vị trí</div>
</div>
```

Dưới đây là một số class `float` dành cho các loại màn hình (kích thước) khác nhau:
| Type\Size | None | Small | Medium | Large | Extra Large |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| Float Left | .float-left | .float-sm-left | .float-md-left | .float-lg-left | .float-xl-left |
| Float Right | .float-right | .float-sm-right | .float-md-right | .float-lg-right | .float-xl-right |
| Float None | .float-none | .float-sm-none | .float-md-none | .float-lg-none | .float-xl-none |