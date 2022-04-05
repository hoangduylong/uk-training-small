<template>
  <div id="kdl002">
    <!-- <div class="modal-header">
      <a v-on:click="back()">
        <i class="fas fa-angle-double-left"></i>
        {{ 'KDLS02_4' | i18n }}
      </a>
    </div>
    <div class="uk-bg-headline title">
      <label>{{'KDLS02_2' | i18n}}</label>
      <div>
        <nts-text-search placeholder="勤務種類コード/勤務種類名称" v-on:search="searchInList"/>
      </div>
    </div>-->

    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
          <i class="fas fa-angle-double-left mr-1" v-on:click="back()"></i>
          <span>{{ 'KDLS02_4' | i18n }}</span>
        </h4>
      </div>
      <div class="uk-bg-headline p-2 pb-1">
        <label>{{'KDLS02_2' | i18n}}</label>
        <nts-text-search placeholder="勤務種類コード/勤務種類名称" v-on:search="searchInList" />
      </div>
    </div>

    <ul
      v-bind:class="params.isSelectWorkTime ? 'list-group list-group-selection' : 'list-group-single-select'"
      class="mb-5 list-group"
    >
      <li
        class="list-group-item"
        v-for="(item, i) of disPlaywkTypes"
        v-bind:key="i"
        v-on:click="chooseWorkType(item)"
        v-bind:class="{ selected: selectedWorkType == item }"
      >
        <div class="row">
          <div class="col-2">{{item.workTypeCode}}</div>
          <div class="col-10">{{item.name}}</div>
        </div>
        <div class="pl-2 sub-text">
          <div class="uk-text-dark-gray">{{item.memo}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>