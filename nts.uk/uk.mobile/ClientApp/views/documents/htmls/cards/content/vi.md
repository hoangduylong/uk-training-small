#### 1. **Hiển thị card đơn**
##### 1.1 Demo
Dạng hiển thị đơn phục vụ cho việc hiển thị 1 card. Toàn bộ nội dung sẽ nằm tách biệt với các phần khác.  
<div class="card">
  <h5 class="card-header">Featured</h5>
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="javascript:void(0)" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

---
##### 1.2 Code

Để tạo dạng card đơn, đầu tiên tạo khối DIV có class là `card`.  
Trong khối DIV `card` tạo 2 khối DIV con với class lần lượt là `card-header` và `card-body`.  
Bạn được tùy ý quyết định cách hiển thị bên trong 2 khối DIV `card-header` và `card-body` này.
```html
<div class="card">
  
  <!-- card-header part-->
  <h5 class="card-header">Feature</h5>

  <!-- card-body part-->
  <div class="card-body">
    <h5 class="card-title">Special title treatment</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```
#### 2 **Hiển thị card theo nhóm**
##### 2.1 Demo
<div class="card card-label mb-2">
  <div class="card-header">
    <span>Feature 1</span>
    <span class="badge badge-warning">Bắt buộc</span>
  </div>
  <div class="card-body">
    <span>Title button 1</span>
    <button type="button" class="btn btn-selection mt-2 mb-2">
        <span class="badge badge-secondary">0001</span>
        <span>Name of selection</span>
    </button>
    <span>Title button 2</span>
    <button type="button" class="btn btn-selection mt-2 mb-2">
        <span class="badge badge-secondary">0001</span>
        <span>Name of selection</span>
        <span class="d-block mt-1">2010~2019</span>
    </button>
  </div>
</div>
<div class="card card-label mb-2">
  <div class="card-header">
    <span>Feature 2</span>
    <span class="badge badge-info">Tùy chọn</span>
  </div>
  <div class="card-body">
    <input type="text" class="form-control" />
  </div>
</div>

---
##### 2.2 Code

Mỗi card trong nhóm card hiển thị theo nhóm được khai báo là khối DIV với class là `card card-label`.  
Tương tự như trường hợp dạng card đơn, bên trong mỗi card sẽ có 2 khối DIV với class là `card-header` và `card-body`.  

Trong `card-header` để tạo cái `"bắt buộc"`, hãy thêm cho nó class `badge badge-warning`, để hiển thị `tùy chọn`, hãy thêm cho nó class `badge badge-info`.

Chú ý: Trong trường hợp bên trong `card-body` lại có item con, hãy tham khảo code dưới đây( phần `sub-element`).
```html
<div class="card card-label">
  <!-- card-header part-->
  <div class="card-header">
    <span>Featured</span>
    <span class="badge badge-warning">Bắt buộc</span>
  </div>
  <!-- card-body part-->
  <div class="card-body">

    <!-- sub-element 1-->
    <span>Title button 1</span>
    <button type="button" class="btn btn-selection mt-2 mb-2">
        <span class="badge badge-secondary">0001</span>
        <span>Name of selection</span>
    </button>

    <!-- sub-element 2-->
    <span>Title button 2</span>
    <button type="button" class="btn btn-selection mt-2 mb-2">
        <span class="badge badge-secondary">0001</span>
        <span>Name of selection</span>
        <span class="d-block mt-1">2010~2019</span>
    </button>
  </div>
</div>
```