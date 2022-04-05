<template>
    <div class="documentspluginsmask">
        <h5>1. Ví dụ</h5>
        <div v-if="timeout" class="form-group">
            <span>{{'close_mask_after' | i18n}}: {{timeout}}s</span>
        </div>
        <button class="btn btn-secondary" v-on:click="showMask">{{'show_mask' | i18n}}</button>
        <br />
        <br />
        <div class="alert alert-primary animated" v-for="(msg, k) in messages" v-bind:key="k" v-on:click="messages.splice(k, 1)">
            {{msg | i18n}}
            <button type="button" class="close" v-on:click="messages.splice(k, 1)">&times;</button>
        </div>
        <markdown />
    </div>
</template>