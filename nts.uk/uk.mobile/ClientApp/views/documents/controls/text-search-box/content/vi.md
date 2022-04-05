##### 2. Giải thích
`nts-text-search` là component được sử dụng ở các màn hình tìm kiếm dữ liệu theo danh sách.  
> Ghi chú: tên `nts-search-box` và `text-search-box` đã cũ, không nên sử dụng.  

Có 2 kiểu search:  
- manual-search: thực hiện search khi click vào button search <span class="fa fa-search"></span>.
- auto-search: thực hiện search ngay sau khi input có thay đổi.

##### 3. Manual Search

Tại ViewModel, tạo một method có 1 paramater string để thực hiện search khi người dùng click vào button search.

**ViewModel**
```typescript
export class ViewModel extends Vue {

    // xử lý search khi người dùng click vào icon search
    public searchEvent(value: string) {
        
    }
}
```

Ở HTML, tạo thẻ `nts-text-search` với attribute v-on:search ứng với tên function trong file ts
trong trường hợp này là hàm searchList.  

**HTML**
```html
<nts-text-search v-on:search="searchEvent"/>
```

##### 4. Automatic Search

Tại ViewModel, tạo một biến kiểu **string** lưu giá trị của input trong search-box.

**ViewModel**
```typescript
export class ViewModel extends Vue {

    public searchText: string = null;
}
```
Tại file HTML, tạo thẻ &lt;nts-text-search&gt; với v-model bằng tên biến đã tạo trong ViewModel.

**HTML**
```html
<nts-text-search v-model="searchText"/>
```

##### 5. Thông tin bổ xung
Ngoài ra, bạn có thể truyền thêm vào component một số các tham số sau.

| Tên Thuộc tính| Type | Mặc định | Mô tả |
| --------------|------| -------- | ------|
| placeholder | string | '' | Ghi chú cho thẻ input (có thể dùng resources id) |
| class-input | string | '' | Class css sẽ gắn vào thẻ input |
| class-container | string | '' | Class css sẽ gắn vào container/thẻ bao của thẻ input |

**Tạo bởi:** Phạm Văn Dân