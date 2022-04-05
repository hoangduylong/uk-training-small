<template>
<span class="kafs00subp1">
    <span>
        <span v-if="params.preAppDisp" v-bind:class="getExcessTimeStatusClass(params.preAppExcess)">
            <span class="far fa-clock display-time child-font-size"></span>
            <span>{{'KAFS00_10' | i18n}}</span>
            <span>[</span>
            <span>{{ preAppTime || i18n }}</span>
            <span>]</span>
        </span>
        <span v-if="params.actualDisp" v-bind:class="getExcessTimeStatusClass(params.actualExcess)">
            <span class="far fa-clock display-time child-font-size"></span>
            <span>{{'KAFS00_26' | i18n}}</span>
            <span>[</span>
            <span>{{ actualTime || i18n }}</span>
            <span>]</span>    
            </span>
        <span v-if="params.scheduleDisp" v-bind:class="getExcessTimeStatusClass(params.scheduleExcess)">
            <span class="far fa-clock display-time child-font-size"></span>
            <span>{{'KAFS00_24' | i18n}}</span>
            <span>[</span>
            <span>{{ scheduleTime || i18n }}</span>
            <span>]</span>    
        </span>
    </span>
</span>
</template>