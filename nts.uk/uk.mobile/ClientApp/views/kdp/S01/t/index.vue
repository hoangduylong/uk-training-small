<template>
  <div cl>
    <label class="mb-3"
      >{{ "KDPS01_66" | i18n }}
      {{ setting.errorDate | date("YYYY/MM/DD（ddd）") }}
    </label>

    <label
      v-bind:style="{
        color: setting.error.messageColor
      }"
      class="mb-3"
      >{{ setting.error.messageContent }}
    </label>

    <button
      v-for="button in setting.buttons"
      v-bind:key="button.type"
      ref="functionBtns"
      type="button"
      class=" mb-2 btn btn-success btn-block btn-lg"
      v-click:500="() => goto(button)"
    >
      {{ button.dispName | i18n }}
    </button>

    <button
      ref="functionBtn"
      type="button"
      v-on:click="$close"
      class="btn btn-secondary btn-block mt-2"
    >
      {{ "KDPS01_65" | i18n }}
    </button>
  </div>
</template>
