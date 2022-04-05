##### 2. ビューでの定義

```html
<nts-time-range-search v-on:search="searchList" />
```
HTMLでは`v-on:search="searchList"`がある`nts-time-range-search`のタグを作ってください。  
`searchList`はビューモデルにある関数である。  

##### 3. ビューモデルでの定義

ViewModelにはビューで使った関数を定義してください。  
ユーザーが「検索」ボタンをクリックするとこの関数が呼ばれる。
この関数は`startTime`と`endTime`のパラメータがあってユーザーが入力しない場合はNULLが渡される。

```ts
export class ViewModel extends Vue {
    *
    *
    public searchList(startTime: number, endTime: number) {
        // 「search」エベントを処理
    }
    *
    *
}
```

著者： Pham Van Dan