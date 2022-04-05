<template>
  <div class="documentspluginsmodal">
    <h5>1. {{'sample' | i18n}}</h5>
    <div class="mb-2">
      <h6>{{ 'modal' | i18n }}({{ 'message' | i18n }})</h6>
      <button class="btn btn-info mr-2" v-click="showModal.bind(this, 'modal')"> Show modal</button> 
      <button class="btn btn-secondary" v-click="showModal.bind(this, 'dropback')"> Show dropback</button> 
      
    </div>

    <br>

    <h6>{{ 'notification' | i18n }}</h6>
    <div class="btn-group mb-2">
      <button class="btn btn-warning" v-click="showWarn">{{'show_warn' | i18n}}</button>
      <button class="btn btn-info" v-click="showInfo">{{'show_info' | i18n}}</button>
      <button class="btn btn-danger" v-click="showError">{{'show_error' | i18n}}</button>
      <button class="btn btn-secondary" v-click="showConfirm">{{'show_confim' | i18n}}</button>
    </div>
    <br><br>

    <markdown/>
  </div>
</template>