<template>
<div class="cdls02test">
    <h3>{{title | i18n}}</h3>
    <nts-checkbox v-model="data.isDisplayClosureSelection" v-bind:value="1">Display Closure Selection</nts-checkbox>
    <nts-checkbox v-model="data.isShowNoSelectRow" v-bind:value="1">Show Unselect Row</nts-checkbox>
    <nts-text-editor v-model="data.selectedCode" name='selected code'/>
    <nts-text-editor v-model="selectedName" :disabled="true" name='selected name'/>
    <button v-click:500="openCdls02" class="btn btn-secondary btn-block">open cdls02</button>
</div>
</template>