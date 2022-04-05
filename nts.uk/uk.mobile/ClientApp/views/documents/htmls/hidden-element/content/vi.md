##### 1. Giải thích
Đôi khi, trong quá trình hoạt động của trang. 
Ta cần ẩn một hoặc một vài đối tượng của trang web đi.   
Ví dụ, ẩn button xoá khi người dùng đang đăng nhập không có quyền xoá.   
Trong trường hợp đó, hãy sử dụng class `.d-none` để ẩn button này đi.

##### 2. Chi tiết 

Dưới đây là bảng các class ẩn đối tượng tuỳ theo từng thiết bị cụ thể:

Screen Size |	Hidden | Visible
---- | ---- | ---- |
ALL | `.d-none` |  `.d-block` | 
Extra Small |  `.d-none .d-sm-block` |  `.d-block .d-sm-none` |
Small | `.d-sm-none .d-md-block` | `.d-none .d-sm-block .d-md-none` |
Medium | `.d-md-none .d-lg-block` |  `.d-none .d-md-block .d-lg-none` |
Large | `.d-lg-none .d-xl-block` |  `.d-none .d-lg-block .d-xl-none` |
Extra Large |  `.d-xl-none` | `.d-none .d-xl-block` |

