<template>
<div class="cdls24test">
    <h3>{{title | i18n}}</h3>
    <nts-text-editor v-model="data.selectedCode" name='selected code'/>
    <nts-text-editor v-model="selectedName" name='selected name' :disabled="true"/>
    <button v-click:500="openCdls24" class="btn btn-secondary btn-block">open cdls24</button>
</div>
</template>