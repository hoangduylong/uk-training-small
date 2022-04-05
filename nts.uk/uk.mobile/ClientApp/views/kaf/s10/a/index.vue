<template>
  <div class="kafs10">
    <step-wizard v-bind:items="['step_1', 'step_2', 'step_3']" v-bind:selected="step" />
        <div class="mt-3 mb-3"> 
            <div v-show="step == 'step_1'">
                <kafS10Step1Component v-bind:params="text1" ref="step1"></kafS10Step1Component>
            </div>
            <div v-show="step == 'step_2'">
                <kafS10Step2Component ref="step2"></kafS10Step2Component>
            </div> 
            <div v-if="step == 'step_3'">
                <kafS10Step3Component @backToStep1="backToStep1"></kafS10Step3Component>
            </div>   
        </div> 
  </div>
</template>