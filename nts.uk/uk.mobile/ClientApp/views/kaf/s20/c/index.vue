<template>
<div class="kafs20c">
    <KafS00DComponent
     v-if="!!kafS00DParams"
     v-bind:params="kafS00DParams"
     @close-modal="handleCloseModel"
     />
</div>
</template>