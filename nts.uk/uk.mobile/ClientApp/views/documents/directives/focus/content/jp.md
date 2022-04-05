##### 2. 説明

`v-focus` は `directive`である。`v-focus`をつける`input`はフォーカスされる。  
テンプレートに`v-focus`が２つ以上ある場合は最後指定された`v-focus`がフォーカスされる。

| 注意：テンプレートには`v-focus`を１つだけ使った方がいい。 |
| --- |


##### 3. コード
```html
<input v-focus type="text" class="form-control" />
```