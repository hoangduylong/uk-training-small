<template>
<div class="kafsamplemulti">
    <step-wizard v-bind:items="['step_1', 'step_2']" v-bind:selected="step" />
    <div class="mt-3 mb-3">
        <div v-if="step == 'step_1'">
            <kafsamplemultistep1 v-bind:params="text1"></kafsamplemultistep1>
        </div>
        <div v-if="step == 'step_2'">
            <kafsamplemultistep2></kafsamplemultistep2>
        </div>
    </div>
</div>
</template>