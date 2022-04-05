<template>
  <div>
    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
          <i class="fas fa-angle-left mr-1" v-on:click="$close"></i>
          <span>{{ "KDPS01_6" | i18n }}</span>
        </h4>
      </div>
    </div>
    <div style="text-align: center;">
      <div
        v-bind:style="{
          color: getTextColor(screenData.date)
        }"
        >{{ screenData.date | date("YYYY/MM/DD（ddd）") }}</div
      >
      <div
        class="stamp-time font-weight-bold"
        style="line-height: 2.5rem;"
        >{{ screenData.date | date("HH:mm") }}</div
      >
    </div>
    <div style="text-align: center;" >
      <div class="d-inline-block"></div>
      <label
        class="stamp-text font-weight-bold"
        style="line-height: 3rem; color:#0033cc;"
        >{{ screenData.stampAtr }}</label
      >
    </div>
    <div class="col-12 value" style="padding-top: 20px; text-align: left;">
      <label>{{ screenData.employeeCode }} {{ screenData.employeeName }}</label>
    </div>

    <div class="col-12 value">
      <label>{{ screenData.localtion }}</label>
    </div>
    <!-- header -->
    <div class="card-header mb-2 py-0" style="line-height: 2rem;">
      {{ "KDPS01_43" | i18n }}
    </div>

    <div v-if="screenData.workTypeName" class="value">
      <label class="col-12">{{ screenData.workTypeName }}</label>
    </div>

    <div v-if="screenData.workTimeName" class="value">
      <label class="col-12">{{ screenData.workTimeName }}</label>
    </div>

    <div class=" value">
      <div class="col-12" style="text-align: center;">
        <label class="col-12 px-0">
        {{screenData.attendanceItem.attendance}}
        </label>
      </div>
      <hr class="uk-bg-white-smoke mb-2 mt-0" />
    </div>

    <div
      class="value"
      v-for="item in screenData.attendanceItem.timeItems"
      v-bind:key="item.itemId"
    >
      <div class="col-12 ">
        <label class="px-0 col-6">{{ item.title }}</label>
        <label class="col-6 px-0">{{ item.value }}</label>
      </div>
    </div>

    <div class="col-12 value mt-3">
      <label v-show="isHasImplementation === 1">{{ "KDPS01_48" | i18n }}</label>
      <label v-show="isHasImplementation === 2">{{ "KDPS01_49" | i18n }}</label>
    </div>
    <div>
      <button
        v-bind:disabled="isHasImplementation === 2"
        v-show="isHasImplementation !== 0"
        type="button"
        v-click:500="regDailyResult"
        class="mb-3 col-12 btn btn-success btn-block btn-lg"
      >
        {{ "KDPS01_50" | i18n }}
      </button>
    </div>
    <button
      v-focus
      type="button"
      v-on:click="$close"
      class="col-12 btn btn-secondary btn-block"
    >
      {{ "KDPS01_51" | i18n }}
    </button>
  </div>
</template>
