<template>
  <div class="documentshtmlsicons">
    <markdown />
    <div class="row justify-content-md-center">
      <div class="col-md-4">
        <nts-search-box v-model="keyword" v-focus/>
      </div>
      
    </div>
    <div class="row justify-content-center">
        <div class="col-md-4 mb-2">
            <i>{{ 'message11' | i18n }}</i>
        </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-md-2 mb-3">
        <nts-dropdown v-model="size" name="Size of icon:" v-bind:columns="{title: 'col-4', input: 'col-8'}">
          <option v-for="item in ['lg', 'sm', 'xs', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',]" :value="item" v-bind:key="item">
              {{item}}
          </option>
        </nts-dropdown>
      </div>
    </div>
    <div class="row">
      <div class="col-6 col-sm-4 col-md-3 col-lg-1 text-center uk-icons" v-for="(item, k) in filtereds" v-bind:key="k">
        <i v-bind:class="faClass(item)"></i>
        <p class="uk-icons-name m-0 p-0">{{item.code}}</p>
        <p class="uk-icons-name">{{item.class}}</p>
      </div>
    </div>
  </div>
</template>