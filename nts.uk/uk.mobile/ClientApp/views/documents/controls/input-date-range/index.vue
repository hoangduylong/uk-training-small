<template>
    <div class="documentscontrolsinput-date-range">
        <h5>1. {{'sample' | i18n}}</h5>
        <pre>{{dateRange}}</pre>
        <nts-date-range-input name="Date range" v-model="dateRange" />
        <button class="btn btn-primary btn-block mb-2" v-on:click="validate">Validate</button>
        <markdown />
    </div>
</template>