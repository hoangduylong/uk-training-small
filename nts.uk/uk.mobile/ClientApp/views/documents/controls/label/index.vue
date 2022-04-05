<template>
<div class="documentscontrolslabel">
    <h5>1. {{'sample' | i18n}}</h5>
    <div class="group-sample">
        1.1 Don't show constraint
        <div class="row sample">
            <div class="col-md-4">
                <nts-label v-bind:constraint="{required: true}">{{'required_label' | i18n}}</nts-label>
            </div>
            <div class="col-md-4">
                <nts-label>{{'not_required_label' | i18n}}</nts-label>
            </div>
        </div>
    </div>

    <div class="group-sample">
        1.2 Show constraint
        <div class="row sample">
            <div class="col-md-4">
                <nts-label v-bind:constraint="{required: true, min: 100, max: 1000, valueType: 'Integer'}">{{'required_label' | i18n}}</nts-label>
            </div>
            <div class="col-md-4">
                <nts-label v-bind:constraint="{required: false, min: 100, max: 1000, valueType: 'Integer'}">{{'not_required_label' | i18n}}</nts-label>
            </div>
        </div>
    </div>

    <div class="group-sample">
        1.3 Show constraint inline
        <div class="row sample">
            <div class="col-md-4">
                <nts-label v-bind:constraint="{required: true, min: 100, max: 1000, valueType: 'Integer'}" class="control-label-inline">{{'required_label' | i18n}}</nts-label>
            </div>
            <div class="col-md-4">
                <nts-label v-bind:constraint="{required: false, min: 100, max: 1000, valueType: 'Integer'}" class="control-label-inline">{{'not_required_label' | i18n}}</nts-label>
            </div>
        </div>
    </div>

    <markdown />
</div>
</template>
