##### 2. Code HTML
Trong `nts-time-editor` chia thành 3 loại: **time-with-day**, **time-point** và **time-duration**.  
**Time-with-day** và **time-point** giống nhau ở điểm cùng là dữ liệu thời điểm trong ngày.  
Tuy nhiên **time-with-day** có hiển thị ngày kèm theo( ngày hôm trước, hôm nay, ngày mai, ngày kia).  
Trong khi đó, **time-point** hiển thị 'ngày hôm trước' với định dạng số âm, 'ngày mai' và 'ngày kia' hiển thị với giờ > 24.  
   
**Time-duration** là kiểu dữ liệu lưu khoảng thời gian.   
Ví dụ: thời gian làm thêm trong một tháng là 20 tiếng.  

Để chỉ định kiểu hiển thị của `nts-time-editor`, hãy khai báo thuộc tính `time-input-type` là 1 trong 3 kiểu: `time-with-day`, `time-point` hoặc `time-duration`.
  
Truyền thêm 2 thuộc tính quan trọng nữa là `name` và `v-model`:  
`name`: là tên của item  
`v-model`: tên biến chứa giá trị nhập vào được khai báo trong ViewModel

```html
<nts-time-editor
    v-model="timeWithDay"
    name='日区分付き時刻　(Time-With-Day)'
    time-input-type="time-with-day"
    />

<nts-time-editor
    v-model="timePoint"
    name='時刻  (Time-Point)'
    time-input-type="time-point"
    />

<nts-time-editor
    v-model="timeDuration"
    name='時間  (Time-Duration)'
    time-input-type="time-duration"
    />
```

##### 3. ViewModel
Trong ViewModel, khai báo các biến đã định nghĩa bằng `v-model` ở bên HTML.  
Nếu chưa có giá trị, hãy gán cho nó bằng `null`. ( **KHÔNG** gán là `undefined`).

```typescript
export class ViewModel extends Vue {

    public timeWithDay: number = null;

    public timePoint: number = null;

    public timeDuration: number = null;
}
```

##### 4. Thông tin bổ sung

"nts-time-editor" là một dạng input trong UK-Mobile, vì thế nó có các thuộc tính chung của Input như là: 

| Tên Thuộc tính| Type | Mặc định | Mô tả |
| --------------|------| -------- | ------|
| name | string | '' | Tên hiển thị của item |
| disabled | boolean | false | Item có bị disable hay không? |
| showTitle | boolean | true | Có hiển thị title cùng input hay không? |
| inlineTitle | boolean | false | Constraint có hiển thị cùng một dòng mới title hay không? |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | Điều chỉnh để title và input hiển thị cùng một dòng. (Ví dụ: { title: 'col-md-6', input: 'col-md-6'})|
  
Tạo bởi:
**Phạm Văn Dân**