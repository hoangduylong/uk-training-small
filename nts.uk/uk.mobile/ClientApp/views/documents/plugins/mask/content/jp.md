##### 2. 説明

ユーザーが画面に触らないようにしたい時は`$mask`メソッドを使って`masklayer`を作ってください。

##### 3. Code

●　`masklayer`を作るために`this.$mask('show')`メソッドを使ってください。  
`opacity`を渡して`masklayer`の不透明度を指定できる。  
`opacity`は 0 ➡1  
0は透明で1は真っ黒  
例えば: `this.$mask('show', 0.65)`  
  
`masklayer`を作った後エベントが２つある:
1, ユーザーが画面に触る
2, `masklayer`が解けられる。
  
その各エベントをキャッチするために`on()`メソッドを使ってください。

● `masklayer`解けるために`this.$mask('hide')`メソッドを使ってください。

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