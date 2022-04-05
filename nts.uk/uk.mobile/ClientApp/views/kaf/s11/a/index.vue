<template>
<div class="kafs11a">
    <!-- A1 -->
    <div>
        <kafs00-a v-if="kaf000_A_Params != null" v-bind:params="kaf000_A_Params" />
    </div>
    <!-- A2 -->
    <div class="accordion" style="margin-bottom: 10px;">
        <div class="card">
            <div class="card-header uk-bg-accordion">
                <button class="btn btn-link" type="button">{{'KAFS11_1' | i18n}}</button>
            </div>
            <div class="collapse">
                <div class="card-body">
                    <table class="table table-sm mb-0">
                        <thead class="thead-light">
                            <tr class="table-light">
                                <td>{{'KAFS11_2' | i18n}}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span v-if="displayInforWhenStarting">
                                        {{ 'KAFS11_31' | i18n(displayInforWhenStarting.remainingHolidayInfor.remainDays) }}    
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!-- A17_1 -->
    <div v-if="!$valid || !isValidateAll" class="card bg-danger top-alert uk-text-danger topError">
        <button class="btn btn-link uk-text-danger">
            <i class="fa fa-exclamation-circle" aria-hidden="true" ></i>
            {{ 'KAFS11_3' | i18n }}
        </button>
    </div>
    <!-- A3 -->
    <div class="card card-label" v-if="dispPrePostAtr">
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n3">
                {{'KAFS00_8' | i18n}}</v-label>
            <span class="badge badge-warning" style="height: 30%">必須</span>
        </div>
        <div class="card-body">
            <div style="width: 100%" id="prePostSelect">
                <nts-switchbox v-for="(option, optionIndex) in prePostResource" v-bind:key="optionIndex"
                    v-bind:disabled="!enablePrePostAtr"
                    v-model="prePostAtr"
                    v-bind:value="option.code">
                        {{option.text | i18n}}
                </nts-switchbox>
            </div>
        </div>
    </div>
    <!-- A4 -->
    <div class="card card-label" v-if="dispComplementLeaveAtr">
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n3">
                {{'KAFS11_4' | i18n}}</v-label>
            <span class="badge badge-warning" style="height: 30%">必須</span>
        </div>
        <div class="card-body">
            <div style="width: 100%">
                <nts-switchbox v-for="(option, optionIndex) in complementLeaveAtrResource" v-bind:key="optionIndex"
                    v-bind:disabled="!dispComplementLeaveAtr"
                    v-model="complementLeaveAtr"
                    v-bind:value="option.code">
                        {{option.text | i18n}}
                </nts-switchbox>
            </div>
        </div>
    </div>
    <div>
        <!-- A5 -->
        <div class="card card-label" v-if="dispComplementContent">
            <div class="card-header uk-bg-sea-green" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS11_8' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body">
                <nts-date-input v-model="complementDate" v-bind:disabled="mode==ScreenMode.DETAIL"/>
            </div>
        </div>
        <!-- A6 -->
        <div class="card card-label" v-if="dispComplementContent">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS11_9' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body mb-3">
                <div>
                    <button class="btn btn-selection" v-on:click="openKDLS02(true)">
                        <span class="uk-text-dark-gray" style="font-size: 90%">{{'KAFS11_10' | i18n}}</span>
                    </button>
                </div>
                <div>
                    <span class="uk-text-dark-gray ml-3" style="font-size: 90%">
                        <span class="font-weight-bold mr-3">{{ getCDFormat(complementWorkInfo.workTypeCD) | i18n }}</span>
                        <span>{{ getWorkTypeName(complementWorkInfo.workTypeCD, true) }}</span>
                    </span>       
                </div>
                <div>
                    <button class="btn btn-selection" v-on:click="openKDLS01(true)">
                        <span class="uk-text-dark-gray" style="font-size: 90%">{{'KAFS11_11' | i18n}}</span>
                    </button>      
                </div>
                <div>
                    <span class="uk-text-dark-gray ml-3" style="font-size: 90%">
                        <span class="font-weight-bold mr-3">{{ getCDFormat(complementWorkInfo.workTimeCD) | i18n }}</span>
                        <span>{{ getWorkTimeName(complementWorkInfo.workTimeCD) }}</span>
                    </span>    
                </div>
                <div class="mt-2 mb-2">
                    <div class="uk-text-dark-gray ml-3">
                        <div v-html="getWorkTimeLabel(complementWorkInfo.workTimeCD, true)"></div>
                    </div>    
                </div>
            </div>
        </div>
        <!-- A7 -->
        <div class="card card-label" v-if="dispComplementContent">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS11_12' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body">
                <nts-time-range-input v-model="complementWorkInfo.timeRange1"
                    v-bind:disabled="!cdtSubstituteWorkAppReflect()"/>
            </div>
        </div>
        <!-- A8 -->
        <div class="card card-label" v-if="dispComplementTimeRange2">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS11_13' | i18n}}</v-label>
                <span class="badge badge-info" style="height: 30%">任意</span>
            </div>
            <div class="card-body">
                <nts-time-range-input v-model="complementWorkInfo.timeRange2"
                    v-bind:disabled="!cdtSubstituteWorkAppReflect()"/>
            </div>
        </div>
    </div>
    <!-- A18 -->
    <div class="card card-label" v-if="dispLeaveLinkContent1">
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n3">
                {{'KAFS11_19' | i18n}}</v-label>
            <span class="badge badge-info" style="height: 30%">任意</span>
        </div>
        <div class="card-body">
            <table class="table table-sm mb-0" v-if="isSelectMngLst(recHolidayMngLst)">
                <thead class="thead-light">
                    <tr class="table-light">
                        <td>{{'KAFS11_20' | i18n}}</td>
                        <td>{{'KAFS11_21' | i18n}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in recHolidayMngLst" v-bind:key="index">
                        <td>{{$dt(new Date(item.outbreakDay), 'YY/MM/DD(dd)')}}</td>
                        <td>{{'KAFS11_31' | i18n(item.dayNumberUsed)}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-2 mb-2" style="text-align: center">
                <button class="shadow-none btn rounded-pill btn-info" v-on:click="openKDLS36Complement()">
                    <span class="ml-3">{{'KAFS11_22' | i18n}}</span>
                    <span class="fas fa-angle-double-right mr-3"></span>
                </button>
            </div>
        </div>
    </div>
    <div>
        <!-- A9 -->
        <div class="card card-label" v-if="dispLeaveContent">
            <div class="card-header uk-bg-sea-green" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS11_14' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body">
                <nts-date-input v-model="leaveDate" v-bind:disabled="mode==ScreenMode.DETAIL"/>
            </div>
        </div>
        <!-- A10 -->
        <div class="card card-label" v-if="dispLeaveContent">
            <div class="card-header uk-bg-accordion" style="align-items: center" v-if="dispLeaveContent">
                <v-label class="border-0 pl-0 my-n3">
                    {{leaveWorkInfoTitle | i18n}}
                </v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body mb-3">
                <div v-if="dispLeaveContent">
                    <button class="btn btn-selection" v-on:click="openKDLS02(false)">
                        <span class="uk-text-dark-gray" style="font-size: 90%">{{'KAFS11_10' | i18n}}</span>
                    </button>
                </div>
                <div v-if="dispLeaveContent">
                    <span class="uk-text-dark-gray ml-3" style="font-size: 90%">
                        <span class="font-weight-bold mr-3">{{ getCDFormat(leaveWorkInfo.workTypeCD) | i18n }}</span>
                        <span>{{ getWorkTypeName(leaveWorkInfo.workTypeCD, false) }}</span>
                    </span>       
                </div>
                <div v-if="dispLeaveWorkTime">
                    <button class="btn btn-selection" v-on:click="openKDLS01(false)">
                        <span class="uk-text-dark-gray" style="font-size: 90%">{{'KAFS11_11' | i18n}}</span>
                    </button>      
                </div>
                <div v-if="dispLeaveWorkTime">
                    <span class="uk-text-dark-gray ml-3" style="font-size: 90%">
                        <span class="font-weight-bold mr-3">{{ getCDFormat(leaveWorkInfo.workTimeCD) | i18n }}</span>
                        <span>{{ getWorkTimeName(leaveWorkInfo.workTimeCD) }}</span>
                    </span>    
                </div>
                <div class="mt-2 mb-2" v-if="dispLeaveWorkTime">
                    <div class="uk-text-dark-gray ml-3">
                        <div v-html="getWorkTimeLabel(leaveWorkInfo.workTimeCD, false)"></div>
                    </div>    
                </div>
            </div>
        </div>
        <!-- A11 -->
        <div class="card card-label" v-if="dispLeaveTimeRange1">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS11_17' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body">
                <nts-time-range-input v-model="leaveWorkInfo.timeRange1"
                    v-bind:disabled="!enableLeaveTimeRange"/>
            </div>
        </div>
        <!-- A12 -->
        <div class="card card-label" v-if="dispLeaveTimeRange2">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS11_18' | i18n}}</v-label>
                <span class="badge badge-info" style="height: 30%">任意</span>
            </div>
            <div class="card-body">
                <nts-time-range-input v-model="leaveWorkInfo.timeRange2"
                    v-bind:disabled="!enableLeaveTimeRange"/>
            </div>
        </div>
    </div>
    <!-- A13 -->
    <div class="card card-label" v-if="dispLeaveLinkContent2">
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n3">
                {{'KAFS11_19' | i18n}}</v-label>
            <span class="badge badge-info" style="height: 30%">任意</span>
        </div>
        <div class="card-body">
            <table class="table table-sm mb-0" v-if="isSelectMngLst(absHolidayMngLst)">
                <thead class="thead-light">
                    <tr class="table-light">
                        <td>{{'KAFS11_20' | i18n}}</td>
                        <td>{{'KAFS11_21' | i18n}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in absHolidayMngLst" v-bind:key="index">
                        <td>{{$dt(new Date(item.outbreakDay), 'YY/MM/DD(dd)')}}</td>
                        <td>{{'KAFS11_31' | i18n(item.dayNumberUsed)}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-2 mb-2" style="text-align: center">
                <button class="shadow-none btn rounded-pill btn-info" v-on:click="openKDLS36Leave()">
                    <span class="ml-3">{{'KAFS11_22' | i18n}}</span>
                    <span class="fas fa-angle-double-right mr-3"></span>
                </button>
            </div>
        </div>
    </div>
    <!-- A14 -->
    <div class="card card-label" v-if="dispComplementLinkContent">
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n3">
                {{'KAFS11_23' | i18n}}</v-label>
            <span class="badge badge-info" style="height: 30%">任意</span>
        </div>
        <div class="card-body">
            <table class="table table-sm mb-0" v-if="isSelectMngLst(absWorkMngLst)">
                <thead class="thead-light">
                    <tr class="table-light">
                        <td>{{'KAFS11_24' | i18n}}</td>
                        <td>{{'KAFS11_21' | i18n}}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in absWorkMngLst" v-bind:key="index">
                        <td>{{$dt(new Date(item.outbreakDay), 'YY/MM/DD(dd)')}}</td>
                        <td>{{'KAFS11_31' | i18n(item.dayNumberUsed)}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="mt-2 mb-2" style="text-align: center">
                <button class="shadow-none btn rounded-pill btn-info" v-on:click="openKDLS35Leave()">
                    <span class="ml-3">{{'KAFS11_25' | i18n}}</span>
                    <span class="fas fa-angle-double-right mr-3"></span>
                </button>
            </div>
        </div>
    </div>
    <!-- A15 -->
    <div>
        <kafs00-c v-if="kaf000_C_Params != null" v-bind:params="kaf000_C_Params" 
        v-on:kaf000CChangeReasonCD="kaf000CChangeReasonCD"
        v-on:kaf000CChangeAppReason="kaf000CChangeAppReason" />
    </div>
    <!-- A16 -->
    <div class="mb-3">
        <button class="btn btn-primary w-100" v-on:click="register()">
            <span v-if="mode==ScreenMode.DETAIL">{{'KAFS11_30' | i18n}}</span>
            <span v-else>{{'KAFS11_29' | i18n}}</span>
        </button>
    </div>
</div>
</template>