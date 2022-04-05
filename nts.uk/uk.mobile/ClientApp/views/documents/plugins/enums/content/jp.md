`Enum`は自動的にサーバーから列挙型を取る機能である。  
そうするためにまず`@Component`に`enums`属性を定義して列挙型名の配列を追加してください。
```javascript
@component({
    ...
    enums: [
        'nts.uk.ctx.sys.auth.dom.role.RoleType',
        'nts.uk.ctx.sys.auth.dom.role.EmployeeReferenceRange',
        'nts.uk.ctx.at.auth.dom.employmentrole.EmployeeRefRange',
        'nts.uk.ctx.at.auth.dom.employmentrole.ScheduleEmployeeRef'
    ]
})
```
列挙型を取りたい時、`this.$http.enum()`を呼んでください。  
そのメソッドに列挙型の名前を渡せる。引数がない場合、`enum()`メソッドは`@Component`に定義した列挙型をすべて取る。
```typescript
export class ViewModel extends Vue {

    public beforeCreate() {
        this.$http.enum().then( (res: { data: Array<Object> }) => {
            console.log(res.data);
        }); 
    }

     public mounted() {
        this.$http.enum(['nts.uk.ctx.sys.auth.dom.role.RoleType'])
        .then( (res: { data: Array<Object> }) => {
            console.log(res.data);
        }); 
    }
}
```


