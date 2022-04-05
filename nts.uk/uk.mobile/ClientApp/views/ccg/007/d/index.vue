<template>
    <div id="forget-pass">
        <div class="text-center page-title">{{ 'CCGS07_14' | i18n }}</div>
        <div class="text-left page-info alert-light alert">
            <ul>
                <li>{{ 'CCGS07_15' | i18n }}</li>
                <li>{{ 'CCGS07_16' | i18n }}</li>
                <li>{{ 'CCGS07_17' | i18n }}</li>
            </ul>
        </div>
        <fieldset class="login-form">
            <nts-dropdown
                tabindex='1'
                v-model="companyCode"
                v-bind:inline-title="true"
                name='CCGS07_1'
                v-bind:disabled="false"
                v-bind:show-title="false"
                v-bind:constraint="validations.companyCode"
                v-bind:columns="{ title: 'col-md-2', input: 'col-md-4' }">
                <option value="">--- Choose options ---</option>
                <option v-for="(comp, k) in companies" :value="comp.companyCode" v-bind:key="k">
                    {{comp.companyCode}}&nbsp;&nbsp;&nbsp;{{comp.companyName}}
                </option>
            </nts-dropdown>
            
            <form v-submit="sendMail">
                <nts-text-editor
                    name='CCGS07_2'
                    tabindex='2'
                    v-model="employeeCode"
                    v-bind:columns="{ title: 'col-md-2', input: 'col-md-4' }"
                    @keyup.enter="sendMail" />
            </form>

            <div class="mb-2">
                <button class="btn btn-primary btn-lg btn-block" v-click:500="sendMail">{{ 'CCGS07_40' | i18n }}</button>
            </div>
            <div>
                <button class="btn btn-secondary btn-lg btn-block" @click="goBack">{{ 'CCGS07_41' | i18n }}</button>
            </div>
        </fieldset>
    </div>
</template>