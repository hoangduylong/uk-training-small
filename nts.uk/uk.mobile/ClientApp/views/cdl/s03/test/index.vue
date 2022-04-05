<template>
<div class="cdls03test">
    <h3>{{title | i18n}}</h3>
    <nts-checkbox v-model="data.isShowNoSelectRow" v-bind:value="1">Show Unselect Row</nts-checkbox>
    <nts-text-editor v-model="data.selectedCode" name='selected code'/>
    <nts-text-editor v-model="data.selectedName" name='selected name' v-bind:disabled="true"/>
    <button v-click:500="openCdlS03A" class="btn btn-secondary btn-block">open cdls03</button>
</div>
</template>