<template>
    <div id="kafs12-a2">
        <div v-for="data in applyTimeData"
             v-bind:key="data.appTimeType">
            <kafs12-apply-time v-bind:params="data"
                               v-bind:specialLeaveFrame="specialLeaveFrame"
                               v-bind:calculatedData="$appContext.calculatedData"
                               v-bind:appDispInfoStartupOutput="appDispInfoStartupOutput"
                               v-bind:reflectSetting="reflectSetting"
                               v-bind:timeLeaveManagement="timeLeaveManagement"
                               v-bind:timeLeaveRemaining="timeLeaveRemaining"
                               v-on:changeSpecialLeaveFrame="handleChangeSpecialLeaveFrame"/>
        </div>
        <kafs00c
                v-if="$appContext.kaf000_C_Params != null"
                v-bind:params="$appContext.kaf000_C_Params"
                @kaf000CChangeReasonCD="$appContext.kaf000CChangeReasonCD"
                @kaf000CChangeAppReason="$appContext.kaf000CChangeAppReason">
        </kafs00c>
        <!-- A_B8_1 -->
        <button type="button"
                class="btn btn-primary btn-block text-center"
                v-on:click="nextToStep3()"
                v-if="newMode">{{ "KAFS12_31" | i18n }}</button>
        <button type="button"
                class="btn btn-primary btn-block text-center"
                v-on:click="nextToStep3()"
                v-if="!newMode">{{ "KAFS12_32" | i18n }}</button>
        <button type="button"
                class="btn btn-secondary btn-lg btn-block mb-3"
                @click="backToStepOne()">{{'KAFS12_48' | i18n}}</button>
    </div>
</template>