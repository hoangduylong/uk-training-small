<template>
  <div class="cdl008a modal-body p-0">
    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white" v-on:click="back()">
          
            <i class="fas fa-angle-double-left mr-1" ></i>
            <span>{{ 'CDLS08_2' | i18n }}</span>
          
        </h4>
      </div>
      <div class="uk-bg-headline p-2 pb-1">
        <label>{{ 'CDLS08_1' | i18n }}</label>
        <nts-text-search class="bg-grey-100" placeholder="CDLS08_3" v-on:search="searchList"/>
      </div>
    </div>
    <div>
      <ul class="list-group list-group-tree list-group-xs">
        <li class="list-group-item py-1" v-for="(item, k) in flatten" 
            v-bind:key="k" 
            v-tree="item" 
            v-bind:single="single"
            v-on:click="closeRadioDialog(item)" 
            v-bind:class="activeClass(item)" >
          <span class="d-block small" v-on:click='checkMulti(item)'>{{item.code}}</span>
          <span class="d-block" v-on:click='checkMulti(item)'>{{item.name}}</span>
          <nts-radio v-if="single" class="selection select" v-model="selected" v-bind:value="item.workplaceId"></nts-radio>
          <nts-checkbox v-else class="selection select" v-model="selected" v-bind:value="item.workplaceId"></nts-checkbox>
        </li>
      </ul>
    </div>
    <input v-show="false" type="text" >
    <div v-if="params.startMode" class="modal-footer">
      <input type="button" v-on:click="closeDialog()" class="decision" v-bind:value="'CDLS08_4' | i18n " />
    </div>
  </div>
</template>