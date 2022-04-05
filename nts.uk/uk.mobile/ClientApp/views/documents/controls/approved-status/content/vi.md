##### 2. Diễn giải
ApprovedComponent là một component cho phép hiển thị 5 button và nội dung của nó.

##### 3. ViewModel

`ApprovedComponent` không phải là `common` component bạn cần import, và khai báo nó trước khi sử dụng.  
Trong ViewModel, khai báo biến `selected` chứa giá trị của button đang select. Giá trị của `selected` sẽ từ 0 - 4.

```typescript
import { ApprovedComponent } from '@app/components';

@component({
    components: {
        // khai báo virtual tag name
        'approved': ApprovedComponent
    }
})
export class ViewModel extends Vue {

    // khai báo model selected (sẽ trả ra theo thứ tự select)
    public selected: number = 0;
}
```

##### 4. HTML

Ở HTML, tạo thẻ &lt;approved&gt;(approved là tên đã khai báo ở @component) và truyền vào atribute `v-model="selected"`(selected đã được khai báo ở ViewModel).  

Trong cặp thẻ &lt;approved&gt;, khai báo 2 &lt;template&gt; với 2 attribute là `v-slot:buttons` và `v-slot:popovers`.  

- v-slot:button: chứa 5 button với class và nội dung khác nhau.
- v-slot:popovers: chứa 5 template, mỗi template hiển thị nội dung tương ứng với từng button khai báo ở trên.

> Đây là ứng dụng của **slot** trong Vue. Tìm hiểu slot [tại đây](https://vuejs.org/v2/guide/components-slots.html). Đọc các phần: Slot Content, Compilation Scope, Fallback Content, Named Slots

```html
<!-- bind model chứa giá trị là thứ tự item cần select vào component -->
<approved v-model="selected">
    <template v-slot:buttons>
        <button class="uk-apply-reflected">済</button>
        <button class="uk-apply-approved">済</button>
        <button class="uk-apply-denial">済</button>
        <button class="uk-apply-return">済</button>
        <button class="uk-apply-cancel">済</button>
    </template>
    <template v-slot:popovers>
        <template v-if="selected == 0">
            Nội dung tương ứng với button 0
        </template>
        <template v-else-if="selected == 1">
            Nội dung tương ứng với button 1
        </template>
        <template v-else-if="selected == 2">
            Nội dung tương ứng với button 2
        </template>
        <template v-else-if="selected == 3">
            Nội dung tương ứng với button 3
        </template>
        <template v-else-if="selected == 4">
            Nội dung tương ứng với button 4
        </template>
    </template>
</approved>
```

Tạo bởi: Nguyễn Văn Vương