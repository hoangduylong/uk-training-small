<template>
<div class="cmms45test">
    <h3>AppID</h3>
    <nts-text-editor v-model="text"/>
    <button v-on:click="gotoCMMS45C">To CMMS45C: update</button>
    <button v-on:click="gotoCMMS45D">To CMMS45D: approval</button>
</div>
</template>