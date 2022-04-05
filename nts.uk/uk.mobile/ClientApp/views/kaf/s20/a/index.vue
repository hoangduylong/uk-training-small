<template>
<div class="kafs20a">
    <step-wizard
    class="mb-3"
    v-bind:items="['KAFS20_10','KAFS20_11','KAFS20_12']"
    v-bind:selected="step"
    />
    <kaf-s20-a1
    v-if="step == 'KAFS20_10'"
    @nextToStep2="handleNextToStep2"
    v-bind:mode="mode"
    />
    <kaf-s20-a2
    v-if="step == 'KAFS20_11'"
    @nextToStep3="handleNextToStep3"
    @backToStep1="handleBackToStep1"
    v-bind:settingItems="settingItems"
    v-bind:mode="mode"
    v-bind:params="_params"
    />
    <kaf-s20-c
    v-if="step == 'KAFS20_12'"
    v-bind:mode="mode"
    v-bind:response="response"
    @backToStepTwo="handleBackToStepTwo"
    />
</div>
</template>