<template>
  <div class="documentsdirectivesclick">
    <h5>1. {{'sample' | i18n}}</h5>
    <button class="btn btn-primary mb-2" v-click:500="multiClick">{{ 'prevent_multi_click' | i18n }}</button>
    <pre class="mb-3">{{ results }}</pre>
    <markdown/>
  </div>
</template>