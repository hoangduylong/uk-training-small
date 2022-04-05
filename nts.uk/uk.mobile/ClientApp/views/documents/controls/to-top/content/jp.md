
下へ行ってこのボタンが出てくる。
<div class="totop show mb-2" style="position: unset;"><i class="fas fa-arrow-up"></i></div>

###### 2. 説明
`to-top`はトップへ早く行くのをサポートするコンポネントである。
###### 3 ViewModel
このコンポネントを使いためにまず`@app/components`の`TotopComponent`をインポートして`@Component`の'components'に定義してください。
```typescript
// TotopComponentをインポート
import { TotopComponent } from '@app/components/totop';

@component({
    components: {
        // componentsに定義
        'to-top': TotopComponent
    }
})
export class ViewModel extends Vue {

}
```
###### 4. HTML
componentsに定義したものをここに追加してください。
```html
<div class="app">
    <!-- sử dụng virtual dom đã khai báo ở view model-->
    <to-top />
</div>
```

**著者：**　Nguyen Van Vuong