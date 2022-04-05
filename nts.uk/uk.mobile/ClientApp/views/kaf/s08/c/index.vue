<template>
<div class="kafs08c mt-3">
    <kafs00d v-if="kafS00DParams != null" 
    v-bind:params="kafS00DParams" 
    @close-modal="BackToStepOne"/>
</div>
</template>