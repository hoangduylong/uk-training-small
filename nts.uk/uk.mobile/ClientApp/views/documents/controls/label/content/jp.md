##### 2.　ビューでの定義
###### 2.1 制約を表示しない場合
```html
<nts-label>{{'not_required_label' | i18n}}</nts-label>
```
###### 2.2 制約を表示する場合

制約を表示するために`v-bind:constraint`を追加してください。
```html
<nts-label v-bind:constraint="{required: true, min: 100, max: 1000}">{{'required_label' | i18n}}</nts-label>
```
###### 2.3 制約を一行で表示する場合
一行で表示した時`control-label-inline`というクラスを追加したください。
```html
<nts-label v-bind:constraint="{required: true, min: 100, max: 1000}" 
        class="control-label-inline">
        {{'sample_label' | i18n}}
</nts-label>
```
   
   
著者： Nguyen Van Vuong