<template>
<div class="documentscontrolsswitchbox">
    <h5>1. {{'sample' | i18n}}</h5>

    <div>
        <nts-label v-bind:constraint="{}">{{ 'switch_button' | i18n }}</nts-label>
        <div>
            <nts-switchbox v-model="switchbox1" v-bind:value="1"> Value 1</nts-switchbox>
            <nts-switchbox v-model="switchbox1" v-bind:value="2"> Value 2</nts-switchbox>
            <nts-switchbox v-model="switchbox1" v-bind:value="3"> Value 3</nts-switchbox>
            <nts-switchbox v-model="switchbox1" v-bind:value="4"> Value 4</nts-switchbox>
        </div>
        Selected code: {{switchbox1}}
    </div>
    

    <div>
        <nts-label v-bind:constraint="{}">{{ 'switch_button' | i18n }}</nts-label>
        <div>
            <nts-switchbox v-for="(option, k) in datasource" 
                v-bind:key="k"
                v-model="switchbox2" 
                v-bind:value="option.id">{{option.name}}</nts-switchbox>
        </div>
        Selected code: {{switchbox2}}
    </div>
    
    <markdown />
</div>
</template>
