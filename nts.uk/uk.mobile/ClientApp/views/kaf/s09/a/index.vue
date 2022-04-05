<template>
  <div class="kafs09a">
    <div>
      <kafs00-a v-if="kaf000_A_Params != null" v-bind:params="kaf000_A_Params" />
    </div>
    <div v-if="!$valid || !isValidateAll" class="card bg-danger top-alert uk-text-danger topError">
              <button class="btn btn-link uk-text-danger">
                <i class="fa fa-exclamation-circle" aria-hidden="true" ></i>
                {{ 'KAFS07_1' | i18n }}
              </button>
    </div>
    <div>
      <kafs00-b v-if="kaf000_B_Params != null" v-bind:params="kaf000_B_Params" 
      v-on:kaf000BChangeDate="kaf000BChangeDate"
      v-on:kaf000BChangePrePost="kaf000BChangePrePost"
      v-on:kafs00BValid="kafs00BValid"/>
    </div>
    <div v-if="C1" class="card card-label">
      <div class="card-header uk-bg-accordion">
        <span>{{'KAFS09_22' | i18n}}</span>
        <span class="badge badge-warning">必須</span>
      </div>
      <div class="card-body">
        <nts-switchbox v-model="model.changeWork" v-bind:value="1">{{'KAFS09_23' | i18n}}</nts-switchbox>
        <nts-switchbox v-model="model.changeWork" v-bind:value="2">{{'KAFS09_24' | i18n}}</nts-switchbox>
      </div>
    </div>
    <div v-if="C2 && c3" class="card card-label">
      <!-- A4 -->
      <div class="card-header uk-bg-accordion">
        <span>{{'KAFS09_3' | i18n}}</span>
        <span class="badge badge-warning">必須</span>
      </div>
      <div class="card-body">
        <!-- A4_1 -->
        <span class="textSize uk-text-dark-gray">{{'KAFS09_4' | i18n}}</span>
        <button type="button" class="btn btn-selection mt-2 mb-2" v-on:click="openKDL002('worktype')">
          <!-- A4_2_1 -->
          <span class="badge badge-secondary">{{model.workType.code}}</span>
          <span>{{model.workType.name}}</span>
        </button>

        <!-- A4_3 -->
        <span class="textSize uk-text-dark-gray">{{'KAFS09_5' | i18n}}</span>
        <button
          type="button"
          v-bind:enable="isCondition3"
          class="btn btn-selection mt-2 mb-2"
          v-on:click="openKDL002('worktime')"
        >
          <!-- A4_3_1 -->
          <span class="badge badge-secondary">{{model.workTime.code}}</span>
          <span>{{model.workTime.name}}</span>
          <!-- A4_3_2 -->
          <span class="d-block mt-1">{{model.workTime.time}}</span>
        </button>
      </div>
    </div>

    <div class="card card-label">
      <!-- A5_1 -->
      <div class="card-header uk-bg-accordion">
        <span>{{'KAFS09_8' | i18n}}</span>
        <span class="badge badge-warning">必須</span>
      </div>
      <div class="card-body">
        <nts-switchbox v-model="model.straight" v-bind:value="1">{{'KAFS09_6' | i18n}}</nts-switchbox>
        <nts-switchbox v-model="model.straight" v-bind:value="2">{{'KAFS09_7' | i18n}}</nts-switchbox>
      </div>
      <div class="card-body">
        <nts-switchbox v-model="model.bounce" v-bind:value="1">{{'KAFS09_9' | i18n}}</nts-switchbox>
        <nts-switchbox v-model="model.bounce" v-bind:value="2">{{'KAFS09_10' | i18n}}</nts-switchbox>
      </div>
      <span v-if="model.straight == 2 && model.bounce == 2" class="textSize errorMSg uk-text-non-working-day">{{'Msg_1878' | i18n}}</span>
    </div>
   
    <div>
      <kafs00-c v-if="kaf000_C_Params != null" v-bind:params="kaf000_C_Params" 
      v-on:kaf000CChangeReasonCD="kaf000CChangeReasonCD"
      v-on:kaf000CChangeAppReason="kaf000CChangeAppReason"
      v-on:kafs00CValid="kafs00CValid"/>
    </div>
    <!-- display text by  ※1-->
    <!-- 画面モード = 新規モード -->
    <div class="btnRegister">
      <button
        v-if="mode"
        type="button"
        class="btn btn-primary btn-block"
        v-on:click="register()"
      >{{'KAFS09_11' | i18n}}</button>
      <!-- 画面モード = 編集モード -->
      <button
        v-else
        type="button"
        class="btn btn-primary btn-block"
        v-on:click="register()"
      >{{'KAFS09_2' | i18n}}</button>
    </div>



  </div>
</template>