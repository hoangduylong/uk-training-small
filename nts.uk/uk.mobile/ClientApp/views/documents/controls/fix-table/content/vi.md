##### 2. Diễn giải
`FixTableComponent` là component giúp hiển thị table ở dạng nhỏ gọn, phù hợp với màn hình smartphone.  
Một số tính năng chính của FixTableComponent là:
- Gộp cột: component sẽ tạm thời chỉ hiển thị một số cột nhất định và ẩn các cột còn lại đi. Người dùng có thể chuyển đổi các cột hiển thị bằng cách click vào 2 button `前項`(previous) và `次項`(next), hoặc sử dụng thao tác vuốt(swipe).
- Gộp hàng: component sẽ chỉ hiện thị một số hàng nhất định. Ngượt dùng sẽ vuốt lên hoặc vuốt xuống(scroll) để xem các hàng còn lại.
- Tự động thêm cột rỗng: khi số cột hiện có không chia hết cho số cột muốn hiển thị, component sẽ tự động tạo ra các cột rỗng.
- Tự động tính toán độ rộng của các cột hiển thị: Deverloper sẽ chỉ định độ rộng của cột đầu tiên và cột cuối cùng. Các cột ở giữa sẽ có độ rộng bằng nhau.

##### 3. Khai báo ở ViewModel
`FixTableComponent` không phải là `common` component bạn cần import, và khai báo nó trước khi sử dụng.  

```typescript
import { FixTableComponent } from '@app/components/fix-table';

@component({
    components: {
        // khai báo virtual tag name
        'fix-table': FixTableComponent
    }
})
export class ViewModel extends Vue {

}
```
##### 4 Khai báo view

Tại view, sử dụng cặp thẻ &lt;fix-table&gt; vừa định nghĩa ở ViewModel.  
Hãy coi thẻ &lt;fix-table&gt; giống như thẻ &lt;table&gt; của HTML. Mọi nội dung bên trong &lt;fix-table&gt; là do developer quyết định.  

```html
<fix-table>
      
<thead>
    <tr>
        ...Khai báo table header tại đây
    </tr>
</thead>

<tbody >
    <tr>
        ...Khai báo table body tại đây
    </tr>
</tbody>

<tfoot>
    <tr>
        ...Khai báo table footer tại đây
    </tr>
</tfoot>

</fix-table>
```

##### 5 Thuộc tính bổ xung

Bạn có thể thêm các properties dưới đây để tùy biến hiển thị của fix-table.
- `displayColumnsNumber`: mặc định 4 : Số cột ở giữa sẽ được hiển thị
- `rowNumber`: mặc định 5: Số hàng được hiển thị( các hàng còn lại được scroll)
- `tableClass`: mặc định 'table table-bordered table-sm m-0' : class của fix-table
- `previousClass`: mặc định 'btn btn-secondary btn-sm' : class của button previous
- `nextClass`: mặc định 'btn btn-secondary btn-sm' : class của button next

Người tạo: Phạm Văn Dân