<template>
<div class="documentscontrolsradio">
    <h5>1. {{'sample' | i18n}}</h5>
    <div class="form-group row">
        <!--title-->
        <div class="col-md-4">
            <v-label>{{ 'Radio without foreach' | i18n }}</v-label>
        </div>
        <!--radio-->
        <div class="col-md-8">
            <nts-radio v-model="checked1" value="1">Radio 1</nts-radio>
            <nts-radio v-model="checked1" value="2" v-bind:disabled="true">Radio 2</nts-radio>
            <nts-radio v-model="checked1" value="3">Radio 3</nts-radio>
            <nts-radio v-model="checked1" value="4">Radio 4</nts-radio>
            <pre>Value selected: {{checked1}}</pre>
        </div>
    </div>

    <div class="form-group row">
        <!--title-->
        <div class="col-md-4">
            <v-label>{{ 'Radio with foreach' | i18n }}</v-label>
        </div>
        <!--radio-->
        <div class="col-md-8">

            <nts-radio v-for="(radio, k) in radios"
                v-model="checked2"
                v-bind:value="radio.id" v-bind:key="k" class="form-check-inline">
                {{radio.name}}
            </nts-radio>
            <pre>Value selected: {{checked2}}</pre>
        </div>
    </div>

    <markdown/>
</div>
</template>
