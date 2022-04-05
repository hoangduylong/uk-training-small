<template>
    <div id="kafs12-a1">
        <kafs00-a
                v-if="$appContext.kaf000_A_Params != null"
                v-bind:params="$appContext.kaf000_A_Params"/>
        <!-- A_A3_1 -->
        <div v-if="!isValidateAll || !$valid"
             class="card bg-danger top-alert uk-text-danger topError">
            <button class="btn btn-link uk-text-danger">
                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                {{ "KAFS08_13" | i18n }}
            </button>
        </div>
        <kafs00-b
                v-if="$appContext.kaf000_B_Params != null"
                v-bind:params="$appContext.kaf000_B_Params"
                v-on:kaf000BChangeDate="$appContext.kaf000BChangeDate"
                v-on:kaf000BChangePrePost="kaf000BChangePrePost"/>

        <div v-for="lateEarly in lateEarlyTimeZones"
             v-bind:key="lateEarly.appTimeType">
            <kafs12-late-early
                    v-if="(lateEarly.appTimeType === 0 && condition2)
                        || (lateEarly.appTimeType === 1 && condition3)
                        || (lateEarly.appTimeType === 2 && condition9)
                        || (lateEarly.appTimeType === 3 && condition12)"
                    v-bind:params="lateEarly"
                    v-bind:appDispInfoStartupOutput="appDispInfoStartupOutput"/>
        </div>
        <!-- A_A9_1 -->
        <div v-if="condition15" class="mb-2">
            <div class="card card-label">
                <div class="card-header uk-bg-accordion">
                    <span>{{ "KAFS12_13" | i18n }}</span>
                    <span class="badge badge-info">任意</span>
                </div>
                <!-- A_A9_2 -->
                <span class="ml-1">{{ "KAFS12_14" | i18n }}</span>
                <!-- A_A9_3 -->
                <div v-for="timeZone in outingTimeZones"
                     v-bind:key="timeZone.workNo">
                    <kafs12-outing
                            v-show="timeZone.display"
                            v-bind:params="timeZone"
                            v-bind:reflectSetting="reflectSetting"
                            v-bind:appDispInfoStartupOutput="appDispInfoStartupOutput"
                            v-bind:displaySwitch="condition16"/>
                </div>
            </div>
            <div v-if="displayAddButton">
                <div class="text-center position-relative" style="height: 35px">
                    <!-- A_A9_6 -->
                    <div class="position-absolute w-100">
                        <hr/>
                    </div>
                    <!-- A_A9_5 -->
                    <div class="position-absolute w-100 mt-2">
                        <span class="fas fa-2x fa-plus-circle"
                              v-on:click="handleAddOutingTimeZone()"></span>
                    </div>
                </div>
                <!-- A_A9_7 -->
                <div class="text-center">{{ "KAFS12_17" | i18n }}</div>
            </div>
        </div>
        <!-- A_A10_1 -->
        <button type="button"
                class="btn btn-success btn-block text-center mb-3"
                v-on:click="nextToStep2()">{{ "KAFS12_19" | i18n }}</button>
    </div>
</template>