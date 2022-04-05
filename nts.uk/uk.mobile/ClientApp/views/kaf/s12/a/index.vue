<template>
    <div class="kafs12a">
        <step-wizard v-bind:items="['KAFS12_1','KAFS12_2','KAFS12_3']" v-bind:selected="step"/>
        <kaf-s12-a1
                v-show="step == 'KAFS12_1'"
                v-bind:newMode="newMode"
                v-bind:details="details"
                v-bind:appDispInfoStartupOutput="appDispInfoStartupOutput"
                v-bind:reflectSetting="reflectSetting"
                v-bind:timeLeaveManagement="timeLeaveManagement"
                v-bind:timeLeaveRemaining="timeLeaveRemaining"
                v-bind:application="application"
                @next-to-step-two="handleNextToStepTwo"
        />
        <kaf-s12-a2
                v-show="step == 'KAFS12_2'"
                v-bind:newMode="newMode"
                v-bind:details="details"
                v-bind:appDispInfoStartupOutput="appDispInfoStartupOutput"
                v-bind:reflectSetting="reflectSetting"
                v-bind:timeLeaveManagement="timeLeaveManagement"
                v-bind:timeLeaveRemaining="timeLeaveRemaining"
                @next-to-step-three="handleNextToStepThree"
                @back-to-step-one="handleBackToStepOne"
        />
        <kaf-s12-c
                v-if="step == 'KAFS12_3'"
                v-bind:newMode="newMode"
                v-bind:appID="appID"
                @back-to-step-one="handleBackToStepOne"/>
    </div>
</template>