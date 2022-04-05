<template>
  <div class="documentscontrolsinput-date">
    <h5>1. {{'sample' | i18n}}</h5>
    <label>
      <i>
        Note: Using <b>Smartphone</b> to see this sample
      </i>
    </label>
    <nts-date-input v-model="date" name='Date Item'/>
    <button class="btn btn-primary btn-block" v-on:click="validate">Validate</button>
    <markdown/>
  </div>
</template>