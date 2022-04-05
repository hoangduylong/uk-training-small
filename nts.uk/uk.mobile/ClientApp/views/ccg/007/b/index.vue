<template>
    <div id="login" class="pt-5">
        <div class="row justify-content-md-center">
            <div class="col-lg-4 col-md-6">
                <div class="text-center page-title">UniversalK</div>
                <fieldset class="login-form mt-5">
                    <nts-dropdown
                        id="companyCode"
                        class="justify-content-end"
                        data-dependency="employeeCode"
                        name='CCG007_7'
                        v-bind:tabindex='1'
                        v-model="model.comp"
                        v-bind:inline-title="true"
                        v-bind:disabled="false"
                        v-bind:show-title="false"
                        v-bind:columns="{ title: 'col-lg-12', input: 'col-lg-8' }">
                        <option value="">--- {{ 'CCGS07_1' | i18n }} ---</option>
                        <option v-for="(comp, k) in companies" :value="comp.companyCode" v-bind:key="k">
                            {{comp.companyCode}}&nbsp;&nbsp;&nbsp;{{comp.companyName}}
                        </option>
                    </nts-dropdown>
                    
                    <nts-text-editor
                        name='CCGS07_2'
                        v-bind:tabindex='2'
                        v-model="model.employeeCode"
                        v-bind:show-constraint="false"
                        v-bind:inline-title="true"
                        v-bind:disabled="disabled"
                        v-bind:show-title="true"
                        v-bind:columns="{ title: 'col-lg-4', input: 'col-lg-8' }" 
                        id="employeeCode" data-dependency="password"/>

                    <form v-submit="login">
                        <nts-input-password
                            id="password"
                            name='CCGS07_3'
                            v-bind:tabindex='3'
                            v-model="model.password"
                            v-bind:show-constraint="false"
                            v-bind:inline-title="true"
                            v-bind:disabled="disabled"
                            v-bind:show-title="true"
                            v-bind:columns="{ title: 'col-lg-4', input: 'col-lg-8' }"/>
                    </form>

                    <nts-checkbox 
                        class="form-check-primary"
                        v-model="model.autoLogin"
                        v-bind:value="true"
                        v-bind:disabled="false">
                        {{ 'CCGS07_4' | i18n }}
                    </nts-checkbox>

                    <div class="mt-3">
                        <button class="btn btn-primary btn-block" v-click:500="login"> {{'CCGS07_5' | i18n}}</button>
                        <div class="text-center mt-2">
                            <button class="btn btn-link" @click="forgetPass"> {{ 'CCGS07_6' | i18n }} </button>
                        </div>
                    </div>
                </fieldset>
                <div class="text-right mt-3">
                    <label class="badge badge-pill badge-primary"> {{ 'CCGS07_7' | i18n(model.ver) }} </label>
                </div>
            </div>
        </div>
    </div>
</template>