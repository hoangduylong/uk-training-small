##### 2. Khai báo trong index.html

```html
<nts-time-range-search v-on:search="searchList" />
```

Ở HTML, tạo thẻ <nts-time-range-search> với attribute v-on:search ứng với tên 1 function trong file ts
trong trường hợp này là hàm searchList.

> Ghi chú: tên `time-range-search-box` đã cũ, không nên dùng.

##### 3. Khai báo trong index.ts

Tại file ts, tạo hàm có tên giống với tên đã khai báo trong file html.   
Hàm này có nhiệm vụ xử lý sự kiện khi người dùng click vào button search của component.
Hàm này nhận vào 2 tham số là startTime và endTime là giá trị đã được nhập vào.  
Nếu người dùng chưa nhập, giá trị trả ra sẽ là 'null'.

```ts
export class ViewModel extends Vue {
    *
    *
    public searchList(startTime: number, endTime: number) {
        // process the event 'search'
    }
    *
    *
}
```

Tạo bởi:　**Phạm Văn Dân**