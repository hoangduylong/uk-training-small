#### 1. シングルカード
##### 1.1 サンプル

<div class="card">
  <h5 class="card-header">Main-Label</h5>
  <div class="card-body">
    <h5 class="card-title">Sub-Label</h5>
    <p class="card-text">ここでは何も追加できる</p>
    <a href="javascript:void(0)" class="btn btn-primary">サンプルボタン</a>
  </div>
</div>

---
##### 1.2 Code
シングルカードを作るため、`card`というクラスを持つDIVタグを作ってください。  
`card`の中に`card-header`と`card-body`というクラスを持つDIVタグを作ってください。  
`card-header`と`card-body`のなかには自由で各タグを追加できる。

```html
<div class="card">
　<!-- card-header part-->
  <h5 class="card-header">Main-Label</h5>

  <!-- card-body part-->
  <div class="card-body">
    <h5 class="card-title">Sub-Label</h5>
    <p class="card-text">ここでは何も追加できる</p>
    <a href="javascript:void(0)" class="btn btn-primary">サンプルボタン</a>
  </div>
</div>
```
#### 2. グループカード
##### 2.1 サンプル

<div class="card card-label mb-2">
  <div class="card-header">
    <span>勤務種類 / 就業時間帯</span>
    <span class="badge badge-warning">必須</span>
  </div>
  <div class="card-body">
    <span>勤務種類</span>
    <button type="button" class="btn btn-selection mt-2 mb-2">
        <span class="badge badge-secondary">0001</span>
        <span>出勤</span>
    </button>
    <span>就業時間帯</span>
    <button type="button" class="btn btn-selection mt-2 mb-2">
        <span class="badge badge-secondary">0001</span>
        <span>通常勤務５６ </span>
        <span class="d-block mt-1">（翌々日00:00 ～ 翌々日23:59）</span>
    </button>
  </div>
</div>
<div class="card card-label mb-2">
  <div class="card-header">
    <span>勤務時間</span>
    <span class="badge badge-info">任意</span>
  </div>
  <div class="card-body">
    <input type="text" class="form-control" />
  </div>
</div>

---
##### 2.2 Code
グループにあるカードに`card card-label`というクラスを付けてください。  
`card`のなかにも`card-header`と`card-body`がある。  

`必須`と`任意`アイコンを作るために`badge badge-warning`と`badge badge-info`というクラスを追加してください。

**注意**: 子項目がある場合下のソースコードを参照してください。(`sub-element`部分)
```html
<div class="card card-label">
  
  <!-- card-header part-->
  <div class="card-header">
    <span>項目名</span>
    <span class="badge badge-warning">必須</span>
  </div>

  <!-- card-body part-->
  <div class="card-body">

    <!-- sub-element 1 -->
    <span>勤務種類</span>
    <button type="button" class="btn btn-selection mt-2 mb-2">
        <span class="badge badge-secondary">0001</span>
        <span>出勤</span>
    </button>

    <!-- sub-element 2 -->
    <span>就業時間帯</span>
    <button type="button" class="btn btn-selection mt-2 mb-2">
        <span class="badge badge-secondary">0001</span>
        <span>通常勤務５６ </span>
        <span class="d-block mt-1">（翌々日00:00 ～ 翌々日23:59）</span>
    </button>

  </div>
</div>
```