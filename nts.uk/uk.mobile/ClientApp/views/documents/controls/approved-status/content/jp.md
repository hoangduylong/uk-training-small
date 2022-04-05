##### 2. 説明
ApprovedComponentは各ボタンと適応な内容を表示するコンポネントです。

##### 3. ViewModel

`ApprovedComponent`は普通のコンポーネントではないからインプットして定義して作ってください。 
ViewModelで選択している値を持つ変数を定義してください。

```typescript
import { ApprovedComponent } from '@app/components';

@component({
    components: {
        // ここにapprovedを定義する
        'approved': ApprovedComponent
    }
})
export class ViewModel extends Vue {

    // 選択しているボータンの値
    public selected: number = 0;
}
```

##### 4. HTML

HTMLでは, &lt;approved&gt;を作って`v-model="selected"`という属性を追加してください。 

&lt;approved&gt;の中に`v-slot:buttons`と`v-slot:popovers`という属性を持つ ２&lt;template&gt;を追加してください。  

- v-slot:button: 各ボタンを定義する。
- v-slot:popovers: ボタンによる内容を定義する。


```html
<approved v-model="selected">
    <template v-slot:buttons>
        <button class="uk-apply-reflected">済</button>
        <button class="uk-apply-approved">済</button>
        <button class="uk-apply-denial">済</button>
        <button class="uk-apply-return">済</button>
        <button class="uk-apply-cancel">済</button>
    </template>
    <template v-slot:popovers>
        <template v-if="selected == 0">
            ボタン０による内容
        </template>
        <template v-else-if="selected == 1">
            ボタン１による内容
        </template>
        <template v-else-if="selected == 2">
            ボタン２による内容
        </template>
        <template v-else-if="selected == 3">
            ボタン３による内容
        </template>
        <template v-else-if="selected == 4">
            ボタン４による内容
        </template>
    </template>
</approved>
```

著者：Nguyen Van Vuong