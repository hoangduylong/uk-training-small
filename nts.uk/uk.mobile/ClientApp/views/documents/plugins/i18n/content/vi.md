##### 1. Giới thiệu

> `i18n` là một `filter` được sử dụng để hiển thị một chuỗi ký tự từ `resourceid`, tương tự như hệ thống UK.
> <br />`$i18n` là một hàm `mixin`, nên cách sử dụng có thể tương tự như gọi một hàm nếu cần truyền tham số vào.

##### 2. Code (`view`)
```html
<!-- dùng như một filter (không tham số) -->
<div>{{resourceid | i18n}}</div>
<!-- dùng như một filter (có tham số: 1 chuỗi) -->
<div>{{resourceid | i18n(params1) }}</div>
<!-- dùng như một filter (có tham số: 1 mảng chuỗi) -->
<div>{{resourceid | i18n([params1, params2]) }}</div>
<!-- dùng như một filter (có tham số: 1 object) -->
<div>{{resourceid | i18n({key1: value1, key2: value2}) }}</div>
<!-- hoặc dùng như một hàm mixin global -->
<div>{{ $i18n(resourceid, [param1, param2]) }}</div>

<!-- các input muốn chỉ định name với resource_id -->
<nts-text-editor name='resourceid'/>
```
##### 2.1 Code (`viewmodel`)
> Hàm `$i18n` là một hàm global nên ta có thể gọi trực tiếp hàm này từ `view-model` như ví dụ dưới đây.
```typescript
class ViewModel extends Vue {
    created() {
        this.$i18n(resourceid, param1);
        // hoặc
        this.$i18n(resourceid, [param1, params2]);
        // hoặc 
        this.$i18n(resourceid, {key1: value1, key2: value2});
    }
}
``` 

> Document write by: Nguyen Van Vuong