<template>
    <div class="cdl008test">
        <br>
        <nts-checkbox v-model="isReference" v-bind:value="1">Reference Range Narrow</nts-checkbox>
        <nts-checkbox v-model="isRequired" v-bind:value="1">CheckRequired</nts-checkbox>
        <nts-date-input v-model="date" name='DateItem'/>
        <nts-dropdown name="SystemType" v-model="selectedValue"><option :value="item.code" v-for="(item,k) in systemTypes" v-bind:key="k">{{item.code}} &nbsp;&nbsp;&nbsp;  {{item.text}}</option>
        </nts-dropdown>
        <nts-text-editor v-model="workPlaceId" name='workPlaceId'/>
        <button v-on:click="openDLRadio()" class="btn btn-secondary btn-block" @keydown.enter="$event.target.blur()">Radio</button>
        <button v-on:click="openDLCheckbox()" class="btn btn-secondary btn-block" @keydown.enter="$event.target.blur()">Checkbox</button>
        <div class="ml-2">
            <div class="row">Id: {{model.workplaceId}}</div>
            <div class="row"> Code: {{model.code}} </div>
            <div class="row"> Name: {{model.name}} </div>
        </div>
         <ul class="list-group mb-5">
            <li class="list-group-item" v-for="(item, i) in workPlaceOuts" v-bind:key="i">
            <div class="row">
                 <span>{{item.workplaceId}}     {{item.code}}       {{item.name}}</span>
            </div>
            </li>
        </ul>
    </div>
</template>