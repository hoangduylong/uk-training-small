<template>
<div class="kafs00a">
    <div class="accordion" style="margin-bottom: 10px;">
    <!-- 既に開きたいならshowを追加してください。 -->
        <div class="card" v-if="displayAppMsg">
            <div class="card-header uk-bg-accordion">
            <button class="btn btn-link" type="button">
                {{'KAFS00_1' | i18n}}
            </button>
            </div>
            <div class="collapse">
            <div class="card-body" v-html="appMsg"></div>
            </div>
        </div>
        <div class="card" v-if="displayAppMsgForCurrentMonth">
            <div class="card-header uk-bg-accordion">
            <button class="btn btn-link" type="button">
                {{'KAFS00_2' | i18n}}
            </button>
            </div>
            <div class="collapse">
            <div class="card-body">
                <!-- コンテンツ -->
                {{ appMsgForCurrentMonth | i18n }}
            </div>
            </div>
        </div>
        <div class="card" v-if="displayAppPeriod">
            <div class="card-header uk-bg-accordion">
            <button class="btn btn-link" type="button">
                {{'KAFS00_4' | i18n}}
            </button>
            </div>
            <div class="collapse">
            <div class="card-body">
                <!-- コンテンツ -->
                <div v-if="displayPreAppPeriod">{{ preAppPeriod | i18n }}</div>
                <div v-if="displayPostAppPeriod">{{ postAppPeriod | i18n }}</div>
            </div>
            </div>
        </div>
    </div>
</div>
</template>