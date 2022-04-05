<template>
<div class="cmms45shrcomponentsapp7">
    <app70 v-if="params.appDispInfoStartupOutput.appDetailScreenInfo.application.opStampRequestMode==0" v-bind:params="params" />
    <app71 v-if="params.appDispInfoStartupOutput.appDetailScreenInfo.application.opStampRequestMode==1" v-bind:params="params" />
</div>
</template>