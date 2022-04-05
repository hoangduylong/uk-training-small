<template>
<div class="kdws03f p-0">
    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal py-2">
          <h4 class="col-4 modal-title text-white" v-on:click="$close">
              <i class="fas fa-angle-left mr-1"></i>
              <span>{{ 'KDWS03_75' | i18n }}</span>
          </h4>
      </div>
    </div>
    <div class="row uk-text-quote py-2 mx-0 uk-bg-white-smoke">
      <!-- F1_2: 対象社員名 -->
      <div class="col-6 pr-2"><span>{{ empName }}</span></div>
      <!-- F1_3: 対象年月 -->
      <div class="col-6 pl-0 pr-3 text-right"><span>{{ date  | yearmonth('YYYY年MM月')}}</span></div>
    </div>

    <!-- F2_1: 月別実績一覧 -->
    <table class="table table-bordered pt-0 mb-0">
    <tbody>
      <tr v-for="month in monthData" v-bind:key="month.id" :value="month">
        <!-- F2_2: 勤怠項目名 -->
        <td class="pl-2 pr-0 uk-bg-green">{{ month.name}}</td>
        <!-- F2_3: 勤怠項目の値 -->
        <td class="text-right pr-3">{{ month.value}}</td>
      </tr>
    </tbody>
  </table>
  <!-- F3_2: 実績無メッセージ -->
  <div v-if="dataRes" class="p-3">{{ 'KDWS03_74' | i18n }}</div>
</div>
</template>