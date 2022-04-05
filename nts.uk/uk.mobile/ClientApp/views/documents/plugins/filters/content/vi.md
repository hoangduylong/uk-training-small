##### 2. Diễn giải
UK mobile cung cấp một số filter sau:
- `date`: Ngày tháng
- `timewd`: Thời điểm kèm theo ngày
- `timept`: Thời điểm
- `timedr`: Khoảng thời gian
- `timedr`: Dữ liệu tháng năm

Developer cần chỉ định `filter` tương ứng với giá trị cần hiển thị thì giá trị hiển thị sẽ được hiển thị đúng với format của hệ thống.

*Các kiểu giá trị* tương ứng với các `filter`:
- `date`: `Date`
- `timewd`: `number`
- `timept`: `number`
- `timedr`: `number`
- `yearmonth`: `number`

**Ngoài ra:** UK mobile còn có các hàm mixin sau để lấy ra giá trị hiển thị của các kiểu dữ liệu `date`, `timewd`, `timedr`, `timept`, `yearmonth` từ model `$dt`.
- `$dt(value: Date, format: string): string`
- `$dt.date(value: Date, format: string): string`
- `$dt.timewd(value: number): string`
- `$dt.timedr(value: number): string`
- `$dt.timept(value: number): string`
- `$dt.yearmonth(value: number): string`

**HTML Code:**
```html
<div class="sample">
    <span>{{ new Date() | date }}</span>
    <!-- kết quả dạng: 2019/01/01 -->
    <span>{{ new Date() | date('dd-mm-yyyy') }}</span>
    <!-- kết quả dạng: 01-01-2019 -->

    <span>{{ -10 | timewd }}</span>
    <!-- kết quả dạng: 前日 23:50 -->
    <span>{{ -10 | timept }}</span>
    <!-- kết quả dạng: -23:50 -->
    <span>{{ -10 | timedr }}</span>
    <!-- kết quả dạng: -00:10 -->
    <span>{{ 201904 | yearmonth }}</span>
    <!-- kết quả dạng: 2019/04 -->
    <span>{{ 201904 | yearmonth('YYYY-MM') }}</span>
    <!-- kết quả dạng: 2019-04 -->
    
</div>
```
<div class="mt-2"></div>

> Viết bởi: **Nguyễn Văn Vương**.
<div class="mb-2"></div>