##### 1 Điều hướng từ ViewModel

Bạn có thể điều hướng đến một màn hình khác bằng cách gọi medthod `$goto(component, paramObject)` tại ViewModel.  
- `component` là một VueComponent hoặc tên của component.  
- `paramObject` là object sẽ được truyền qua màn hình tiếp theo.



```typescript
export class OriginComponent extends Vue {

    gotoComponent() {
        let self = this;
        self.$goto('DestinationComponent', { 
            id: 100, 
            name: 'Nguyen Van A'
        });
    }
}
```

Bên màn hình nhận sẽ khái báo 1 biến tên là `params` đến nhận giá trị được truyền qua từ component gốc.
``` typescript
export class DestinationComponent extends Vue {

    @Prop()
    public readonly params : {
        id: number,
        name: string
    }

}
```

`Vue-router` cũng cung cấp một method là `$router.push(component, paramObject)` để chuyển trang tuy nhiên giá trị trong paramObject chỉ có thể là kiểu String.


```typescript
export class OtherSampleComponent extends Vue {

    gotoSampleComponent() {
        let self = this;
        // Chú ý, gọi qua cách này, tham số không được nhận qua prop params
        // và tham số là dạng Dictionary<string> | { [key: string]: string }
        self.$router.push('SampleComponent', { 
            // giá trị của id phải là String
            id: '100', 
            name: 'Nguyen Van A' 
        });
    }
}

```

##### 2 Điều hướng từ View

Bạn cũng có thể bind xử lý điều hướng vào luôn `v-on:click` trên View.  

```html
<!--Gọi trực tiếp từ hàm $goto mixin vào component -->
<a class="btn btn-link" v-on:click="$goto('SampleComponent')">{{'go_to_sample' | i18n}}</a>

<!--Gọi thông qua hàm goto được extends từ $router -->
<a class="btn btn-link" v-on:click="$router.goto('SampleComponent')">{{'go_to_sample' | i18n}}</a>
```

Hoặc sử dụng cặp thẻ `<router-link>` do `Vue-router` cung cấp.

```html
<!-- tham số là url -->
<router-link to="/sample">{{'go_to_sample' | i18n}}</router-link>
<!-- tham số là url bind qua v-bind:to -->
<router-link v-bind:to="'/sample'">{{'go_to_sample' | i18n}}</router-link>
<!-- tham số là name, bind qua v-bind:to -->
<router-link v-bind:to="{ name: 'SampleComponent' }">{{'go_to_sample' | i18n}}</router-link>
```

<!--
##### 3. Kỹ thuật chống tràn bộ nhớ.
Thông thường, khi chuyển qua view mới, `vue-router` sẽ tự động `destroy` component cũ đi để giải phóng bộ nhớ.  
Tuy nhiên các đối tượng khai báo ngoài component sẽ không được `destroy` đi.
Điều này dẫn tới tình trạng bộ nhớ cấp phát cho app ngày một tăng lên sau mỗi lần chuyển view và gây ra tình trạng app chạy chậm, giật, lâu phản hồi, gây hao pin của thiết bị.   
Đặc biệt là với mô hình SPA đang áp dụng cho dự án này thì càng thể hiện rõ ràng điều đó.  
  
   
Chính vì vậy, hãy đảm bảo trước khi chuyển qua view mới, tất cả các đối tượng được khởi tạo bên ngoài Component phải được huỷ đi để giải phóng bộ nhớ.   
`Vue-router` cung cấp cho chúng ta 2 hàm callback đặc biệt để giải quyết vấn đề này theo ý của chúng ta là: `onComplete` và `onAbort`.  
Để sử dụng chúng ta chỉ cần thêm vào 2 hàm $goto đã được đề cập ở trên 1 hoặc 2 hàm callback tương ứng.  
Chi tiết xem qua ví dụ dưới đây.

```typescript
let a: string = "ABC";

export class OtherSampleComponent extends Vue {

    gotoSampleComponent() {
        let self = this;

        self.$goto('SampleComponent', 
            { 
                id: 100, 
                name: 'Nguyen Van A' 
            },
            () => {
                // onComplete
                a = undefined;
            }
        );
    }
}

```
-->

Tạo bởi: **Nguyễn Văn Vương**