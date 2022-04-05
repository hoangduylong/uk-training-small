##### 2. Giải thích

<nav class="nav nav-pills nav-step-wizard nav-justified">
    <a href="javascript:void(0)" class="nav-item nav-link disabled active"><span>1</span> <span>Bước 1</span></a>
    <a href="javascript:void(0)" class="nav-item nav-link disabled">2</a>
    <a href="javascript:void(0)" class="nav-item nav-link disabled">3</a>
    <a href="javascript:void(0)" class="nav-item nav-link disabled">4</a>
</nav>

`Step-wizard` là component để hiển thị thanh steps( phần trên cùng của sample).  
##### 3. ViewModel
Để sử dụng `step-wizard`, trước tiên hãy import `StepwizardComponent` từ `@app/components` vào, sau đó khai báo nó trong property 'components' của `@Component`.  

```typescript
...
// import StepwizardComponent vào 
import { StepwizardComponent } from '@app/components';
@component({
    components: {
        // khai báo name cho step component
        'step-wizard': StepwizardComponent
    }
})
export class ViewModel extends Vue {

    public step = 'step_1';
    ...
}
```

##### 4. HTML
Ở file template, hãy sử dụng thẻ `step-wizard` vừa được định nghĩa trong 'components' để tạo step-wizard.    
Truyền vào cho component này 2 thuộc tính là `items` và `selected`,
- items: là một Array<String> chứa danh sách các bước trong step-wizard.
- selected: lưu giá trị của step đang được chọn. nó có giá trị là biến `step` trong ViewModel.

```html
<step-wizard v-bind:items="['step_1', 'step_2', 'step_3', 'step_4']" v-bind:selected="step" />
```

 **Chú ý**: Trong thực tế, thay vì dùng `['step_1', 'step_2', ...]`, hãy sử dụng `resources id` được cung cấp bởi đội thiết kế, vì các `resources id` này đã đảm bảo được tính duy nhất của các `string key` trong `step-wizard`. Ví dụ: `['KAFS05_2', 'KAFS05_3']`.

---
---
##### 5. Tạo **button** để thay đổi các step
Sau khi làm theo cách bước ở trên, bạn đã tạo ra một `step-wizard`. Tuy nhiên, bạn vẫn chưa chuyển qua lại được các steps.  
Để làm điều này, hãy tạo các button tương ứng với từng step như sau:

```html
<div>
    <!-- next buttons-->
    <button v-show="step == 'step_1'" v-on:click="nextToStep2">Next</button>
    <button v-show="step == 'step_2'" v-on:click="nextToStep3">Next</button>
    <button v-show="step == 'step_3'" v-on:click="nextToStep4">Next</button>
    <button v-show="step == 'step_4'" v-on:click="done">Done</button>

    <!-- back buttons-->
    <button v-show="step == 'step_2'" v-on:click="backToStep1">Back</button>
    <button v-show="step == 'step_3'" v-on:click="backToStep2">Back</button>
    <button v-show="step == 'step_4'" v-on:click="backToStep3">Back</button>
</div>
```
Bằng cách sử dụng `v-show`, các button này sẽ được hiển thị tương ứng với từng step trong Step-wizard.  
Gán sự kiện cho từng button bằng `v-on:click`. Trong từng sự kiện next hoặc back, ngoài việc sử lý nghiệm vụ, hãy thay đổi biến `step` của ViewModel.  

```typescript
export class ViewModel extends Vue {
    
    public step = 'step_1';

    public nextToStep2() {
        // xử lý nghiệp vụ trước khi chuyển sang step-2

        this.step = 'step_2';
    }

    .....
}
```

##### 6. Tạo **nội dung** của từng step
Để hiển thị nội dung tương ứng với từng step, hãy sử dụng `v-if` như sau. 
```html
<div>
    <div v-if="step == 'step_1'">Nội dung của step 1</div>
    <div v-if="step == 'step_2'">Nội dung của step 2</div>
    <div v-if="step == 'step_3'">Nội dung của step 3</div>
    <div v-if="step == 'step_4'">Nội dung của step 4</div>
</div>
```



**Tạo bởi**: Nguyễn Văn Vương