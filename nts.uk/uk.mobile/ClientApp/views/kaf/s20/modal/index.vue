<template>
  <div class="modal-show dropback modal-sm">
    <div class="modal-header">
    </div>
    <div class="modal-body col-md">
      <span class="name">{{ params.name }}</span>
      <span class="note">{{ params.note }}</span>
    </div>
    <div class="modal-footer" v-on:click="closeModal()">
      <span>{{ "KAFS20_14" | i18n }}</span>
    </div>
  </div>
</template>