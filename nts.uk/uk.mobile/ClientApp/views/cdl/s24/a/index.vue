<template>
  <div class="modal-body p-0">
    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white" v-on:click="$close('back')">       
            <i class="fas fa-angle-double-left mr-1" ></i>
            <span>{{ 'CDLS24_2' | i18n }}</span>        
        </h4>
      </div>
      <div class="uk-bg-headline p-2 pb-1">
        <label>{{ 'CDLS24_3' | i18n }}</label>
        <nts-text-search class="bg-grey-100" placeholder="CDLS24_4" v-model="searchText" v-on:search="searchList"/>
      </div>
    </div>
    
    <div>
      <ul class="list-group list-group-single-select">
        <li class="list-group-item " v-for="(item, k) of data" :class="item.code == params.selectedCode ? 'active' : ''" v-on:click="$close(item)">
            <div class="mr-3 text-truncate"><span v-if="item.code != ''">{{item.code}} &nbsp;&nbsp;&nbsp; {{item.name}}</span></div>
        </li>
      </ul>
    </div>
  </div>
</template>