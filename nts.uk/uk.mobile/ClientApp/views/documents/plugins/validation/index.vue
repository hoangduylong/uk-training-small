<template>
    <div class="documentspluginsvalidation">
        <h5>1. {{'sample' | i18n}}</h5>
        <div class="row">
            <div class="col-md-4">
                <nts-text-editor name="Text" v-model="textValue" />
                <nts-number-editor name="Number" v-model="numberValue" />
                <div v-for="(item, k) of items" v-bind:key="k">
                    <nts-text-editor
                        name="Name"
                        v-model="items[k].name"
                        v-bind:record-id="k"
                    />
                    <nts-text-editor
                        name="Age"
                        v-model="items[k].age"
                        v-bind:record-id="k"
                    />
                </div>
            </div>
        </div>
        <markdown />
    </div>
</template>