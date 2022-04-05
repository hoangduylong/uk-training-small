<template>
    <div class="documentshtmlsstepwizard">
        <h5>1. {{'sample' | i18n}}</h5>
        <step-wizard v-bind:items="['step_1', 'step_2', 'step_3', 'step_4']" v-bind:selected="step" />
        <div class="mt-3 mb-3">
            <div v-if="step == 'step_1'"><h2>{{'step_1_content' | i18n}}</h2></div>
            <div v-if="step == 'step_2'"><h2>{{'step_2_content' | i18n}}</h2></div>
            <div v-if="step == 'step_3'"><h2>{{'step_3_content' | i18n}}</h2></div>
            <div v-if="step == 'step_4'"><h2>{{'step_4_content' | i18n}}</h2></div>
        </div>
        <div class="text-center mt-4 mb-4">
            <button class="btn btn-primary btn-block btn-lg" v-show="step == 'step_1'" v-on:click="nextStep">{{'forward_in_1' | i18n}}</button>
            <button class="btn btn-primary btn-block btn-lg" v-show="step == 'step_2'" v-on:click="nextStep">{{'forward_in_2' | i18n}}</button>
            <button class="btn btn-primary btn-block btn-lg" v-show="step == 'step_3'" v-on:click="nextStep">{{'forward_in_3' | i18n}}</button>
            <button class="btn btn-primary btn-block btn-lg" v-show="step == 'step_4'" v-on:click="nextStep">{{'forward_in_4' | i18n}}</button>

            <button class="btn btn-secondary btn-block mr-2" v-show="step == 'step_2'" v-on:click="prevStep">{{'back_in_2' | i18n}}</button>
            <button class="btn btn-secondary btn-block mr-2" v-show="step == 'step_3'" v-on:click="prevStep">{{'back_in_3' | i18n}}</button>
            <button class="btn btn-secondary btn-block mr-2" v-show="step == 'step_4'" v-on:click="prevStep">{{'back_in_4' | i18n}}</button>
        </div>
        <markdown />
    </div>
</template>