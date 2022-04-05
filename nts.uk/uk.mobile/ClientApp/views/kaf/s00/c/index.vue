<template>
<div class="kafs00c">
    <div class="card card-label" v-if="dispReason">
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n1" v-bind:constraint="validations.opAppReason">
                {{'KAFS00_16' | i18n}}</v-label>
            <span class="badge badge-warning" v-if="standardReasonRequired || requiredAppReason">必須</span>
            <span class="badge badge-info" v-else>任意</span>
        </div>
        <div class="card-body">
            <div v-if="displayFixedReason">
                <div class="mb-1">
                    <span class="small-header">{{'KAFS00_17' | i18n}}</span>
                </div>
                <div>
                    <nts-dropdown v-model="opAppStandardReasonCD">
                        <option v-for="(item, itemIndex) in dropdownList" v-bind:key="itemIndex" v-bind:value="item.appStandardReasonCD">
                            {{item.reasonForFixedForm | i18n}}
                        </option>
                    </nts-dropdown>
                </div>
            </div>
            <template v-else />
            <div v-if="displayAppReason">
                <div class="mb-1">
                    <span class="small-header">{{'KAFS00_18' | i18n}}</span>
                </div>
                <div>
                    <nts-text-area　v-model="opAppReason" />
                </div>
            </div>
            <template v-else />
        </div>
    </div>
    <template v-else />
</div>
</template>