<template>
  <div id="contract-confirm" class="min-vh-100 mb-3">
    <div
      class="text-center page-title uk-bg-olive"
      style="margin: -1rem; font-size: 1.5rem; line-height: 2.5;"
    >{{'CCGS07_50' | i18n}}</div>
    <div class="text-left page-info uk-text-dark-gray mt-2i">
      <!-- A2_1 -->
      <div>{{ 'CCGS07_51' | i18n }}</div>
    </div>
    <fieldset class="login-form mt-3">
      <!-- A3_2 -->
      <nts-text-editor
        id="contractCode"
        name="CCGS07_52"
        v-bind:tabindex="1"
        v-model="model.contractCode"
        v-bind:show-title="true"
        v-bind:columns="{ title: 'col-lg-4', input: 'col-lg-8' }"
        v-bind:constraint="validations.model.contractCode"
      />
      <!-- A4_2 -->
      <nts-input-password
        id="password"
        name="CCGS07_53"
        v-bind:tabindex="2"
        v-model="model.password"
        v-bind:show-title="true"
        v-bind:columns="{ title: 'col-lg-4', input: 'col-lg-8' }"
        v-bind:constraint="validations.model.password"
      />
      <div id="bottom-label" class="text-left page-info mt-3 uk-text-dark-gray">
        <!-- A5_1 -->
        <div id="bottom-label">{{ 'CCGS07_54' | i18n }}</div>
      </div>
      <div class="m-t-10">
        <!-- A10_1 -->
        <button
          v-bind:tabindex="3"
          class="btn btn-primary btn-block"
          v-click:500="authContract"
        >{{'CCGS07_55' | i18n}}</button>
      </div>
    </fieldset>
  </div>
</template>