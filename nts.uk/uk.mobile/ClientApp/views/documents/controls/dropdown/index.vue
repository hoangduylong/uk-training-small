<template>
    <div class="documentscontrolsdropdown">
        <h5>1. {{'sample' | i18n}}</h5>
        <div class="row">
            <div class="col-md-4">
                <nts-dropdown
                        v-model="selectedValue"
                        name='DropDown Item'>
                        <option v-for="(item, k) in dropdownList" v-bind:key="k" :value="item.code">
                            {{item.code}} &nbsp;&nbsp;&nbsp;  {{item.text}}
                        </option>
                </nts-dropdown>
            </div>
        </div>

        <markdown />
    </div>
</template>