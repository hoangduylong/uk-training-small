<template>
    <div class="documentscontrolsinput-time-range">
        <h5>1. {{'sample' | i18n}}</h5>
        <button class="btn btn-secondary mb-2" v-on:click="validate">Validate All</button>

        <nts-time-range-input
            name="Time range 1"
            v-model="timeRangeValue1"
        />

        <hr/>

        <nts-time-range-input v-model="timeRangeValue2" v-bind:showTile="true" name="Time Range"/>

        <markdown/>
    </div>
</template>