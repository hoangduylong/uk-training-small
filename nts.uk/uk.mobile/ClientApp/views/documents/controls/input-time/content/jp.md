##### 2. ビューでの定義

`nts-time-editor`には**日区分付き時刻**とか**時刻**とか**時間**とか種類が３ある。  
**日区分付き時刻**と**時刻**大体同じだけど  
**日区分付き時刻**は「前日」、「今日」、「翌日」、「翌々日」の**日区分**があって、  
**時刻**は「前日」のデータをマイナスで、「翌日」のデータを24時から47時59分まで、「翌々日」のデータを48時から71時59分まで表示する。
   

**時間**は例えば残業時間。

`nts-time-editor`の表示方法を指定するため, `time-input-type`という属性を定義してください。  
`time-input-type`は `time-with-day`日区分付き時刻、`time-point`時刻、`time-duration`時間です。
  
ほかにも`name`と`v-model`を定義してください。  
`name`: 項目名  
`v-model`: ビューモデルにある変数。

```html
<nts-time-editor
    v-model="timeWithDay"
    name='日区分付き時刻　(Time-With-Day)'
    time-input-type="time-with-day"
    />

<nts-time-editor
    v-model="timePoint"
    name='時刻  (Time-Point)'
    time-input-type="time-point"
    />

<nts-time-editor
    v-model="timeDuration"
    name='時間  (Time-Duration)'
    time-input-type="time-duration"
    />
```

##### 3. ビューモデルでの定義
ビューモデルにはビューで使った変数を定義してください。  
既に値がまだない変数は`null`を代入してください。

```typescript
export class ViewModel extends Vue {

    public timeWithDay: number = null;

    public timePoint: number = null;

    public timeDuration: number = null;
}
```

##### 4. 補足情報

| 属性名| 種類 | 初期値 | 説明 |
| --------------|------| -------- | ------|
| name | string | '' | 項目名 |
| disabled | boolean | false | 項目が無効される? |
| showTitle | boolean | true | ラベルを表示する？ |
| inlineTitle | boolean | false | ラベルと拘束は一行で表示する？ |
| columns | {title, input} | {title: 'col-md-12', input: 'col-md-12'} | ラベルとインプットを一行に表示したい時、これを修正ください。（例えば：{ title: 'col-md-6', input: 'col-md-6'}）|

著者：Pham Van Dan