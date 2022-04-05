<template>
<div class="cdls04test">
    <h3>{{title | i18n}}</h3>
    <nts-checkbox v-model="data.isShowNoSelectRow" v-bind:value="1">Show Unselect Row</nts-checkbox>
    <nts-date-input  v-model="data.date" name='BaseDate'/>
    <nts-text-editor v-model="data.selectedCode" name='selected code'/>
    <button v-click:500="openCdlS04A" class="btn btn-secondary btn-block">open cdls04</button>
    <div>JobTitleID: </div>{{result.id}}
    <div>JobTitleCode: </div>{{result.code}}
    <div>JobTitleName: </div>{{result.name}}
</div>
</template>