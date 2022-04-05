##### 2. Diễn giải
----
> `v-focus` là một `directive`. Khi được gắn vào một `input` bất kỳ, sau sự kiện `inserted` của vue `directive`, `input` đó sẽ được `focus` theo chỉ định.
> <br />Trong trường hợp có nhiều `v-focus` directive được chỉ định trong cùng một template, `v-focus` directive nào được chỉ định cuối cùng sẽ có tác dụng.

> **Mẹo**: Chỉ nên sử dụng 1 `v-focus` directive trong 1 template (`view/component`).


##### 3. Code
```html
<input v-focus type="text" class="form-control" />
```