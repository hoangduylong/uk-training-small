<template>
<div class="documentscontrolssearch-box">
    <h5>1. {{'sample' | i18n}}</h5>
    <nts-time-range-search v-on:search="searchList" />

    <br/>

    <markdown />

</div>
</template>
