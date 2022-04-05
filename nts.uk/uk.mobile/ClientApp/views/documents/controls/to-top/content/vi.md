Kéo xuống dưới, button như này sẽ hiện ra ở góc màn hình. Nhấn vào nó để trở lại đầu trang.
<div class="totop show mb-2" style="position: unset;"><i class="fas fa-arrow-up"></i></div>

###### 2. Giải thích
`to-top` là một control hỗ trợ hiển thị một nút cuộn nhanh về đầu trang mỗi khi trang được cuộn xuống dưới.   


###### 3 ViewModel

Để sử dụng control này, trước tiên cần import `TotopComponent` từ `@app/components`, sau đó khai báo nó trong 'components' của `@Component` như sau.
```typescript
// import component
import { TotopComponent } from '@app/components/totop';

@component({
    components: {
        // khai báo virtual dom name
        'to-top': TotopComponent
    }
})
export class ViewModel extends Vue {

}
```
###### 4. HTML
Cuối cùng, thêm thẻ `to-top` vừa khái báo ở `@Component` vào file HTML.

```html
<div class="app">
    <!-- sử dụng virtual dom đã khai báo ở view model-->
    <to-top />
</div>
```
**Tạo bởi:** Nguyễn Văn Vương