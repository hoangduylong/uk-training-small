<template>
  <div class="kafs20a1">
    <!-- A1_2 -->
    <label class="title">{{ "KAFS20_13" | i18n }}</label>
    <!-- A1_3 -->
    <div class="field-set">
      <div
        class="row text-center pl-2 py-2"
        v-for="(item, index) in optionalItemAppSets"
        v-bind:key="index"
      >
        <button
          type="button"
          class="btn btn-success btn-block btn-lg col-10 btn-wrap-text bg-blue-grey-50"
          v-on:click="nextToStep2(item)"
        >
          {{ item.name }}
        </button>
        <div class="col-2 text-center">
          <button
            type="button"
            class="btn btn-success btn-block btn-lg icon-button bg-blue-grey-100"
            v-on:click="showDescription(item)"
          >
            <fa-font icon="far fa-lightbulb" size="lg" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>