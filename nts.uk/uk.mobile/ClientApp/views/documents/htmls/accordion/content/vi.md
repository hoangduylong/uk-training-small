   
##### 2. Hướng dẫn

**HTML Code:**

```html
<div class="accordion">
  <!-- nếu thẻ cần mở ngay thì thêm class show vào -->
  <div class="card show">
    <div class="card-header">
      <button class="btn btn-link" type="button">
        <!-- tiêu đề của collapse -->
        Collapsible Group Item #1
      </button>
    </div>
    <div class="collapse">
      <div class="card-body">
        <!-- nội dung của collapse -->
        Content Group Item #1
      </div>
    </div>
  </div>
</div>
```

Để tạo accordion, bạn chỉ cần khai báo HTML theo form dưới đây.  
Tạo 1 khối div có class=`"accordion"` chứa các khối div có class=`"card"`  
Mỗi khối div có class=`"card"` chứa 2 thành phần `card-header` và `collapse`  

Khối div `card-header` chứa tiêu đề. Bên trong nó nếu muốn thêm button thì cần gán cho button đó class=`"btn btn-link"`.  
Trong div `collapse` chứa khối div có class=`"card-body"`. Bên trong `card-body` là nội dung cần hiển thị của 1 card.  

**Chú ý:** Nếu bạn muốn chỉ 1 card được mở tại 1 thời điểm( nghĩa là khi 1 card mở thì các card còn lại phải đóng)
 thì thêm attribute `"auto-close"` = `true` vào thẻ accordion.

Xem hình dưới đây để nhìn tổng quan hơn.
