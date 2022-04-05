##### 2. 説明
`FixTableComponent`はテーブルをスマホで表示させるコンポネントである。  
FixTableComponentの主な機能は:
- 画面に４項目を表示し、ボタンを押しやスワイプ等で項目を切り替える
- 表示しきれない分はスクロールで見る
- 自動的に真ん中にある各カラムの幅さを計算する

##### 3. ViewModel
`FixTableComponent`は普通のコンポーネントではないからインポートしなければ使えないです。

```typescript
import { FixTableComponent } from '@app/components/fix-table';

@component({
    components: {
        'fix-table': FixTableComponent
    }
})
export class ViewModel extends Vue {

}
```
##### 4. View

ViewではViewModelで定義した&lt;fix-table&gt;タグを使ってください。  
&lt;fix-table&gt;の中の内容は実装者が自分で決めます。

```html
<fix-table>
      
<thead>
    <tr>
        ヘッダの内容
    </tr>
</thead>

<tbody >
    <tr>
        ボディの内容
    </tr>
</tbody>

<tfoot>
    <tr>
        フッターの内容
    </tr>
</tfoot>

</fix-table>
```

##### 5 補足情報

下のプロパティを指定してfix-tableの表示形を変更できます。
- `displayColumnsNumber`: 初期値 4 : 中の表示されるカラムの数値
- `rowNumber`: 初期値 5: 表示される行の数値
- `tableClass`: 初期値 'table table-bordered table-sm m-0' : fix-tableのCSSクラス
- `previousClass`: 初期値 'btn btn-secondary btn-sm' : 「前項」ボタンのCSSクラス
- `nextClass`: mặc định 'btn btn-secondary btn-sm' : 「次項」ボタンのCSSクラス

著者： Pham Van Dan