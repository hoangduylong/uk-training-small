<template>
  <div class="documentscontrolstext-area">
    <h5>1. {{'sample' | i18n}}</h5>

    <nts-text-area
        v-model="text"
        name='Textarea Item'/>

    <markdown/>
  </div>
</template>