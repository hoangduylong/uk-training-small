<template>
<div class="kdws03e pt-0">
    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal py-2">
          <h4 class="col-4 modal-title text-white" v-on:click="$close">
              <i class="fas fa-angle-left mr-1"></i>
              <span>{{ 'KDWS03_75' | i18n }}</span>
          </h4>
      </div>
    </div>
    <div class="row uk-text-quote py-2 pl-2 uk-bg-white-smoke">
      <!-- E1_2: 対象社員名 -->
      <div class="col-6 pl-0 pr-2"><span>{{ empName }}</span></div>
      <!-- E1_3: 対象年月日 -->
      <div class="col-5 pl-0 pr-0"><span>{{ params.date  | date('YYYY年MM月DD日')}}</span></div>
    </div>

    <!-- E2_1: エラー内容 -->
    <div class="pt-2">{{'KDWS03_43' | i18n}}</div>
    <div class="row pt-2">
        <!-- E3_1,2: Label コード－ -->
        <div class="col-4 p-0 pl-3">{{'KDWS03_42' | i18n}}</div>
        <div class="col-1 p-0">{{'KDWS03_46' | i18n}}</div>
        <!-- E3_3: コード -->
        <div class="col-7 p-0">{{errorInfo.code}}</div>
    </div>
    <div class="row pt-2">
        <!-- E4_1,2: Label エラー内容－ -->
        <div class="col-4 p-0 pl-3">{{'KDWS03_43' | i18n}}</div>
        <div class="col-1 p-0">{{'KDWS03_46' | i18n}}</div>
        <!-- E4_3: エラー内容 -->
        <div class="col-7 p-0">{{errorInfo.name}}</div>
    </div>
    <div class="row pt-2">
        <!-- E5_1,2: Label メーセージ－ -->
        <div class="col-4 p-0 pl-3">{{'KDWS03_44' | i18n}}</div>
        <div class="col-1 p-0">{{'KDWS03_46' | i18n}}</div>
        <!-- E5_3: メーセージ -->
        <div class="col-7 p-0">{{errorInfo.errMsg}}</div>
    </div>
    <!-- E7_1: 修正ボタン -->
    <div class="fixed-bottom border-0" v-if="displayE71">
      <button class = 'btn uk-bg-process btn-block rounded-0' v-on:click="editData">{{'KDWS03_72' | i18n}}</button>
    </div>
</div>
</template>