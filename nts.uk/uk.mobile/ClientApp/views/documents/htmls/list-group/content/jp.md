##### 1. Cơ bản
> `Danh sách` là một tập hợp các phần tử có cùng một phương thức hiển thị và được nhóm lại thành một nhóm. Như ví dụ dưới đây là một danh sách cơ bản thường thấy nhất trong html.

<ul class="list-group mb-2">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>

**Code**:
```html
<ul class="list-group">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>
```
##### 2. Chọn một phần tử
> Để chọn một phần tử trong `danh sách`, ta chỉ cần thêm class `active` vào đúng phần tử `list-group-item` cần chọn.
<ul class="list-group mb-2">
  <li class="list-group-item active">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>

**Code**:
```html
<ul class="list-group">
  <li class="list-group-item active">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>
```
##### 3. Danh sách không viền
> Để loại bỏ viền bao quanh một `danh sách`, ta chỉ cần thêm class `list-group-flush` vào thẻ cha của `danh sách`.
<ul class="list-group list-group-flush mb-2">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>

**Code**:
```html
<ul class="list-group list-group-flush">
  <li class="list-group-item">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>
```
##### 4. Danh sách chọn
> Để hiển thị `danh sách` dưới dạng chọn một phần tử, ta chỉ cần thêm class `list-group-selection` vào thẻ cha của `danh sách`.
<ul class="list-group list-group-selection mb-2">
  <li class="list-group-item active">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>

**Code**:
```html
<ul class="list-group list-group-selection">
  <li class="list-group-item active">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>
```
##### 4. Danh sách chọn một phần tử
> Để hiển thị `danh sách` dưới dạng chọn một phần tử, ta chỉ cần thêm class `list-group-single-select` vào thẻ cha của `danh sách`.
<ul class="list-group list-group-single-select mb-2">
  <li class="list-group-item active">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>

**Code**:
```html
<ul class="list-group list-group-single-select">
  <li class="list-group-item active">Cras justo odio</li>
  <li class="list-group-item">Dapibus ac facilisis in</li>
  <li class="list-group-item">Morbi leo risus</li>
  <li class="list-group-item">Porta ac consectetur ac</li>
  <li class="list-group-item">Vestibulum at eros</li>
</ul>
```
> **Mẹo**: Để loại bỏ hết viền của `danh sách`, ta thêm class `border-0` vào thẻ cha và tất cả các thẻ con của `danh sách`.

<ul class="list-group list-group-single-select border-0 mb-2">
  <li class="list-group-item border-0 active">Cras justo odio</li>
  <li class="list-group-item border-0">Dapibus ac facilisis in</li>
  <li class="list-group-item border-0">Morbi leo risus</li>
  <li class="list-group-item border-0">Porta ac consectetur ac</li>
  <li class="list-group-item border-0">Vestibulum at eros</li>
</ul>

**Code**:
```html
<ul class="list-group list-group-single-select border-0">
  <li class="list-group-item border-0 active">Cras justo odio</li>
  <li class="list-group-item border-0">Dapibus ac facilisis in</li>
  <li class="list-group-item border-0">Morbi leo risus</li>
  <li class="list-group-item border-0">Porta ac consectetur ac</li>
  <li class="list-group-item border-0">Vestibulum at eros</li>
</ul>
```

<div class="mt-2"></div>

> Viết bởi: **Nguyễn Văn Vương**.