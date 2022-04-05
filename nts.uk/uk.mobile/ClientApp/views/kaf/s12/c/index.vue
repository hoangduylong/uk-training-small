<template>
    <div class="kafs12c">
        <kafs00d v-if="kafS00DParams != null"
                 v-bind:params="kafS00DParams"
                 @close-modal="backToStep1"/>
    </div>
</template>