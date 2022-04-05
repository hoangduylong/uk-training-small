##### 1. 説明

`i18n`はVueの`filter`である。それは`resourceid`を使って内容を取って表示する。  
`$i18n`はVueの`mixin`である。ViewModelのメソッドのように使ってください。

##### 2. ビュー
```html
<!-- Filter -->
<!-- パラメータを持たないフィルターを使う-->
<div>{{resourceid | i18n}}</div>
<!-- パラメータを１だけ持つフィルターを使う-->
<div>{{resourceid | i18n(params1) }}</div>
<!-- パラメータの配列を持つフィルターを使う -->
<div>{{resourceid | i18n([params1, params2]) }}</div>
<!-- パラメータのオブジェクトを持つフィルターを使う -->
<div>{{resourceid | i18n({key1: value1, key2: value2}) }}</div>

<!-- Mixin-->
<div>{{ $i18n(resourceid, [param1, param2]) }}</div>
```
##### 3　ビューモデル

`ViewModel`でも`$i18n`を使える。
```typescript
class ViewModel extends Vue {
    created() {
        this.$i18n(resourceid, param1);
        // hoặc
        this.$i18n(resourceid, [param1, params2]);
        // hoặc 
        this.$i18n(resourceid, {key1: value1, key2: value2});
    }
}
``` 

**著者：Nguyen Van Vuong**