

##### 1. Common Buttons
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button>
<br><br>
Đây là các button được sử dụng phổ biển trong UK Mobile.  
Để chỉ định dạng hiển thị cho nó, bạn chỉ cần thêm class `"btn btn-....."` và sau nó với từng loại button.
```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button>
```
---
##### 2. Disabled
<button type="button" class="btn btn-primary" disabled>Primary</button>
<button type="button" class="btn btn-secondary" disabled>Secondary</button>
<button type="button" class="btn btn-success" disabled>Success</button>
<button type="button" class="btn btn-info" disabled>Info</button>
<button type="button" class="btn btn-warning" disabled>Warning</button>
<button type="button" class="btn btn-danger" disabled>Danger</button>
<button type="button" class="btn btn-link" disabled>Link</button>
<br><br>
Để disable một button đi, hãy thêm attribute `disabled` vào button.
```html
<button type="button" class="btn btn-primary" disabled>Primary</button>
```
---
##### 3. Outline
<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>
<button type="button" class="btn btn-outline-success">Success</button>
<button type="button" class="btn btn-outline-info">Info</button>
<button type="button" class="btn btn-outline-warning">Warning</button>
<button type="button" class="btn btn-outline-danger">Danger</button>
<br><br>
Để hiển thị màu của button ở dạng outline, hãy sử dụng class `"btn btn-outline-..."` với từng loại button.
```html
<button type="button" class="btn btn-outline-primary">Primary</button>
```
---
##### 4. Dropdown buttons

<div class="btn-group">
    <button type="button" class="btn btn-primary">Save</button>
    <button type="button" class="btn btn-primary dropdown-toggle"></button>
    <ul class="dropdown-menu">
        <li class="dropdown-item">New</li>
        <li class="dropdown-item bg-red-500">Remove</li>
    </ul>
</div>

`DropDown Buttons` phục vụ cho việc nhóm một số các button lại thành một nhóm.   
Nó chỉ hiển thị button quan trọng nhất, các button còn lại được nhóm thành một dropdown.

Để tạo dropdown-buttons, trước tiên tạo khối DIV với class là `"btn-group"`.  
Trong khối div tạo 2 button:   
- button chính, hiển thị bên ngoài. Khai báo giống như common-button bình thường.
- button-dropdown, hiển thị mũi tên xuống. Hãy thêm class `dropdown-toggle` vào button này.   

Ở đây, button chính và button-dropdown nên có cùng class. Ví dụ trong trường hợp này, nó đều có class là `btn btn-primary`.  

Tiếp tục, tạo thẻ ul với class là `dropdown-menu`. Bên trong thẻ này, tạo các thẻ li với class `dropdown-item`.  
Các thẻ li này chính là các button bên trong dropdown list. Hãy thêm `v-click` để gắn event cho nó.

```html
<div class="btn-group">
    <button type="button" class="btn btn-primary" v-click:500="saveData">Save</button>
    <button type="button" class="btn btn-primary dropdown-toggle"></button>
    <ul class="dropdown-menu">
        <li class="dropdown-item" v-click="createNew">New</li>
        <li class="dropdown-item bg-red-500" v-click:500="deleteData">Delete</li>
    </ul>
</div>
```
---
##### 5. Button size
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-primary">Default button</button>
<button type="button" class="btn btn-primary btn-sm">Small button</button>
<br><br>
Button mặc định sẽ hiển thị kích thưởng ở dạng `vừa`.   
Để hiển thị button ở kích thước `lớn` hoặc `nhỏ`, hãy thêm class `btn-lg` hoặc `btn-sm`.  
```html
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-primary">Default button</button>
<button type="button" class="btn btn-primary btn-sm">Small button</button>
```
---
##### 6. Block button (full width)
<button type="button" class="btn btn-primary btn-block">Block level button</button>
<br>
Để tạo button với độ rộng toàn màn hình, hãy thêm class `"btn-block"`.
```html
<button type="button" class="btn btn-primary btn-block">Block level button</button>
```
---
##### 7. Selection button (full width)

