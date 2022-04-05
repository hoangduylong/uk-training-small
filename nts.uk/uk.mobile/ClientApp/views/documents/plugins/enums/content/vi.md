Enum là tính năng lấy về tự động khai báo enum ở server.  
Để làm điều này bạn hãy khai báo thuộc tính enums tại `@Component` và truyền vào một mảng Enum.  
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
Tại một thời điểm nào đó, bạn có thể lấy về định nghĩa enum bằng cách gọi method `this.$http.enum()`.  
Bạn có thể truyền vào method này tên Enum muốn lấy về. Nếu không có argument này, method `enum()` sẽ lấy về tất cả các enum được khai báo ở `@Component`.


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


