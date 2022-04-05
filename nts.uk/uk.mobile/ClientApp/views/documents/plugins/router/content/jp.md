##### 1 ビューモデルでナビゲート

他の画面にナビゲートするために`$goto(component, paramObject)`メソッドを使ってください。
- `component` はVueコンポーネントかVueコンポーネント名
- `paramObject` は次の画面に渡される値

```typescript
export class OriginComponent extends Vue {

    gotoComponent() {
        let self = this;
        self.$goto('DestinationComponent', { 
            id: 100, 
            name: '太郎'
        });
    }
}
```
次の画面では渡された値をもらうために`params`というプロパティを定義してください。
``` typescript
export class DestinationComponent extends Vue {

    @Prop()
    public readonly params : {
        id: number,
        name: string
    }

}
```
##### 2 ビューでナビゲート

ビューでも`v-on:click`を使ってナビゲートできる。

```html
<a class="btn btn-link" v-on:click="$goto('SampleComponent')">{{'go_to_sample' | i18n}}</a>
```

`Vue-router`の`<router-link>`タグも使える。

```html
<router-link to="/sample">{{'go_to_sample' | i18n}}</router-link>

<router-link v-bind:to="{ name: 'SampleComponent' }">{{'go_to_sample' | i18n}}</router-link>
```

著者: **Nguyen Van Vuong**