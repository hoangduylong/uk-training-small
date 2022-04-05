<template>
    <div class="documentspluginsfilters">
        <h5>1. {{'sample' | i18n}}</h5>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'date' | i18n }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ new Date() | date }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'time_with_day' | i18n }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ -10 | timewd }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'time_point' | i18n }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ -10 | timept }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'time_duration' | i18n }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ -10 | timedr }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'year_month' | i18n }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ 201901 | yearmonth('YYYY - MM') }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'cmm045_15' | i18n(['start', 'end']) }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ 'cmm045_15' | i18n([$dt.timewd(0), $dt.timewd(720)]) }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'cmm045_15' | i18n(['start', 'end']) }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ 'cmm045_15' | i18n([$dt.timedr(0), $dt.timedr(720)]) }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'cmm045_15' | i18n(['start', 'end']) }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ 'cmm045_15' | i18n([$dt.timept(0), $dt.timept(720)]) }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'cmm045_15' | i18n(['start', 'end']) }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ 'cmm045_15' | i18n([$dt(daterange.start), $dt(daterange.end)]) }}
            </div>
        </div>
        <div class="row mb-2">
            <div class="col-6 col-md-3">
                <nts-label>{{ 'cmm045_15' | i18n(['start', 'end']) }}</nts-label>
            </div>
            <div class="col-6 col-md-4" style="line-height: 35px">
                {{ 'cmm045_15' | i18n([$dt.date(daterange.start), $dt.date(daterange.end)]) }}
            </div>
        </div>

        <markdown />
    </div>
</template>