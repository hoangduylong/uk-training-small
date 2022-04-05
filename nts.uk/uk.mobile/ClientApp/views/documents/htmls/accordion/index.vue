<template>
  <div class="documentshtmlsaccordion">
    <h5>1. {{'sample' | i18n}}</h5>

    <div class="accordion">
      <div class="card show">
        <div class="card-header">
          <button class="btn btn-link" type="button">Collapsible Group Item #1</button>
        </div>
        <div class="collapse">
          <div class="card-body">
            Content of group Item #1<br>
            Elements
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header db-caret-down">
            <button class="btn btn-link collapsed" type="button">Collapsible Group Item #2</button>
        </div>
        <div class="collapse">
          <div class="card-body">
            Content of group Item #2<br>
            Elements
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header db-caret-down">
            <button class="btn btn-link collapsed" type="button">Collapsible Group Item #3</button>
        </div>
        <div class="collapse">
          <div class="card-body">
            Content of group Item #3<br>
            Elements
          </div>
        </div>
      </div>
    </div>

    <markdown/>

    <div class="img-accordion">

        class="accordion"
        <div class="img-card">
            class="card <span style='color : red'>show</span>"
            <div class="img-card-header">
                class="card-header"
                <div class="img-btn-link">
                    class="btn btn-link"
                </div>
            </div>  
            <div class="img-collapse">
                class="collapse"
                <div class="img-card-body">
                    class="card-body"
                </div>
            </div>
        </div>

        <div class="img-card">
            class="card"
            <div class="img-card-header">
                class="card-header"
                <div class="img-btn-link">
                    class="btn btn-link"
                </div>
            </div>  
            <div class="img-collapse">
                class="collapse"
                <div class="img-card-body">
                    class="card-body"
                </div>
            </div>
        </div>

    </div>

  </div>
</template>