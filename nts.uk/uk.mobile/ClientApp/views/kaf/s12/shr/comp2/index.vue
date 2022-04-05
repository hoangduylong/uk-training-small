<template>
    <div class="card-body mb-n3 position-relative outing-zone">
        <nts-time-range-input
                v-model="params.timeZone"
                v-bind:show-title="true"
                v-bind:show-constraint="false"
                v-bind:disabled="disabled"
                time-input-type="time-point"
                v-bind:name="'KAFS12_18' | i18n(params.workNo)"/>
        <div v-if="displaySwitch" class="card-body w-100 mt-n3">
            <nts-switchbox
                    v-model="params.appTimeType"
                    v-for="option in switchOptions"
                    v-bind:disabled="disabled"
                    v-bind:key="option.id"
                    v-bind:value="option.id">{{ option.name | i18n }}</nts-switchbox>
        </div>
    </div>
</template>