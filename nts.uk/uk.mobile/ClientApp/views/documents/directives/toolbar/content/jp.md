##### 1. サンプル
<div class="navbar" style="padding-left: 15px">
    <div class="row">
        <div class="col-md-9">
            <button type="button" class="btn btn-link"><i class="fa fa-save"></i></button>
            <button type="button" class="btn btn-link">Middle</button>
            <button type="button" class="btn btn-link">Right</button>
        </div>
        <div class="col-md-3">
            <div class="input-group input-group-transparent input-group-search">
                <div class="input-group-append">
                    <span class="input-group-text fa fa-search"></span>
                </div>
                <input type="text" class="form-control" />
            </div>
        </div>
    </div>
</div>

<div class="navbar mt-2">
    <div class="row">
        <div class="col-9 col-md-6">
            <button type="button" class="btn btn-link"><i class="fa fa-save"></i></button>
            <button type="button" class="btn btn-link">Middle</button>
            <button type="button" class="btn btn-link">Right</button>
        </div>
        <div class="col-3 col-md-3 text-right">
            <button class="btn btn-link dropdown-toggle text-white">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
                <li class="dropdown-item">New</li>
                <li class="dropdown-item">Delete</li>
            </ul>
        </div>
        <div class="col-12 col-md-3">
            <div class="input-group input-group-transparent input-group-search">
                <div class="input-group-append">
                    <span class="input-group-text fa fa-search"></span>
                </div>
                <input type="text" class="form-control" />
            </div>
        </div>
    </div>
</div>

<nav class="navbar mt-2">
    <div class="row">
        <div class="col-9 col-md-3">
            <a class="navbar-brand">PG Name</a>
        </div>
        <div class="col-3 col-md-3 text-right .d-block .d-sm-none">
            <button class="btn btn-link dropdown-toggle text-white">
                <i class="fas fa-ellipsis-v"></i>
            </button>
            <ul class="dropdown-menu dropdown-menu-right">
                <li class="dropdown-item">New</li>
                <li class="dropdown-item">Delete</li>
            </ul>
        </div>
        <div class="col-12 col-md-6 text-right">
            <button type="button" class="btn btn-link"><i class="fa fa-save"></i></button>
            <button type="button" class="btn btn-link">Middle</button>
            <button type="button" class="btn btn-link">Right</button>
        </div>
        <div class="col-12 col-md-3">
            <div class="input-group input-group-transparent input-group-search">
                <div class="input-group-append">
                    <span class="input-group-text fa fa-search"></span>
                </div>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
</nav>
<br />

##### 2. 説明
`toolbar`は`directive`である。  
Toolbarを作るために`v-toolbar`を`nav`や`div`につけてください。

##### 3. コード
```html
<div v-toolbar>
    <div class="row">
        <div class="col-md-9">
            <button type="button" class="btn btn-link">
                <i class="fa fa-save"></i>
            </button>
            <button type="button" class="btn btn-link">Middle</button>
            <button type="button" class="btn btn-link">Right</button>
        </div>
        <div class="col-md-3">
            <div class="input-group input-group-transparent input-group-search">
                <div class="input-group-append">
                    <span class="input-group-text fa fa-search"></span>
                </div>
                <input type="text" class="form-control" />
            </div>
        </div>
    </div>
</div>
```
**Or**:
```html
<nav class="navbar">
    <div class="row">
        <div class="col-md-3">
            <a class="navbar-brand">PG Name</a>
        </div>
        <div class="col-md-6 text-right">
            <button type="button" class="btn btn-link"><i class="fa fa-save"></i></button>
            <button type="button" class="btn btn-link">Middle</button>
            <button type="button" class="btn btn-link">Right</button>
        </div>
        <div class="col-md-3">
            <div class="input-group input-group-transparent input-group-search">
                <div class="input-group-append">
                    <span class="input-group-text fa fa-search"></span>
                </div>
                <input type="text" class="form-control">
            </div>
        </div>
    </div>
</nav>
```