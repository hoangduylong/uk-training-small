
##### 1. Preview

<div class="clearfix">
    <div class="float-left" style="background-color: #4285f4; color: yellow">Float Left</div>
    <br>
    <br>
    <div class="float-right" style="background-color: #4285f4; color: yellow">Float Right</div>
    <br>
    <br>
    <div class="float-none" style="background-color: #4285f4; color: yellow">Float None</div>
</div>

---

##### 2. 説明

画面を作るとき右側また左側におかなければならないエレメントがある。  
そうするために`.float-left`や`.float-right`を使ってください。  

```html
<div class="clearfix">
    <div class="float-left">Float Left</div>
    <div class="float-right">Float Right</div>
    <div class="float-none">Float None</div>
</div>
```

画面のサイズによるクラス一覧

| Type\Size | None | Small | Medium | Large | Extra Large |
| ----------- | ----------- | ----------- | ----------- | ----------- | ----------- |
| Float Left | .float-left | .float-sm-left | .float-md-left | .float-lg-left | .float-xl-left |
| Float Right | .float-right | .float-sm-right | .float-md-right | .float-lg-right | .float-xl-right |
| Float None | .float-none | .float-sm-none | .float-md-none | .float-lg-none | .float-xl-none |