##### 2. ビュー

連続クリック防止のために`v-on:click`に変わって`v-click:500`を使ってください。   
`500`は時間だから機能によって変わられる。  
`500`ならクリックしたらあと`500ミリ秒`クリックできる。

```html
<button v-click:500="multiClick">{{ 'prevent_multi_click' | i18n }}</button>
```
`multiClick`はビューモデルにある関数の名前である。

##### 3. ビューモデル

```typescript
class PreventMultiClick {
    multiClick() {
        this.results.push('Click time: ' + new Date().toISOString());
    }
}
```
