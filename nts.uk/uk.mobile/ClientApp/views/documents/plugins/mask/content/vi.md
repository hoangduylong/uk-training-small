##### 2. Giải thích

Trong quá trình sử dụng, sẽ có lúc người dùng cần phải đợi hệ thống xử lý trong một thời gian mà không được thao tác với màn hình.  
Để làm việc này, một `masklayer` sẽ cần được bật lên bằng cách gọi method `$mask`.

##### 3. Code

●　Để bật `masklayer` lên ta sử dụng method `this.$mask('show')`.  
Bạn có thể tùy bến độ trong của `masklayer` bằng cách truyền thêm 1 đối số `opacity` nữa.   
`Opacity` có giá trị từ 0 đến 1. Nếu opacity = 0 `masklayer` sẽ trong suốt, nếu opacity = 1 `masklayer` sẽ đen.  
Ví dụ: `this.$mask('show', 0.65)`  
  
Sau khi `masklayer` được bật lên, sẽ có 2 sự kiện có thể xảy ra là:   
1, Người dùng tiếp tục click ( hoặc chạm) vào màn hình  
2, `masklayer` được đóng lại.  
  
Để bắt 2 sự kiện này, ta sử dụng method `on()` của đối tượng trả về sau method `$mask('show')`. Method `on()` nhận vào 2 tham số là 2 callback tương ứng với 2 sự kiện `click` và `close`.

● Để ẩn `masklayer` ta sử dụng method `this.$mask('hide')`.

```typescript
class SampleMaskViewModel extends Vue {
    // method show mask
    showMask() {
        this.$mask('show')
            .on(() => {
                // click event
                self.messages.push('mask_click');
            }, () => {
                // close event
                self.messages.push('mask_hide');
            });
    }

    // method hide mask
    hideMask() {
        this.$mask('hide');
    }
}
```