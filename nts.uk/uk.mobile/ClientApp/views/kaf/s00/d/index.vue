<template>
<div class="kafs00d">
  <div class="row mb-2">
    <div class="col-12">
      <span v-if="params.mode == ScreenMode.NEW">{{ 'KAFS00_19' | i18n }}</span>
      <span v-if="params.mode == ScreenMode.DETAIL">{{ 'KAFS00_27' | i18n }}</span>
    </div>
  </div>
  <div class="row mt-2 mb-2">
    <div class="col-12">
      <button v-if="params.mode == ScreenMode.NEW" type="button" class="btn btn-primary w-100" v-on:click="goToDetail">
        {{ 'KAFS00_20' | i18n }}
      </button>
      <button v-if="params.mode == ScreenMode.DETAIL" type="button" class="btn btn-primary w-100" v-on:click="goToDetail">
        {{ 'KAFS00_28' | i18n }}
      </button>
    </div>
  </div>
  <div class="row mt-2 mb-2">
    <div class="col-12">
      <button type="button" class="btn btn-secondary w-100" v-on:click="goToAppLst">{{ 'KAFS00_21' | i18n }}</button>
    </div>
  </div>   
</div>
</template>