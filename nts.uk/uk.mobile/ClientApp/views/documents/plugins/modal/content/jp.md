##### 2. 説明

`Modal`はあるコンポネントをダイアログの形で表示をサポートするプラグインである。
モーダルを作るために`$modal(component, params?, option?)`メソッドを使ってください。
- `component`の種類は`string`か`Component`です。これはダイアログで表示される内容を指定する。
- `params`はモーダルに渡される親のビューモデルのデータである。
- `option`は表示方法を決める。


#####   3. Code TypeScript
```typescript
@component({
    ...
    components: {
        // 子のコンポーネントを定義
        'sample': ModalComponent
    }
})
export class ParentComponent extends Vue {
    name: string = 'Nittsu System Viet Nam';

    showModal() {
        let name = this.name;
        // モーダルを作る
        this.$modal(
            'sample', // 上に定義したコンポーネント名
            { name } // params
        ).then(v => {
            // もらう結果
            alert(`You are choose: ${v}`);
        });
    }
}
```

`$modal()`メソッドの三番目のパラメータ(`option`)は下みたい。
```typescript 
declare interface IModalOptions {
    type?: 'modal' | 'popup' | 'info' | 'dropback';
    size?: 'lg' | 'md' | 'sm' | 'xs';
    title?: string;
    style?: string;
    animate?: 'up' | 'right' | 'down' | 'left';
    opacity?: number;
}
```
**Some sample `modal-header`**
> default header
<div class="modal-header rounded-0 d-block p-0 mb-2">
    <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
            <i class="fas fa-angle-left mr-1"></i>
            <span>dialog</span>
        </h4>
    </div>
</div>

```html
<div class="modal-header rounded-0 d-block p-0">
    <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
            <i class="fas fa-angle-left mr-1" v-on:click="$close"></i>
            <span>{{ 'dialog' | i18n }}</span>
        </h4>
    </div>
</div>
```
> modal-header with searchbox

<div class="modal-header rounded-0 d-block p-0 mb-2">
    <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
            <i class="fas fa-angle-left mr-1"></i>
            <span>dialog</span>
        </h4>
    </div>
    <div class="uk-bg-headline p-2 pb-1">
        <label>resources_id</label>
        <div class="form-group mb-1 bg-grey-100">
            <div class="input-group input-group-transparent input-group-search">
                <div class="input-group-append">
                    <span class="input-group-text fa fa-search"></span>
                </div>
                <input placeholder="resources_id" type="text" class="form-control">
            </div>
        </div>
    </div>
</div>

```html
<div class="modal-header rounded-0 d-block p-0">
    <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
            <i class="fas fa-angle-left mr-1" v-on:click="$close"></i>
            <span>{{ 'dialog' | i18n }}</span>
        </h4>
    </div>
    <div class="uk-bg-headline p-2 pb-1">
        <label>{{ 'resources_id' | i18n }}</label>
        <nts-search-box class="bg-grey-100" placeholder="resources_id" />
    </div>
</div>
```
> modal-header has menu
<div class="modal-header rounded-0 d-block p-0 mb-2">
    <div class="uk-bg-teal p-2 row m-0">
        <h4 class="modal-title text-white col-4 p-0">
            <i class="fas fa-angle-left mr-1"></i>
            <span>dialog</span>
        </h4>
        <div class="text-right col-8 p-0">
            <button class="btn btn-link text-white">
                <i class="fas fa-save"></i>
            </button>
            <button class="btn btn-link dropdown-toggle btn-no-content text-white">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
                <li class="dropdown-item">New</li>
                <li class="dropdown-item">Delete</li>
            </ul>
        </div>
    </div>
</div>

```html
<div class="modal-header rounded-0 d-block p-0 mb-2">
    <div class="uk-bg-teal p-2 row m-0">
        <h4 class="modal-title text-white col-4 p-0">
            <i class="fas fa-angle-left mr-1"></i>
            <span>dialog</span>
        </h4>
        <div class="text-right col-8 p-0">
            <button class="btn btn-link text-white">
                <i class="fas fa-save"></i>
            </button>
            <button class="btn btn-link dropdown-toggle btn-no-content text-white">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
                <li class="dropdown-item">New</li>
                <li class="dropdown-item">Delete</li>
            </ul>
        </div>
    </div>
</div>
```

##### 4. 特別なモーダル

<span class="text-info">**information**</span>,&nbsp;
<span class="text-warning">**warning**</span>,&nbsp;
<span class="text-danger">**error**</span>,&nbsp;
**confirm**など特別なモーダルをこのように作ってください。
``` typescript
$modal.info('メッセージ内容');
$modal.warn('メッセージ内容');
$modal.error('メッセージ内容');
$modal.confirm('メッセージ内容', 'normal' | 'dange' | 'primary');
```

`messageId`も使える。

``` typescript
$modal.info({
    messageId: string,
    messageParams: string[] | { [key: string]: string } 
});
$modal.warn({
    messageId: string, 
    messageParams: string[] | { [key: string]: string; } 
});
$modal.error({
    messageId: string,
    messageParams: string[] | { [key: string]: string; } 
});
$modal.confirm(
    {
        messageId: string, 
        messageParams: string[] | { [key: string]: string; } 
    }, 
    'normal' | 'dange' | 'primary'
)
```