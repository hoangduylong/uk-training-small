<template>
  <div class="card mb-5 border-light-blue-900">
    <ul class="nav nav-tabs card-header border-light-blue-900 bg-light-blue-800">
      <li class="nav-item" v-for="(m, k) in ['background', 'text']" v-bind:key="k">
        <a class="nav-link border-light-blue-900 text-grey-50" :href="'#' + m" :class="{ 'active': !k }">{{m}}</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="tab-pane" v-for="(m, k) in ['background', 'text']" v-bind:id="m" v-bind:key="k">
        <template v-if="m === 'background'">
          <div class="row">
            <div
              class="col-md-3 col-sm-4 col-6"
              v-for="(c, i) in colorNames"
              v-bind:key="i"
            >
              <div class="swatch-title" v-bind:class="'bg-' + c">
                <h3>{{c}}</h3>
              </div>
              <div
                class="color-swatch"
                v-for="(l, j) in gradents"
                v-bind:key="j"
                v-bind:class="'bg-' + c + '-' + l"
              >
              <pre class="m-0">{{'bg-' + c + '-' + l}}</pre>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div
              class="col-md-3 col-sm-4 col-6"
              v-for="(c,x) in colorNames"
              v-bind:key="x"
            >
              <div class="swatch-title text-swatch mb-0 border" v-bind:class="'text-' + c + ' border-' + c">
                <h3>{{c}}</h3>
              </div>
              <div
                class="color-swatch text-swatch"
                v-for="(l,z) in gradents"
                v-bind:key="z"
                v-bind:class="'border border-top-0 border-' + c + '-' + l"
              >
              <pre class="m-0" v-bind:class="'text-' + c + '-' + l">{{'text-' + c + '-' + l}}</pre>
              <pre class="m-0" v-bind:class="'text-' + c + '-' + l">{{'border-' + c + '-' + l}}</pre>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>