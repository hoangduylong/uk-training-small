  
##### 1. Preview
<div class="fixed-action-btn active" style="z-index: 99; position: relative; width: 330px; margin-top: 50px;">
    <ul class="list-unstyled" style="height: 228px">
        <li class="btn-info btn btn-floating">
            <span>vote_app</span>
            <i class="fas fa-star"></i>
        </li>
        <li class="btn-primary btn btn-floating">
            <span>manager_users</span>
            <i class="fas fa-user"></i>
        </li>
        <li class="btn-success btn btn-floating">
            <span>go_to_mail</span>
            <i class="fas fa-envelope"></i>
        </li>
        <li class="btn-warning btn btn-floating">
            <span>go_to_cart</span>
            <i class="fas fa-shopping-cart"></i>
        </li>
    </ul>
    <a class="btn btn-danger btn-lg btn-floating" style="margin-left: 135px;">
        <i class="fas fa-plus"></i>
    </a>
</div>

##### 2. Float buttons
`v-float-action` là một `directive` nhóm một nhóm các `button` thành một `floating`.  
Thực tế mỗi màn hình sẽ sử dụng `v-float-action` này cho mỗi tác vụ khác nhau.

##### 3. Code
> Cấu trúc cơ bản của một `v-float-action`:

```html
<div v-float-action>
    <ul>
        <li class="btn-info">
            <span>{{'vote_app' | i18n}}</span>
            <i class="fas fa-star"></i>
        </li>
        <li class="btn-primary">
            <span>{{'manager_users' | i18n}}</span>
            <i class="fas fa-user"></i>
        </li>
        <li class="btn-success">
            <span>{{'go_to_mail' | i18n}}</span>
            <i class="fas fa-envelope"></i>
        </li>
        <li class="btn-warning">
            <span>{{'go_to_cart' | i18n}}</span>
            <i class="fas fa-shopping-cart"></i>
        </li>
    </ul>
</div>
```
> Hoặc developer có thể tùy biến `icon`, `background`, `forceground` của `float-button` thông qua tham số truyền vào `directive`: `{ icon: string; background: string; forceground: string; }`.

```html
<div class="fixed-action-btn" v-float-action="{ icon: 'fas fa-pen', background: 'bg-brown-500', forceground: '' }">
    <ul>
        <li class="btn-info">
            <span>{{'vote_app' | i18n}}</span>
            <i class="fas fa-star"></i>
        </li>
        <li class="btn-primary">
            <span>{{'manager_users' | i18n}}</span>
            <i class="fas fa-user"></i>
        </li>
        <li class="btn-success">
            <span>{{'go_to_mail' | i18n}}</span>
            <i class="fas fa-envelope"></i>
        </li>
        <li class="btn-warning">
            <span>{{'go_to_cart' | i18n}}</span>
            <i class="fas fa-shopping-cart"></i>
        </li>
    </ul>
</div>
```
<div class="mt-3"></div>

> Người viết: **Nguyễn Văn Vương**
<div class="mb-3"></div>