<button type="button" class="btn btn-selection border mb-2">
    <span class="badge badge-secondary">0001</span>
    <span>Name of selection</span>
</button>
<button type="button" class="btn btn-selection border mb-2">
    <span class="badge badge-secondary">0001</span>
    <span>Name of selection</span>
    <span class="d-block mt-1">2010~2019</span>
</button>

Đây là loại button đặc biệt, được sử dụng trong một số màn hình của UK Mobile.  
Hãy khai báo theo mẫu sau để tạo nó.  
Trước tiên, để tạo button loại này bạn cần sử dụng class `btn btn-selection`.  
Trong button có sử dụng Code, để tạo nó hãy sử dụng thẻ span với class là `badge badge-secondary`.  
Button thứ 2 có phần constraint(2010~2019). Để tạo nó hãy sử dụng thẻ span với class là `d-block mt-1`.

```html
<button type="button" class="btn btn-selection border">
    <span class="badge badge-secondary">0001</span>
    <span>Name of selection</span>
</button>
<button type="button" class="btn btn-selection border">
    <span class="badge badge-secondary">0001</span>
    <span>Name of selection</span>
    <span class="d-block mt-1">2010~2019</span>
</button>
```
---
##### 8. Checkbox group
<div class="btn-group btn-group-toggle mb-3">
    <label class="btn btn-primary">
        <input type="checkbox" checked> Active
    </label>
    <label class="btn btn-primary">
        <input type="checkbox"> Check
    </label>
    <label class="btn btn-primary" >
        <input type="checkbox"> Check
    </label>
</div>
<div class="popover fade show bs-popover-bottom" style="transform: translate3d(15px, 3000px, 0px);">
    <div class="arrow" style="left: 12px"></div>
    <h3 class="popover-header">Popover title</h3>
    <div class="popover-body">And here's some amazing content. It's very engaging. Right?</div>
</div>

Để tạo `Checkbox Group`, trước tiên hãy tạo khối DIV với class là `btn-group btn-group-toggle`.  
Trong khối div này, hãy định nghĩa từng checkbox bằng thẻ label với class là `btn btn-...`.  
Bên trong thẻ label, hãy tạo thẻ input với type="checkbox".

```html
<div class="btn-group btn-group-toggle">
    <label class="btn btn-primary" >
        <input type="checkbox" checked/> Active
    </label>
    <label class="btn btn-primary">
        <input type="checkbox"/> Check
    </label>
    <label class="btn btn-primary">
        <input type="checkbox"/> Check
    </label>
</div>
```
---
##### 9. Switch button
<div class="btn-group btn-group-toggle mb-3">
    <label class="btn btn-primary">
        <input type="radio" name="options" checked /> Active
    </label>
    <label class="btn btn-primary">
        <input type="radio" name="options"/> Radio
    </label>
    <label class="btn btn-primary">
        <input type="radio" name="options"/> Radio
    </label>
</div>

Tạo `Switch Button` tương tự với `Checkbox Group`.  
Tuy nhiên thẻ input ở đây để type="radio".

```html
<div class="btn-group btn-group-toggle mb-3">
    <label class="btn btn-primary">
        <input type="radio" name="options" checked/> Active
    </label>
    <label class="btn btn-primary">
        <input type="radio" name="options" /> Radio
    </label>
    <label class="btn btn-primary">
        <input type="radio" name="options"/> Radio
    </label>
</div>
```
---
##### 10. Tool bar (group buttons)
<div class="btn-toolbar">
    <div class="btn-group mr-4 mb-3">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
    <div class="btn-group mr-4 mb-3">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
    <div class="btn-group mb-3">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
</div>

##### Code
```html
<div class="btn-toolbar">
    <!-- group 1 -->
    <div class="btn-group mr-4">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
    <!-- group 2 -->
    <div class="btn-group mr-4">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
    <!-- group 3 -->
    <div class="btn-group">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
</div>
```

Tạo bởi: Nguyễn Văn Vương
