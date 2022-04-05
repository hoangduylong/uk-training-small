##### 2. Diễn giải
`tree-list` là danh sách các đối tượng có quan hệ phân cấp cha con. 
##### 3. ViewModel

Trước tiên bạn cần có một list các item lưu ở dạng cây(, có thể tự khai báo hoặc lấy về từ server).  
Dàn phẳng cây này ra bằng cách dùng method `utils/object/hierarchy()`. Method này nhận vào 2 tham số:
- **items**: là list các item của bạn.
- **childProp**: là tên property chứa danh sách các item con của một item. (trong ví dụ này, nó là `children`).

> Chú ý: Hàm `hierarchy` trong `utils` tính toán danh sách các đối tượng cần hiển thị nhưng *có làm thay đổi các đối tượng ban đầu.

```typescript
import { obj } from '@app/utils';

export class ViewModel {
    // danh sách item cần hiển thị dạng tree list
    public items: Array<any> = [
        {
            name: 'item1', 
            children: [
                {
                    name: 'item 1-1',
                    children: []
                }
            ]
        }, {
            name: 'item2'
            children: []
        }

    ];

    // sử dụng computed của vue để tính toán các item cần hiển thị
    get flatten() {
        return obj.hierarchy(this.items, 'children');
    }
}
```

##### 4. HTML

 Sau khi tính toán được danh sách các item cần hiển thị từ `viewmodel` ta dựng `view` theo ví dụ dưới đây.

 1, Tạo thẻ &lt;ul&gt; với class=`"list-group list-group-tree"`.  
 2, Trong thẻ ul, dùng `v-for` để tạo ra một list các thẻ &lt;li&gt; với class=`"list-group-item"`, v-bind:key=`"k"` và v-tree=`"item"`  

Bạn tùy ý thiết kế nội dung hiển thị bên trong một thẻ &lt;li&gt;. Dưới đây là template mẫu cho trường hợp hiển thị cây dạng radio và checkbox.  

Template cho cây dạng **radio**. `selected` là biến trong ViewModel để chứa giá trị được select.

```html
<ul class="list-group list-group-tree">
    <li v-for="(item, k) in flatten" class="list-group-item" v-bind:key="k" v-tree="item">
        <span>{{item.id}} {{item.text}}</span>
        <input class="selection" type="radio" v-model="selected" v-bind:value="item">
    </li>
</ul>
```

Template cho cây dạng **checkbox**. `selecteds` là biến trong ViewModel.

```html
<ul class="list-group list-group-tree">
    <li v-for="(item, k) in flatten" class="list-group-item" v-bind:key="k" v-tree="item">
        <span>{{item.id}} {{item.text}}</span>
        <input class="selection" type="checkbox" v-model="selecteds" v-bind:value="item">
    </li>
</ul>
```

> Chú ý: class `selection` của thẻ &lt;input&gt; là bắt buộc.  

> Có thể sử dụng thêm 2 class `list-group-xs` hoặc `list-group-sm` trong thẻ root để thay đổi kích thước của các item trong list group để tăng không gian hiển thị.

Tạo bởi: **Nguyễn Văn Vương**.