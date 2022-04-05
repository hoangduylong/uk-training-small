<template>
  <div class="documentshtmlscolor">
    <h4 class="mt-3">UK Mobile special class</h4>
    <div class="row mb-3">
      <div class="col-md-2 col-6 text-center" v-for="(item, k) in applyColors" v-bind:key="k">
        <div class="mb-2 mr-2 p-2" v-bind:class="'apply-' + item">
          {{item}}
        </div>
        <pre class="m-0">{{'apply-' + item }}</pre>
        <pre class="m-0">{{'uk-apply-' + item }}</pre>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-4 mb-3">
        <h4>UK Mobile color pallet</h4>
        <ul class="list-group border-0">
          <li class="list-group-item border-0 uk-color-swatch p-1" v-for="(l, j) in ukMobiles" v-bind:key="j" v-bind:class="'uk-bg-' + l">
            <pre class="m-0">{{'uk-bg-' + l}}</pre>
            <pre class="m-0">{{'uk-text-' + l}}</pre>
            <pre class="m-0">{{'uk-border-' + l}}</pre>
          </li>
        </ul>
      </div>
      <div class="col-md-4 mb-3">
        <h4>UK background color pallet</h4>
        <ul class="list-group border-0">
          <li class="list-group-item border-0 uk-color-swatch p-1" v-for="(l, j) in backgroundColors" v-bind:key="j" v-bind:class="'uk-bg-' + l">
            <pre>{{'uk-bg-' + l}}</pre>
          </li>
        </ul>
      </div>
      <div class="col-md-4 mb-3">
        <h4>UK forceground (text) color pallet</h4>
        <ul class="list-group">
          <li class="list-group-item uk-border-teal uk-color-swatch p-1" v-for="(l, j) in textColors" v-bind:key="j" v-bind:class="'uk-text-' + l">
            <pre v-bind:class="'uk-text-' + l">{{'uk-text-' + l}}</pre>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>