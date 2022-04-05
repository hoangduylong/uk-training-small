<template>
<div class="documentscontrolscheckbox">
    <h5>1. {{'sample' | i18n}}</h5>

    <div class="form-group row">
        <div class="col-md-2">
            <v-label v-bind:constraint="{}">{{ 'checked1s' | i18n }}</v-label>
        </div>
        <div class="col-md-10">
            <nts-checkbox v-model="checked1s" v-bind:value="1">Check 1</nts-checkbox>
            <nts-checkbox v-model="checked1s" v-bind:value="2">Check 2</nts-checkbox>
            <nts-checkbox v-model="checked1s" v-bind:value="3">Check 3</nts-checkbox>
            <nts-checkbox v-model="checked1s" v-bind:value="4">Check 4</nts-checkbox>
            Selecteds: {{checked1s}}
        </div>
    </div>

    <div class="form-group row">
        <div class="col-md-2">
            <v-label v-bind:constraint="{}">{{ 'checked2s' | i18n }}</v-label>
        </div>
        <div class="col-md-8">
            <nts-checkbox v-for="(option, k) in datasource" 
                v-model="checked2s" 
                v-bind:value="option.id" v-bind:key="k" class="form-check-inline">
                    {{option.name}}
            </nts-checkbox>
            Selecteds: {{checked2s}}
        </div>
    </div>

    <markdown />
</div>
</template>
