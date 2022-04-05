<template>
<div class="kafsamplemultistep1">
    <div>
      <kafs00-a v-if="$appContext.kaf000_A_Params != null" v-bind:params="$appContext.kaf000_A_Params" />
    </div>
    <div v-if="!$appContext.$valid || !$appContext.isValidateAll" class="card bg-danger top-alert uk-text-danger topError">
              <button class="btn btn-link uk-text-danger">
                <i class="fa fa-exclamation-circle" aria-hidden="true" ></i>
                {{ 'KAFS07_1' | i18n }}
              </button>
    </div>
    <div>
        <kafs00-b v-if="$appContext.kaf000_B_Params != null" v-bind:params="$appContext.kaf000_B_Params" 
                    v-on:kaf000BChangeDate="$appContext.kaf000BChangeDate"
                    v-on:kaf000BChangePrePost="$appContext.kaf000BChangePrePost"/>
    </div>
    <div class="card card-label">
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n3">
                {{'KAFS00_9' | i18n}}</v-label>
            <span class="badge badge-warning" style="height: 30%">必須</span>
        </div>
        <div class="card-body">
            <nts-text-editor v-model="$appContext.text1" />
        </div>
    </div>
    <div>
      <kafs00-c v-if="$appContext.kaf000_C_Params != null" v-bind:params="$appContext.kaf000_C_Params" 
      v-on:kaf000CChangeReasonCD="$appContext.kaf000CChangeReasonCD"
      v-on:kaf000CChangeAppReason="$appContext.kaf000CChangeAppReason" />
    </div>
    <div class="text-center mt-4 mb-4">
        <button class="btn btn-primary btn-block btn-lg" 
                v-show="$appContext.step == 'step_1'" 
                v-on:click="$appContext.toStep(2)">{{'forward_in_1' | i18n}}</button>
    </div>
</div>
</template>