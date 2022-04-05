<template>
<div class="documentscontrolstext-search-box">
    <h5>1. {{'sample' | i18n}}</h5>

    <p><b>{{ 'manual-search' | i18n }}</b></p>
    <nts-text-search placeholder="勤務種類コード/勤務種類名称" v-on:search="searchList"/>
    <p>Value: {{manualText}}</p>
    
    
    <p><b>{{ 'auto-search' | i18n }}</b></p>
    <nts-text-search v-model="autoText" placeholder="勤務種類コード/勤務種類名称"/>
    <p>Value: {{autoText}}</p>    
    
    <br/>
    <markdown />
    
</div>
</template>