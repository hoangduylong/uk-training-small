<template>
<div class="kafsamplemultistep2">
    <div class="mt-3 mb-3">
        <nts-text-editor
            v-model="$appContext.text2"
            name='Text Item'/>
    </div>
    <div class="text-center mt-4 mb-4">
        <button class="btn btn-primary btn-block btn-lg" 
                v-show="$appContext.step == 'step_2'" 
                v-on:click="$appContext.register">{{'forward_in_1' | i18n}}</button>
    </div>
</div>
</template>