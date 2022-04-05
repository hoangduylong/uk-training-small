<template>
<div class="cmms45e">
    <!-- Header -->
    <div class="modal-header">
      <a v-on:click="callBack" class="uk-text-white">
        <i class="fas fa-arrow-circle-left"></i>
        {{ 'CMMS45_67' | i18n }}
      </a>
    </div>

    <div class="card card-label mb-2">
        <!-- E2_1 -->
        <div class="card-header uk-bg-dark-salmon">
            <span>{{'CMMS45_68' | i18n}}</span>
            <span class="badge badge-warning">必須</span>
        </div>
        <!-- E2_2 -->
        <div class="card-body mt-2 mb-n2">
            <nts-dropdown name="CMMS45_68" v-model="selectedValue" showTitle='false'>
                <option v-for="(appr, k) in apprList" :key ="k" :value="appr.id">
                    {{appr.content}}
                </option>
            </nts-dropdown>
        </div>
    </div>
    <div class="card card-label mb-2">
        <div class="card card-label mb-2">
            <!-- E2_3 -->
            <div class="card-header uk-bg-dark-salmon p-0 pl-3" >
                <v-label class="border-0 pl-0 mb-0 control-label-inline" 
                    v-bind:constraint="validations.reasonRemand" 
                    v-bind:margin-bottom="0">{{'CMMS45_69' | i18n}}</v-label>
                <span class="badge badge-warning position-absolute" style="top: 8px; right: 0;">必須</span>
            </div>
            <!-- E2_4 -->
            <div class="card-body mt-2 mb-n3">
                <nts-text-area
                    v-model="reasonRemand"
                    name='CMMS45_69'
                    showTitle='false'
                    />
            </div>
        </div>
    </div>
    <!-- E3_1 -->
    <div class="ml-4 mr-4">
    <button class=" btn btn-secondary btn-block" v-on:click="remand">
        <a><i class="fas fa-undo"></i>{{'CMMS45_70' | i18n}}</a>
    </button>
    </div>
</div>
</template>