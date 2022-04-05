##### 2. 説明

<nav class="nav nav-pills nav-step-wizard nav-justified">
    <a href="javascript:void(0)" class="nav-item nav-link disabled">1</a>
    <a href="javascript:void(0)" class="nav-item nav-link disabled active"><span>2</span> <span>申請時間</span></a>
    <a href="javascript:void(0)" class="nav-item nav-link disabled">3</a>
    <a href="javascript:void(0)" class="nav-item nav-link disabled">4</a>
</nav>

`Step-wizard`はステップを表示するツールバーを作るコンポネントである（サンプルに一番上の部分）。
##### 3. ViewModel
`step-wizard`を使いためにまず`@app/components`から`StepwizardComponent`をインポートして`@Component`のcomponentsに定義してください。

```typescript
...
// StepwizardComponentをインポート 
import { StepwizardComponent } from '@app/components';
@component({
    components: {
        // step-wizardを定義
        'step-wizard': StepwizardComponent
    }
})
export class ViewModel extends Vue {

    public step = 'step_1';
    ...
}
```

##### 4. HTML
HTMLでは`@Component`のcomponentsに定義した`step-wizard`を使ってください。  
引数が`items`と`selected`２ある、
- items: はステップのリスト
- selected: 現在のステップである. selectedの値はViewModelにある`step`の変数。

```html
<step-wizard v-bind:items="['step_1', 'step_2', 'step_3', 'step_4']" v-bind:selected="step" />
```
 >**注意**: 実際には`['step_1', 'step_2', ...]`を使わないで設計書にある`resources id`使ってください。例えば： `['KAFS05_2', 'KAFS05_3']`.

##### 5. 「次へ」と「戻る」などステップを変更するボタンを作る
そうすると`step-wizard`を作ったがまだステップをできない。そうするために各ボタンを作りましょう。

```html
<div>
    <!-- 「次へ」ボタン-->
    <button v-show="step == 'step_1'" v-on:click="nextToStep2">計算して次へ</button>
    <button v-show="step == 'step_2'" v-on:click="nextToStep3">次へ</button>
    <button v-show="step == 'step_3'" v-on:click="nextToStep4">申請する</button>
    <button v-show="step == 'step_4'" v-on:click="done">登録した申請を確認する</button>

    <!-- 「戻る」ボタン-->
    <button v-show="step == 'step_2'" v-on:click="backToStep1">戻る</button>
    <button v-show="step == 'step_3'" v-on:click="backToStep2">戻る</button>
    <button v-show="step == 'step_4'" v-on:click="backToStep3">申請一覧へ</button>
</div>
```
`v-show`を使って各ボタンがステップによって表示される。  
`v-on:click`を使ってエベントを取ってください。  
エベントの中`step`変数を変更してください。

```typescript
export class ViewModel extends Vue {
    
    public get step = 'step_1';

    public nextToStep2() {
        // stepを変更する前の処理

        this.step = 'step_2';
    }

    .....
}
```

##### 6. ステップの内容を作る
ステップによる内容を表示するために`v-if`を使ってください。
```html
<div>
    <div v-if="step == 'step_1'">勤務情報の内容</div>
    <div v-if="step == 'step_2'">申請時間の内容</div>
    <div v-if="step == 'step_3'">確認メッセージ</div>
    <div v-if="step == 'step_4'">登録しました。</div>
</div>
```



**著者**: Nguyen Van Vuong