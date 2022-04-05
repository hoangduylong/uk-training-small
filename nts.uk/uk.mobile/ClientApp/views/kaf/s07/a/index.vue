<template>
  <div class="kafs07a">
    <div>
      <kafs00-a v-if="kaf000_A_Params != null" v-bind:params="kaf000_A_Params" />
    </div>
<!-- 
    <div v-if="!$valid || !isValidateAll" class="alert error">
      <img
        class="iconWarn"
        src="https://www.iconsdb.com/icons/preview/red/warning-xxl.png"
        width="16"
        height="16"
      />
      <div class="contentError">{{'KAFS07_1'| i18n}}</div>
    </div> -->

    <div v-if="!$valid || !isValidateAll" class="card bg-danger top-alert uk-text-danger topError">
              <button class="btn btn-link uk-text-danger">
                <i class="fa fa-exclamation-circle" aria-hidden="true" ></i>
                {{ 'KAFS07_1' | i18n }}
              </button>
    </div>
    <div>
      <kafs00-b v-if="kaf000_B_Params != null" v-bind:params="kaf000_B_Params" 
      v-on:kaf000BChangeDate="kaf000BChangeDate"
      v-on:kaf000BChangePrePost="kaf000BChangePrePost"/>
    </div>

    <div class="card card-label">
      <!-- A4_1 -->
      <div class="card-header uk-bg-accordion">
        <span>{{'KAFS07_2' | i18n}}</span>
        <span class="badge badge-warning">必須</span>
      </div>
      <div class="card-body">
        <!-- A4_2 -->
        <span class="textSize uk-text-dark-gray">{{'KAFS07_3' | i18n}}</span>
        <button type="button" class="btn btn-selection mt-2 mb-2" v-on:click="openKDL002('worktype')">
          <!-- A4_2_1 -->
          <span class="badge badge-secondary">{{model.workType.code}}</span>
          <span>{{model.workType.name}}</span>
        </button>

        <!-- A4_3 -->
        <span class="textSize uk-text-dark-gray">{{'KAFS07_4' | i18n}}</span>
        <button
          type="button"
          v-bind:disabled="!isCondition3"
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
        <span>{{'KAFS07_5' | i18n}}</span>
        <span class="badge badge-warning">必須</span>
      </div>
      <div class="card-body">
        <nts-switchbox v-model="model.straight" v-bind:value="1">{{'KAFS07_11' | i18n}}</nts-switchbox>
        <nts-switchbox v-model="model.straight" v-bind:value="2">{{'KAFS07_12' | i18n}}</nts-switchbox>
      </div>
      <div class="card-body">
        <nts-switchbox v-model="model.bounce" v-bind:value="1">{{'KAFS07_13' | i18n}}</nts-switchbox>
        <nts-switchbox v-model="model.bounce" v-bind:value="2">{{'KAFS07_14' | i18n}}</nts-switchbox>
      </div>
    </div>

    <div class="card card-label">
      <!-- A6_1 -->
      <div v-if="isCondition1" class="card-header uk-bg-accordion">
        <span>{{'KAFS07_6' | i18n}}</span>
        <span class="badge badge-warning">必須</span>
      </div>
      <div v-if="isCondition1" class="card-body">
        <nts-time-range-input v-if="isCondition3" v-model="valueWorkHours1" />
        <nts-time-range-input v-else disabled v-model="valueWorkHours1" />
      </div>
    </div>

    <div class="card card-label">
      <!-- A7_1 -->
      <div v-if="isCondition2" class="card-header uk-bg-accordion">
        <span>{{'KAFS07_7' | i18n}}</span>
        <span class="badge badge-info">任意</span>
      </div>
      <!-- A7_2 -->
      <div v-if="isCondition2" class="card-body">
        <nts-time-range-input v-if="isCondition3" v-model="valueWorkHours2" />
        <nts-time-range-input v-else disabled v-model="valueWorkHours2" />
      </div>
    </div>
    <div>
      <kafs00-c v-if="kaf000_C_Params != null" v-bind:params="kaf000_C_Params" 
      v-on:kaf000CChangeReasonCD="kaf000CChangeReasonCD"
      v-on:kaf000CChangeAppReason="kaf000CChangeAppReason" />
    </div>
    <!-- display text by  ※1-->
    <!-- 画面モード = 新規モード -->
    <div class="btnRegister">
      <button
        v-if="mode"
        type="button"
        class="btn btn-primary btn-block"
        v-on:click="register()"
      >{{'KAFS07_8' | i18n}}</button>
      <!-- 画面モード = 編集モード -->
      <button
        v-else
        type="button"
        class="btn btn-primary btn-block"
        v-on:click="register()"
      >{{'KAFS07_16' | i18n}}</button>
    </div>
  </div>
</template>