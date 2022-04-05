<template>
<div class="kafsamplesingle">
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
                    v-on:kaf000BChangePrePost="kaf000BChangePrePost"/>
    </div>
    <div class="card card-label">
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n3">
                {{'KAFS00_9' | i18n}}</v-label>
            <span class="badge badge-warning" style="height: 30%">必須</span>
        </div>
        <div class="card-body">
            <nts-text-editor v-model="text1" />
        </div>
    </div>
    <div>
      <kafs00-c v-if="kaf000_C_Params != null" v-bind:params="kaf000_C_Params" 
      v-on:kaf000CChangeReasonCD="kaf000CChangeReasonCD"
      v-on:kaf000CChangeAppReason="kaf000CChangeAppReason" />
    </div>
    <div class="text-center mt-4 mb-4">
        <button class="btn btn-primary btn-block btn-lg" 
                v-on:click="register">{{'forward_in_1' | i18n}}</button>
    </div>
</div>
</template>