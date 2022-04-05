<template>
<div class="cmms45shrcomponentsapp1">
    <!--B1_1-->
    <div class="card card-label" v-if="true">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS06_1" | i18n }}</span>
        </div>
    </div>
    <!--B1_2-->
    <div class="text-left">{{B1_2}}</div>

    <!--B2_1-->
    <div class="card card-label" v-if="true">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ (c2 ? "KAFS06_12" : "KAFS06_14") | i18n }}</span>
        </div>
    </div>

    <div v-if="true">
        <!-- B2_2 -->
        <div class="row mt-1 mb-1">
            <div class="col-12 pl-3 textSize">{{"KAFS06_12" | i18n}}</div>
        </div>
        <!-- B2_3 -->
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pr-2 pl-3">
                {{_.get(workInfo, 'workType.code') || ''}}
            </div>
            <div class="col pl-0">
                {{_.get(workInfo, 'workType.name') || ''}}
            </div>
        </div>

        <!-- B2_4 -->
        <div v-if="c9" class="row mt-1 mb-1">
            <div class="col-12 pl-3 textSize"> {{"KAFS06_13" | i18n}} </div>
        </div>
        <!-- B2_5 -->
        <div v-if="c9" class="row mt-1 mb-1">
            <div class="col-1.5 pr-2 pl-3">
                {{_.get(workInfo, 'workTime.code') || ''}}
            </div>
            <div class="col pl-0">
                {{_.get(workInfo, 'workTime.name') || ''}}
            </div>
        </div>
    </div>


    <!-- B3_1 -->
    <div class="card card-label" v-if="c9">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS06_15" | i18n }}</span>
        </div>
    </div>
    <!-- B3_2 -->
    <div v-if="c9">
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pl-3 pr-1 text-left">
                {{workHours1.start || ''}}
            </div>
            <div v-show="workHours1.start != '' && workHours1.end != ''" class="col-0 pl-0 pr-0 text-center">
                ～
            </div>
            <div class="col-9 text-left pl-1">
                 {{workHours1.end || ''}}
            </div>
        </div>
    </div>


    <!-- B4_1 -->
    <div class="card card-label" v-if="c10">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS06_16" | i18n }}</span>
        </div>
    </div>
    <!-- B4_2 -->
    <div v-if="c10">
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pl-3 pr-1 text-left">
                {{workHours2.start}}
            </div>
            <div v-show="workHours2.start != '' && workHours2.end != ''" class="col-0 pl-0 pr-0 text-center">
                ～
            </div>
            <div class="col-9 text-left pl-1">
                {{workHours2.end}}
            </div>
        </div>
    </div>


    <!--B5_1-->
    <div class="card card-label" v-if="c12">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS06_16" | i18n }}</span>
        </div>
    </div>
    <div v-if="c12" class="row mt-2">
        <div class="col pl-3">{{ "KAFS06_18" | i18n([$dt.timept(B5_2)]) }}</div>
        <div class="col pl-3">{{ "KAFS06_19" | i18n([$dt.timept(B5_3)]) }}</div>
    </div>
    <!--B5_4-->
    <div v-if="c13" class="text-left mt-2 pl-3">{{ "KAFS06_42" | i18n([$dt.timept(B5_4)]) }}</div>
    <!--B5_5-->
    <div v-if="c14" class="text-left mt-2 pl-3">{{ "KAFS06_43" | i18n([$dt.timept(B5_5)]) }}</div>
    <!--B5_6-->
    <div v-if="c15" class="text-left mt-2 pl-3">{{ "KAFS06_44" | i18n([$dt.timept(B5_6)]) }}</div>
    <!--B5_7-->
    <div v-if="c16" class="text-left mt-2 pl-3">{{ "KAFS06_45" | i18n([$dt.timept(B5_7)]) }}</div>
    <!--B5_8-->
    <div v-if="c17" class="text-left my-2 pl-3">{{ "KAFS06_46" | i18n([$dt.timept(B5_8)]) }}</div>


    <!--B6_1-->
    <div class="card card-label" v-if="c18">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS06_23" | i18n }}</span>
        </div>
    </div>

    <div v-if="c18" class="mt-2">
        <!--B6_2-->
        <div class="textSize">
            {{'KAFS06_24' | i18n}}
        </div>
        <!--B6_3-->
        <div class="pl-2">
            {{B6_3}}
        </div>
    </div>

    <div v-if="c19" class="mt-2">
        <!--B6_4-->
        <div class="textSize">
            {{'KAFS06_47' | i18n}}
        </div>
        <!--B6_5-->
        <div class="pl-2">
            {{B6_5}}
        </div>
    </div>

    <div v-if="c20" class="mt-2">
        <!--B6_6-->
        <div class="textSize">
            {{'KAFS06_26' | i18n}}
        </div>
        <!--B6_7-->
        <div class="pl-2">
            {{B6_7}}
        </div>
    </div>


    <!--B7_1-->
    <div class="card card-label" v-if="c21">
        <div class="card-header uk-bg-accordion mt-2 headerDiv mt-2">
            <span class="textPosition">{{ "KAFS06_48" | i18n }}</span>
        </div>
    </div>
    <div v-if="c21" class="row">
        <table class="table">
            <thead>
                <tr>
                    <td class="text-center" scope="col">{{'KAFS06_29' | i18n}}</td>
                    <td class="text-center" scope="col">{{'KAFS06_30' | i18n}}</td>
                    <td class="text-center" scope="col">{{'KAFS06_31' | i18n}}</td>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(item, index) in B7"
                v-bind:key="index"
                :value="index"
                >
                    <td class="text-center">{{$dt(new Date(item.outbreakDay), 'YYYY/MM/DD(dd)')}}</td>
                    <td class="text-center">{{$dt(new Date(item.dateOfUse), 'YYYY/MM/DD(dd)')}}</td>
                    <td class="text-center">{{item.dayNumberUsed}}</td>
                </tr>  
            </tbody>
        </table>
    </div>

    <!--B8_1-->
    <div class="card card-label" v-if="c22">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS06_49" | i18n }}</span>
        </div>
    </div>

    <div v-if="c22" class="row">
        <table class="table">
            <thead>
                <tr>
                    <td class="text-center" scope="col">{{'KAFS06_34' | i18n}}</td>
                    <td class="text-center" scope="col">{{'KAFS06_35' | i18n}}</td>
                    <td class="text-center" scope="col">{{'KAFS06_31' | i18n}}</td>
                </tr>
            </thead>
            <tbody>
                <tr
                v-for="(item, index) in B8"
                v-bind:key="index"
                :value="index"
                >
                    <td class="text-center">{{$dt(new Date(item.outbreakDay), 'YYYY/MM/DD(dd)')}}</td>
                    <td class="text-center">{{$dt(new Date(item.dateOfUse), 'YYYY/MM/DD(dd)')}}</td>
                    <td class="text-center">{{item.dayNumberUsed}}</td>
                </tr>  
            </tbody>
        </table>
    </div>

</div>
</template>