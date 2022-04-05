<template>
<div class="documentscontrolsinput-time">
    <h5>1. {{'sample' | i18n}}</h5>
    <button v-on:click="validate" class="btn btn-secondary">Validate</button>
    <br/>

    <nts-time-editor v-model="timeWithDay" name='time-with-day' time-input-type="time-with-day" />

    <nts-time-editor v-model="timePoint" name='time-point' time-input-type="time-point" />

    <nts-time-editor v-model="timeDuration" name='time-duration' time-input-type="time-duration" />

    <markdown />

</div>
</template>
