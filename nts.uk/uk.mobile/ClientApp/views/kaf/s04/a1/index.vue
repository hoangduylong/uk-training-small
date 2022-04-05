<template>
<div class="kafs04a1">
    <kaf-s00-d
    v-if="kafS00DParams"
    v-bind:params="kafS00DParams"
    @close-modal="handleCloseModel"
    />
</div>
</template>