   
##### 2. 説明

**HTML Code:**

```html
<div class="accordion">
  <!-- 既に開きたいならshowを追加してください。 -->
  <div class="card show">
    <div class="card-header">
      <button class="btn btn-link" type="button">
        <!-- タイトル -->
        Collapsible Group Item #1
      </button>
    </div>
    <div class="collapse">
      <div class="card-body">
        <!-- コンテンツ -->
        Content Group Item #1
      </div>
    </div>
  </div>
</div>
```

アコーディオンを作るためにこんな形通りに定義してください。
 
「accordion」というクラスをもつdivタグを作ってください。  
`accordion`の中に「card」というクラスをもつ各divタグを作って下さい。  
  
`card`の中に`card-header`や`collapse`がある。   
`card-header`の中にタイトルがある. 良かったら「btn btn-link」というクラスをもつbuttonタグを追加してください。  
`collapse`の中に「card-body」というクラスをもつdivタグを追加してください。`card-body`の中にはコンテンツを書いてください。

**注意：**　あのカードを開くと他のカードを自動で閉めたい時、`accordion`に「`"auto-close"` = `true`」という属性を追加してください。

下のイメージにアコーディオンを示します。


