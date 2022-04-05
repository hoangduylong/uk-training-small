<template>
    <div class="apply-time" v-if="display">
        <div class="card card-label">
            <div class="card-header uk-bg-accordion">
                <span>{{ params.appTimeTypeName | i18n }}</span>
                <span class="badge badge-info">任意</span>
            </div>
        </div>
        <div class="row mt-3 justify-content-around">
            <!-- A_B1_2 -->
            <div class="col-4 col1 p-2 text-center">
                <span>{{ "KAFS12_21" | i18n(requiredAppTime)}}</span>
            </div>
            <!-- A_B1_3 -->
            <div class="col-4 col2 p-2 text-center">
                <span>{{"KAFS12_22" | i18n(totalAppTime)}}</span>
            </div>
        </div>
        <div class="position-relative" v-if="display60H">
            <nts-time-editor
                    v-model="params.super60AppTime"
                    v-bind:name="'Com_ExsessHoliday' | i18n"
                    time-input-type="time-duration"
                    v-bind:show-title="true"
                    v-bind:show-constraint="false">
            </nts-time-editor>
            <span class="numberOfHoursLeft position-absolute">{{'KAFS12_23' | i18n(super60HRemaining)}}</span>
        </div>
        <div class="position-relative" v-if="displaySubstitute">
            <nts-time-editor
                    v-model="params.substituteAppTime"
                    v-bind:name="'KAFS12_24' | i18n"
                    time-input-type="time-duration"
                    v-bind:show-title="true"
                    v-bind:show-constraint="false">
            </nts-time-editor>
            <span class="numberOfHoursLeft position-absolute">{{'KAFS12_23' | i18n(substituteRemaining)}}</span>

        </div>
        <div id="annual-area" class="position-relative" v-if="displayAnnual">
            <nts-time-editor
                    v-model="params.annualAppTime"
                    v-bind:name="'KAFS12_25' | i18n"
                    time-input-type="time-duration"
                    v-bind:show-title="true"
                    v-bind:show-constraint="false">
            </nts-time-editor>
            <span class="numberOfHoursLeft position-absolute">{{'KAFS12_23' | i18n(annualRemaining)}}</span>
            <span class="grant-day position-absolute" v-html="grantDate"></span>
        </div>
        <div class="position-relative" v-if="displayChildNursing">
            <nts-time-editor
                    v-model="params.childNursingAppTime"
                    v-bind:name="'Com_ChildNurseHoliday' | i18n"
                    time-input-type="time-duration"
                    v-bind:show-title="true"
                    v-bind:show-constraint="false">
            </nts-time-editor>
            <span class="numberOfHoursLeft position-absolute" v-if="displayChildNursingRemaining">{{'KAFS12_23' | i18n(childNursingRemaining)}}</span>
        </div>
        <div class="position-relative" v-if="displayNursing">
            <nts-time-editor
                    v-model="params.nursingAppTime"
                    v-bind:name="'Com_CareHoliday' | i18n"
                    time-input-type="time-duration"
                    v-bind:show-title="true"
                    v-bind:show-constraint="false">
            </nts-time-editor>
            <span class="numberOfHoursLeft position-absolute" v-if="displayNursingRemaining">{{'KAFS12_23' | i18n(nursingRemaining)}}</span>
        </div>
        <div class="position-relative">
            <nts-dropdown
                    v-if="displaySpecial"
                    v-bind:name="'KAFS12_44' | i18n"
                    v-model="comboBoxValue">
                <option v-for="item in comboBoxOptions" v-bind:key="item.specialHdFrameNo" v-bind:value="item.specialHdFrameNo">
                    {{ item.specialHdFrameName }}
                </option>
            </nts-dropdown>
        </div>
        <div class="position-relative" style="padding-top: 15px;" v-if="displaySpecial">
            <nts-time-editor
                    v-model="params.specialAppTime"
                    v-bind:name="'KAFS12_44' | i18n"
                    time-input-type="time-duration"
                    v-bind:show-title="false">
            </nts-time-editor>
            <span class="numberOfHoursLeft2 position-absolute">{{'KAFS12_23' | i18n(specialRemaining)}}</span>
        </div>
    </div>
</template>