<template>
<div class="cmms45shrcomponentsapp10">
    <!-- B1 -->
    <div v-if="rec">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_26' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div">
            {{rec.application.appDate | i18n}} {{'KAFS11_34' | i18n}} {{'CMMS45_24' | i18n(prePost(rec.application.prePostAtr))}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div uk-text-dark-gray" style="font-size: 90%">
            {{'KAFS11_33' | i18n($dt(new Date(rec.application.inputDate), 'YY/MM/DD HH:mm'))}}
        </div>
    </div>
    <!-- B2 -->
    <div v-if="rec">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_9' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div uk-text-dark-gray" style="font-size: 90%">
            {{'KAFS11_10' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div pl-0 pr-0">
            <div class="col-2">{{rec.workInformation.workType | i18n}}</div>
            <div class="col-10">{{getWorkTypeName(rec.workInformation.workType, true) | i18n}}</div>
        </div>
        <div class="row pt-1 pb-1 border-0 header-div uk-text-dark-gray" style="font-size: 90%">
            {{'KAFS11_11' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div pl-0 pr-0">
            <div class="col-2">{{rec.workInformation.workTime | i18n}}</div>
            <div class="col-10">{{getWorkTimeName(rec.workInformation.workTime) | i18n}}</div>
        </div>
    </div>
    <!-- B3 -->
    <div v-if="rec">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_12' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div">
            {{getTimeRange(rec.workingHours, 1) | i18n}}
        </div>
    </div>
    <!-- B4 -->
    <div v-if="rec && cdtTimeRange2(true)">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_13' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div">
            {{getTimeRange(rec.workingHours, 2) | i18n}}
        </div>
    </div>
    <!-- B11 -->
    <div v-if="rec && cdtSubMngDailyType(true)">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_27' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-bottom header-div">
            <div class="col-8">{{'KAFS11_20' | i18n}}</div>
            <div class="col-3">{{'KAFS11_21' | i18n}}</div>
        </div>
        <div v-for="(item, index) in recLeaveComDayOffMana" v-bind:key="index" 
            class="row pt-1 pb-1 border-bottom header-div">
            <div class="col-8">{{$dt(new Date(item.outbreakDay), 'YY/MM/DD(dd)')}}</div>
            <div class="col-3">{{'KAFS11_31' | i18n(item.dayNumberUsed)}}</div>
        </div>
    </div>
    <!-- B5 -->
    <div v-if="abs">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_26' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div">
            {{abs.application.appDate | i18n}} {{'KAFS11_35' | i18n}} {{'CMMS45_24' | i18n(prePost(abs.application.prePostAtr))}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div uk-text-dark-gray" style="font-size: 90%">
            {{'KAFS11_33' | i18n($dt(new Date(abs.application.inputDate), 'YY/MM/DD HH:mm'))}}
        </div>
    </div>
    <!-- B6 -->
    <div v-if="abs">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{absWorkInfoTitle | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div uk-text-dark-gray" style="font-size: 90%">
            {{'KAFS11_10' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div pl-0 pr-0">
            <div class="col-2">{{abs.workInformation.workType | i18n}}</div>
            <div class="col-10">{{getWorkTypeName(abs.workInformation.workType, false) | i18n}}</div>
        </div>
        <div class="row pt-1 pb-1 border-0 header-div uk-text-dark-gray" style="font-size: 90%" v-if="cdtLeaveDailyType(1)">
            {{'KAFS11_11' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div pl-0 pr-0" v-if="cdtLeaveDailyType(1)">
            <div class="col-2">{{abs.workInformation.workTime | i18n}}</div>
            <div class="col-10">{{getWorkTimeName(abs.workInformation.workTime) | i18n}}</div>
        </div>
    </div>
    <!-- B7 -->
    <div v-if="abs && cdtLeaveDailyType(2)">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_17' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div">
            {{getTimeRange(abs.workingHours, 1) | i18n}}
        </div>
    </div>
    <!-- B8 -->
    <div v-if="abs && cdtTimeRange2(false) && cdtLeaveDailyType(2)">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_18' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-0 header-div">
            {{getTimeRange(abs.workingHours, 2) | i18n}}
        </div>
    </div>
    <!-- B9 -->
    <div v-if="abs && cdtSubMngDailyType(false)">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_27' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-bottom header-div">
            <div class="col-8">{{'KAFS11_20' | i18n}}</div>
            <div class="col-3">{{'KAFS11_21' | i18n}}</div>
        </div>
        <div v-for="(item, index) in absLeaveComDayOffMana" v-bind:key="index" 
            class="row pt-1 pb-1 border-bottom header-div">
            <div class="col-8">{{$dt(new Date(item.outbreakDay), 'YY/MM/DD(dd)')}}</div>
            <div class="col-3">{{'KAFS11_31' | i18n(item.dayNumberUsed)}}</div>
        </div>
    </div>
    <!-- B10 -->
    <div v-if="abs && cdtHdMngLeaveDailyType()">
        <div class="row uk-bg-accordion card-header pt-1 pb-1 border-0 header-div">
            {{'KAFS11_28' | i18n}}
        </div>
        <div class="row pt-1 pb-1 border-bottom header-div">
            <div class="col-8">{{'KAFS11_24' | i18n}}</div>
            <div class="col-3">{{'KAFS11_21' | i18n}}</div>
        </div>
        <div v-for="(item, index) in absPayoutSubofHDManagements" v-bind:key="index" 
            class="row pt-1 pb-1 border-bottom header-div">
            <div class="col-8">{{$dt(new Date(item.outbreakDay), 'YY/MM/DD(dd)')}}</div>
            <div class="col-3">{{'KAFS11_31' | i18n(item.dayNumberUsed)}}</div>
        </div>
    </div>
</div>
</template>