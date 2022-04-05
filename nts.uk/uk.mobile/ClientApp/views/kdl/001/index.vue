<template>
  <div class="kdl001">

    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
          <i class="fas fa-angle-double-left mr-1" v-on:click="back()"></i>
          <span>{{ 'KDLS01_3' | i18n }}</span>
        </h4>
      </div>
      <div class="uk-bg-headline p-2 pb-1">
        <label>{{ 'KDLS01_2' | i18n }}</label>
        <nts-time-range-search v-on:search="searchInList" />
      </div>
    </div>

    <ul class="list-group list-group-single-select mb-5">
      <li
        class="list-group-item"
        v-for="(item, i) of wkDisplayTimes"
        v-bind:key="i"
        v-bind:class="{ selected: selectedWorkTime == item }"
        v-on:click="chooseWorkTime(item)"
        v-bind:id="item.code"
      >
        <div class="row">
          <div class="col-2">{{item.code}}</div>
          <div class="col-10">{{item.name}}</div>
        </div>
        <div class="pl-2 sub-text">
          <div class="uk-text-dark-gray">{{item.workTime1}}</div>
          <div class="uk-text-dark-gray">{{item.workTime2}}</div>
          <div class="uk-text-dark-gray">{{item.remark}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>