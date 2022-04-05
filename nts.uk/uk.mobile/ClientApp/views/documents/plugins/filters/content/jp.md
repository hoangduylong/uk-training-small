##### 2. 説明
UKモバイルはこれらのフィルタを提供している：
- `date`: 日付
- `timewd`: 日区分付き時刻
- `timept`: 時刻
- `timedr`: 時間
- `yearmonth`: 対象月

フィルタのインプットの種類はフィルタによって違う：
- `date`: `Date`
- `timewd`: `number`
- `timept`: `number`
- `timedr`: `number`
- `yearmonth`: `number`

**Bonus:** UK mobile has some mixin function `date`, `timewd`, `timedr`, `timept`, `yearmonth` of `$dt` for get string format of primtive value.
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
    <!-- Output: 2019/01/01 -->
    <span>{{ new Date() | date('dd-mm-yyyy') }}</span>
    <!-- Output: 01-01-2019 -->

    <span>{{ -10 | timewd }}</span>
    <!-- Output: 前日 23:50 -->
    <span>{{ -10 | timept }}</span>
    <!-- Output: -23:50 -->
    <span>{{ -10 | timedr }}</span>
    <!-- Output: -00:10 -->
    <span>{{ 201904 | yearmonth }}</span>
    <!-- Output: 2019/04 -->
    <span>{{ 201904 | yearmonth('YYYY-MM') }}</span>
    <!-- Output: 2019-04 -->
    
</div>
```

著者：Nguyen Van Vuong