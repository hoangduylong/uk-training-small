##### 1. 一般的なボタン
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button>
<br><br>
UK Mobileでよく使っているボタンである。  
これを作るためにボタンの種類によって`btn btn-...`というクラスを追加してください。
```html
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button>
```
---
##### 2. 無効のボタン
<button type="button" class="btn btn-primary" disabled>Primary</button>
<button type="button" class="btn btn-secondary" disabled>Secondary</button>
<button type="button" class="btn btn-success" disabled>Success</button>
<button type="button" class="btn btn-info" disabled>Info</button>
<button type="button" class="btn btn-warning" disabled>Warning</button>
<button type="button" class="btn btn-danger" disabled>Danger</button>
<button type="button" class="btn btn-link" disabled>Link</button>
<br><br>
ボタンを無効にするために`disabled`という属性を追加してください。
```html
<button type="button" class="btn btn-primary" disabled>Primary</button>
```
---
##### 3. Outline
<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>
<button type="button" class="btn btn-outline-success">Success</button>
<button type="button" class="btn btn-outline-info">Info</button>
<button type="button" class="btn btn-outline-warning">Warning</button>
<button type="button" class="btn btn-outline-danger">Danger</button>
<br><br>
アウトラインのボタンを作るために`"btn btn-outline-..."`というクラス使ってください。
```html
<button type="button" class="btn btn-outline-primary">Primary</button>
```
---
##### 4. Dropdown buttons

<div class="btn-group">
    <button type="button" class="btn btn-primary">登録</button>
    <button type="button" class="btn btn-primary dropdown-toggle"></button>
    <ul class="dropdown-menu">
        <li class="dropdown-item">新規</li>
        <li class="dropdown-item bg-red-500">削除</li>
    </ul>
</div>

`DropDown Buttons`は各ボタンを集めるものです。  
大切なボタンだけを表示するが、他のボタンが選択肢に集まられる。

`DropDown Buttons`を作るためにまず`btn-group`というクラスを持つDIVタグを作ってください。  
`btn-group`DIVのなかにはボタンを２作ってください:
- `マインボタン`: 一般的なボタンのように作ってください。
- `選択ボタン`: 下向きの矢印があるボタンである. `dropdown-toggle`というクラスをつけてください。  

次は`dropdown-menu`というクラスを持つULタグを作って中に`dropdown-item`というクラスを持つLIタグを追加してください。  
この各LIタグは選択肢にあるボタンである。

```html
<div class="btn-group">
    <button type="button" class="btn btn-primary" v-click:500="saveData">Save</button>
    <button type="button" class="btn btn-primary dropdown-toggle"></button>
    <ul class="dropdown-menu">
        <li class="dropdown-item" v-click="createNew">New</li>
        <li class="dropdown-item bg-red-500" v-click:500="deleteData">Delete</li>
    </ul>
</div>
```
---
##### 5. Button size
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-primary">Default button</button>
<button type="button" class="btn btn-primary btn-sm">Small button</button>
<br><br>
ボタンを大きくするために`btn-lg`というクラスを追加してください。  
ボタンを小さくするために`btn-sm`というクラスを追加してください。   
```html
<button type="button" class="btn btn-primary btn-lg">Large button</button>
<button type="button" class="btn btn-primary">Default button</button>
<button type="button" class="btn btn-primary btn-sm">Small button</button>
```
---
##### 6. Block button (full width)
<button type="button" class="btn btn-primary btn-block">Block level button</button>
<br>
幅が全画面に表示されるボタンを作るために`btn-block`というクラスを追加してください。
```html
<button type="button" class="btn btn-primary btn-block">Block level button</button>
```
---
##### 7. Selection button (full width)

<button type="button" class="btn btn-selection">
    <span class="badge badge-secondary">0001</span>
    <span>Name of selection</span>
</button>
<br>

これはUK Mobileの特殊なボタンです。<br>
こんなボタンを作るため、まず`btn btn-selection`というクラスを使ってください。<br>
ボタンの中にある<b>コード</b>部分を作るために`badge badge-secondary`というクラスを使ってください。<br>

```html
<button type="button" class="btn btn-selection">
    <span class="badge badge-secondary">0001</span>
    <span>Name of selection</span>
</button>
```
---

<button type="button" class="btn btn-selection mt-2 mb-2">
    <span class="badge badge-secondary">0001</span>
    <span>Name of selection</span>
    <span class="d-block mt-1">2010~2019</span>
</button>

このボタンは`2010～2019`など制約区分があるからこれを作るために`d-block mt-1`というクラスを持つ`span`タグを追加してください。


```html
<button type="button" class="btn btn-selection">
    <span class="badge badge-secondary">0001</span>
    <span>Name of selection</span>
    <span class="d-block mt-1">2010~2019</span>
</button>
```

---
##### 8. Checkbox group
<div class="btn-group btn-group-toggle mb-3">
    <label class="btn btn-primary">
        <input type="checkbox" checked> Active
    </label>
    <label class="btn btn-primary">
        <input type="checkbox"> Check
    </label>
    <label class="btn btn-primary" >
        <input type="checkbox"> Check
    </label>
</div>

```html
<div class="btn-group btn-group-toggle">
    <label class="btn btn-primary" >
        <input type="checkbox" checked/> Active
    </label>
    <label class="btn btn-primary">
        <input type="checkbox"/> Check
    </label>
    <label class="btn btn-primary">
        <input type="checkbox"/> Check
    </label>
</div>
```
---
##### 9. Switch button
<div class="btn-group btn-group-toggle mb-3">
    <label class="btn btn-primary">
        <input type="radio" name="options" checked /> Active
    </label>
    <label class="btn btn-primary">
        <input type="radio" name="options"/> Radio
    </label>
    <label class="btn btn-primary">
        <input type="radio" name="options"/> Radio
    </label>
</div>


```html
<div class="btn-group btn-group-toggle mb-3">
    <label class="btn btn-primary">
        <input type="radio" name="options" checked/> Active
    </label>
    <label class="btn btn-primary">
        <input type="radio" name="options" /> Radio
    </label>
    <label class="btn btn-primary">
        <input type="radio" name="options"/> Radio
    </label>
</div>
```
---

##### 10. Tool bar (group buttons)
<div class="btn-toolbar">
    <div class="btn-group mr-4 mb-3">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
    <div class="btn-group mr-4 mb-3">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
    <div class="btn-group mb-3">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
</div>

##### Code
```html
<div class="btn-toolbar">
    <!-- group 1 -->
    <div class="btn-group mr-4">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
    <!-- group 2 -->
    <div class="btn-group mr-4">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
    <!-- group 3 -->
    <div class="btn-group">
        <button type="button" class="btn btn-secondary">New</button>
        <button type="button" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-danger">Delete</button>
        <button type="button" class="btn btn-secondary">Open dialog</button>
    </div>
</div>
```

著者： Nguyen Van Vuong