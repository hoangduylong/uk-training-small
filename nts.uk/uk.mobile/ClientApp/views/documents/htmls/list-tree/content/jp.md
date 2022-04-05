##### 2. 説明
UKモバイルには`tree-list`は階層表示方法です。`tree-list`はコンポーネントではないです。
##### 3. ViewModel

まず自分で定義する、またサーバーから取るリストが必要です。
次は`utils/object/hierarchy()`メソッドを使って表示される各項目を用意します。このメソッドはパラメータが２ある：
- **items**: 準備したリスト
- **childProp**: 子のリストが含まれている属性名（この場合は`children`）。

```typescript
import { obj } from '@app/utils';

export class ViewModel {
    // 自分で定義する、またサーバーから取るリスト
    public items: Array<any> = [
        {
            name: 'item1', 
            children: [
                {
                    name: 'item 1-1',
                    children: []
                }
            ]
        }, {
            name: 'item2'
            children: []
        }

    ];

    // VueのComputedを使って表示されるリストを用意する
    get flatten() {
        return obj.hierarchy(this.items, 'children');
    }
}
```

##### 4. HTML

表示されるリストを用意した後ビューを作る

 1, `"list-group list-group-tree"`というクラスを持つ&lt;ul&gt;タグを作る  
 2, &lt;ul&gt;タグには`v-for`を使ってclass=`"list-group-item"`とv-bind:key=`"k"`とv-tree=`"item"`の&lt;li&gt;タグのリストを作る。  

&lt;li&gt;タグの中には自由で定義してください。下はテンプレートです。  

ラジオの`tree-list`。

```html
<ul class="list-group list-group-tree">
    <li v-for="(item, k) in flatten" class="list-group-item" v-bind:key="k" v-tree="item">
        <span>{{item.id}} {{item.text}}</span>
        <input class="selection" type="radio" v-model="selected" v-bind:value="item">
    </li>
</ul>
```

チェックボックスの`tree-list`

```html
<ul class="list-group list-group-tree">
    <li v-for="(item, k) in flatten" class="list-group-item" v-bind:key="k" v-tree="item">
        <span>{{item.id}} {{item.text}}</span>
        <input class="selection" type="checkbox" v-model="selecteds" v-bind:value="item">
    </li>
</ul>
```

著者：Nguyen Van Vuong