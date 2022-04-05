<template>
  <div class="cmms45a">
    <!-- A1_1: accordion search -->
    <div class="accordion accordion-mn3">
      <div class="card border border-left-0 border-right-0">
        <div class="card-header uk-bg-accordion">
          <button class="btn btn-link" type="button">
            <i class="fas fa-search"></i>
            {{ 'CMMS45_3' | i18n}}
          </button>
        </div>
        <div class="collapse">
          <div class="card-body">
            <div>
                <nts-date-range-input name="CMMS45_4" v-model="dateRange" />
                <button class="btn btn-success btn-block" v-on:click="filter">{{'CMMS45_6' | i18n}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- A2_1: dropdown list - appType -->
    <nts-dropdown class="mt-3"
      v-model="selectedValue"
      name="CMMS45_5"
      v-bind:columns="{title: 'col-3 col-md-3 pr-0', input: 'col-9 col-md-5 pl-2 p_dropdown'}">
      <option v-for="item in lstAppType" v-bind:key="item.code" :value="item.code">{{item.appName}}</option>
    </nts-dropdown>

    <!-- A3_1: list Application -->
    <ul class="list-group list-group-selection list-group-flush">
      <li  class="list-group-item" v-for="(item, index) in filterByAppType" v-bind:key="index" :value="item.id" v-on:click="goToDetail(item.id)">
          <div v-if="!isLinkApp(item.opComplementLeaveApp) && (item.opAppStartDate == item.opAppEndDate)" class="row">

              <div class="col-3 pl-2 pr-0">
                  <span v-bind:class = "item.reflectCss" class="p-2 d-block">{{item.reflectStatus | i18n}}</span>
              </div>
              <div class="col-9 p-0">
                  <div v-bind:class = "item.appDateCss" class="pl-2 pt-2 pb-2 d-inline-block pr-2">{{ item.appDate | date('MM/DD (ddd)')}}</div>
                  <div class="pt-2 pb-2 d-inline-block">{{appContent(item.appName, item.prePostAtr)}}</div>
              </div>
          </div>

          <div v-if="isLinkApp(item.opComplementLeaveApp)" class="row">

              <div class="col-3 pl-2 pr-0 pt-3">
                  <span v-bind:class = "item.reflectCss" class="p-2 d-block">{{item.reflectStatus | i18n}}</span>
              </div>
              <div class="col-9 p-0 d-flex">
                  <div v-if="item.opComplementLeaveApp.complementLeaveFlg == 0" class="d-inline-block">
                    <div v-bind:class = "item.linkAppDateCss" class="pl-2 pt-2 pb-2 d-block pr-2">{{ item.opComplementLeaveApp.linkAppDate | date('MM/DD (ddd)')}}</div>
                    <div v-bind:class = "item.appDateCss" class="pl-2 pt-2 pb-2 d-block pr-2">{{ item.appDate | date('MM/DD (ddd)')}}</div>

                  </div>

                  <div v-if="item.opComplementLeaveApp.complementLeaveFlg == 1" class="d-inline-block">
                    <div v-bind:class = "item.appDateCss" class="pl-2 pt-2 pb-2 d-block pr-2">{{ item.appDate | date('MM/DD (ddd)')}}</div>
                    <div v-bind:class = "item.linkAppDateCss" class="pl-2 pt-2 pb-2 d-block pr-2">{{ item.opComplementLeaveApp.linkAppDate | date('MM/DD (ddd)')}}</div>

                  </div>

                  <div class="pt-4 pb-2 d-inline-block">{{appContent(item.appName, item.prePostAtr)}}</div>
              </div>


          </div>

          <div v-if="!isLinkApp(item.opComplementLeaveApp) && (item.opAppStartDate != item.opAppEndDate)" class="row">

              <div class="col-3 pl-2 pr-0">
                  <span v-bind:class = "item.reflectCss" class="p-2 d-block">{{item.reflectStatus | i18n}}</span>
              </div>
              <div class="col-9 p-0">
                  <div v-bind:class = "item.opAppStartDateCss" class="pl-2 pt-2 pb-2 d-inline-block pr-2">{{ item.opAppStartDate | date('MM/DD (ddd)')}}</div>
                  <div class="pt-2 pb-2 d-inline-block">{{appContent(item.appName, item.prePostAtr)}}</div>
                  <div v-bind:class = "item.opAppEndDateCss" class="pl-2 pt-2 pb-2 d-block pr-2">～{{ item.opAppEndDate | date('MM/DD (ddd)')}}</div>
              </div>
          </div>


      </li>
    </ul>
    <div v-if="displayA512 == 1" class="py-3" v-html="getHtmlNone()"></div>
    <div v-if="displayA512 == 2" class="uk-text-red py-3" v-html="getHtmlAll()"></div>
    <div style="height: 50px"></div>
    <!-- A4_1: To Top -->
    <to-top />
  </div>
</template>