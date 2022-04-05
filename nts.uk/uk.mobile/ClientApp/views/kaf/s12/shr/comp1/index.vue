<template>
    <div>
        <div class="card card-label">
            <div class="card-header uk-bg-accordion">
                <span>{{ params.title | i18n }}</span>
                <span class="badge badge-info">任意</span>
            </div>
        </div>
        <!-- A_A5_2 -->
        <span class="ml-1">{{ params.description | i18n }}</span>
        <!-- A_A5_3 -->
        <div class="position-relative">
            <nts-time-editor
                    v-model="params.timeValue"
                    v-bind:name="params.name | i18n"
                    time-input-type="time-point"
                    v-bind:show-title="true"
                    v-bind:show-constraint="false"/>
            <div class="kafs00p1">
                <div class="position-absolute">
                    <kafs00subp1 v-bind:params="scheduledTime"/>
                </div>
            </div>
        </div>
    </div>
</template>