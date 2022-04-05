<template>
  <div>
    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
          <i class="fas fa-angle-left mr-1" v-on:click="$close" v-show="!isEmotionMode"></i>
          <span>{{ "KDPS01_5" | i18n }}</span>
        </h4>
      </div>
    </div>
     <div style="text-align: center;" >
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
      <div>
        <div class="d-inline-block" ></div>
        <label
          class="stamp-text font-weight-bold"
          style="line-height: 3rem; color:#0033cc;"
          >{{ screenData.stampAtr }}</label
        >
        </div>
      <div class="col-12 value" style="padding-top: 20px; padding-bottom: 40px; text-align: left;">
      <label>{{ screenData.employeeCode }} {{ screenData.employeeName }}</label>
      <div>{{ screenData.localtion }}</div>
    </div>

     <label v-show="isEmotionMode" class="font-weight-bold col-13 value"> {{ "KDPS01_67" | i18n }}</label>

    <div v-show="isEmotionMode" class="col-12 value" style="padding-bottom: 40px; padding-right: 5px !important; padding-left: 5px !important;">
      <img tabindex="2" v-bind:src="'/nts.uk.mobile.web/dist/resources/185.png'" v-on:click="clickEmoji(4)" height="50" width="50"/>
      <img class="mar-5" tabindex="3" v-bind:src="'/nts.uk.mobile.web/dist/resources/186.png'" v-on:click="clickEmoji(3)" height="50" width="50"/> 
      <img tabindex="4" v-bind:src="'/nts.uk.mobile.web/dist/resources/187.png'" v-on:click="clickEmoji(2)" height="50" width="50"/> 
      <img class="mar-5" tabindex="5" v-bind:src="'/nts.uk.mobile.web/dist/resources/188.png'" v-on:click="clickEmoji(1)" height="50" width="50"/> 
      <img tabindex="6" v-bind:src="'/nts.uk.mobile.web/dist/resources/189.png'" v-on:click="clickEmoji(0)" height="50" width="50"/> 
    </div>

    <div class="col-12 value" v-if="params.resultDisplayTime > 0" v-show="!isEmotionMode">
      <label class="cd-time font-weight-bold mr-2">{{
        params.resultDisplayTime
      }}</label>
      <label class="font-weight-bold">{{ "KDPS01_36" | i18n }}</label>
    </div>
    <div>
      <button
        v-show="!isEmotionMode" 
        tabindex="1"
        v-focus
        type="button"
        v-on:click="$close"
        class="btn-block mt-3 btn btn-secondary"
       
      >
        {{ "KDPS01_37" | i18n }}
      </button>
    </div>
    </div>
    
  </div>
</template>
