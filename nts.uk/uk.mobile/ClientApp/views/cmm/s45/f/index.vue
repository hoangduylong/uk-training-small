<template>
  <div class="cmms45f">
    <div class="modal-header">
      <a class="uk-text-white" v-on:click="backToDetail()">
        <i class="fas fa-arrow-circle-left"></i>
        {{ 'CMMS45_75' | i18n }}
      </a>
    </div>
    <div class="row mb-2">
      <div class="col-12 text-center">
        <span v-if="params.action==1">{{ 'CMMS45_77' | i18n }}</span>
        <span v-if="params.action==2">{{ 'CMMS45_52' | i18n }}</span>
        <span v-if="params.action==3">{{ 'CMMS45_79' | i18n }}</span>
      </div>
    </div>
    <div class="row mt-2 mb-2">
      <div class="col-1"></div>
      <div class="col-10">
        <button type="button" class="btn btn-primary w-100" v-if="!isLastApp()" v-on:click="toNextApp">{{ 'CMMS45_74' | i18n }}</button>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row mt-2 mb-2">
      <div class="col-1"></div>
      <div class="col-10">
        <button type="button" class="btn btn-secondary w-100" v-on:click="backToMenu">{{ 'CMMS45_76' | i18n }}</button>
      </div>
      <div class="col-1"></div>
    </div>
  </div>
</template>