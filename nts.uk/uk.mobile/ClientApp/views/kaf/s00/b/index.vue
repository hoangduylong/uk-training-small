<template>
<div class="kafs00b">
    <div v-if="params.mode==ScreenMode.DETAIL">
        <div class="card card-label">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n2">
                    {{'KAFS00_7' | i18n}}</v-label>
            </div>
            <div class="card-body mb-2">
                <span>{{ params.detailModeContent.employeeName | i18n }}</span> 
            </div>
        </div>   
        <div class="card card-label" v-if="displayPrePost">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS00_8' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body mb-2">
                <span>{{ prePostAtrName | i18n }}</span> 
            </div>
        </div>
        <div class="card card-label">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS00_9' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body mb-2">
                <span v-if="params.detailModeContent.startDate == params.detailModeContent.endDate">
                    {{ params.detailModeContent.startDate | i18n }}
                </span> 
                <span v-else>
                    {{ params.detailModeContent.startDate | i18n }} ~ {{ params.detailModeContent.endDate | i18n }}
                </span> 
            </div>
        </div>  
    </div>
    <div v-if="params.mode==ScreenMode.NEW">
        <div class="card card-label" v-if="displayPrePost">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS00_8' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body">
                <div style="width: 100%" id="prePostSelect">
                    <nts-switchbox v-for="(option, optionIndex) in prePostResource" v-bind:key="optionIndex"
                        v-bind:disabled="!enablePrePost"
                        v-model="prePostAtr"
                        v-bind:value="option.code">
                            {{option.text | i18n}}
                    </nts-switchbox>
                </div>
                <v-errors v-model="$errors.prePostAtr" class="d-block mt-n2 mb-3" />
            </div>
        </div>    
        <div class="card card-label">
            <div class="card-header uk-bg-accordion" style="align-items: center">
                <v-label class="border-0 pl-0 my-n3">
                    {{'KAFS00_9' | i18n}}</v-label>
                <span class="badge badge-warning" style="height: 30%">必須</span>
            </div>
            <div class="card-body">
                <div style="width: 100%" v-if="displayMultiDaySwitch">
                    <nts-switchbox v-for="(option, optionIndex) in dateSwitchResource" v-bind:key="optionIndex"
                        v-model="params.newModeContent.initSelectMultiDay" 
                        v-bind:value="option.code">
                            {{option.text | i18n}}
                    </nts-switchbox>
                </div>
                <div v-if="params.newModeContent.initSelectMultiDay">
                    <nts-date-range-input v-model="dateRange" />
                </div>
                <div v-if="!params.newModeContent.initSelectMultiDay">
                    <nts-date-input v-model="date"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>