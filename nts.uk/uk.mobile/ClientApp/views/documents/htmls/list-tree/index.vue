<template>
  <div class="documentshtmlslist-tree">
    <h5>1. {{'sample' | i18n}}</h5>
    <div class="btn-group btn-group-toggle d-flex mb-3">
      <label class="btn btn-primary">
        <input type="radio" name="options" v-model="single" v-bind:value="true">
        Radio mode
      </label>
      <label class="btn btn-primary">
        <input type="radio" name="options" v-model="single" v-bind:value="false">
        Checkbox mode
      </label>
    </div>
    <div class="btn-group mb-2 d-flex">
      <button class="btn btn-secondary" v-on:click="addTopItem">Add top</button>
      <button class="btn btn-secondary" v-on:click="addBottomItem">Add bottom</button>
      <button class="btn btn-secondary" v-on:click="removeTopItem">Remove top</button>
      <button class="btn btn-secondary" v-on:click="removeBottomItem">Remove bottom</button>
    </div>
    <ul class="list-group list-group-tree">
      <li class="list-group-item" v-for="(item, k) in flatten" v-bind:key="k" v-tree="item" v-bind:single="single" v-on:click="selected = item" v-bind:class="{ 'active': single ? item === selected : selecteds.indexOf(item) > -1 }">
        <span>{{item.code}} {{item.name}}</span>
        <template v-if="single">
            <input class="selection" type="radio" v-model="selected" v-bind:value="item">
        </template>
        <template v-else>
            <input class="selection" type="checkbox" v-model="selecteds" v-bind:value="item">
        </template>
      </li>
    </ul>
    <h6 class="mt-2">{{'selected_value' | i18n}}</h6>
    <template v-if="single">
        <ul class="list-group mt-2 mb-2">
            <li class="list-group-item p-1">{{selected.name}}</li>
        </ul>
    </template>
    <template v-else>
        <ul class="list-group mt-2 mb-2">
            <li class="list-group-item p-1" v-for="(item, k) in selecteds" v-bind:key="k">{{item.name}}</li>
        </ul>
    </template>
    <hr />
    <markdown />
  </div>
</template>