<template>
  <div class="cmms45b mb-5">
    <!-- Filter -->
    <div v-if="!modeAppr" class="accordion accordion-mn3">
      <div class="card border border-left-0 border-right-0">
        <div class="card-header uk-bg-accordion">
          <button class="btn btn-link" type="button">
            <i class="fas fa-search"></i>
            {{ 'CMMS45_3' | i18n}}
          </button>
        </div>
        <div class="collapse">
          <div class="card-body">
            <!-- Date Range -->
            <nts-date-range-input name="CMMS45_4" v-model="dateRange" />
            <!-- Check box -->
            <v-label v-bind:constraint="{required: true}">{{ 'CMMS45_47' | i18n }}</v-label>
            <div class="row pl-3">
              <nts-checkbox class="col-4" v-model="checkeds" v-bind:value="1">{{'CMMS45_7' | i18n}}</nts-checkbox>
              <nts-checkbox class="col-4" v-model="checkeds" v-bind:value="5">{{'CMMS45_36' | i18n}}</nts-checkbox>
            </div>
            <div class="row pl-3">
              <nts-checkbox class="col-4" v-model="checkeds" v-bind:value="2">{{'CMMS45_8' | i18n}}</nts-checkbox>
              <nts-checkbox class="col-4" v-model="checkeds" v-bind:value="3">{{'CMMS45_11' | i18n}}</nts-checkbox>
              <!-- <nts-checkbox class="col-4" v-model="checkeds" v-bind:value="6">{{'CMMS45_10' | i18n}}</nts-checkbox> -->
            </div>
            <div class="row pl-3">
              <nts-checkbox v-model="checkeds" v-bind:value="4" >{{'CMMS45_53' | i18n}}</nts-checkbox>
            </div>
            <v-errors v-model="$errors.checkeds" name="" class="d-block m-0 p-0 mb-2" />
            <button class="btn btn-success btn-block" v-on:click="filterAppr">{{'CMMS45_6' | i18n}}</button>
          </div>
        </div>
      </div>
    </div>
    <!-- AppType -->
    <nts-dropdown class="mt-3"
      v-if="!modeAppr"
      v-model="selectedValue"
      name="CMMS45_5"
      v-bind:columns="{title: 'col-3 col-md-3 pr-0', input: 'col-9 col-md-5 pl-2 p_dropdown'}">
      <option v-for="item in lstAppType" v-bind:key="item.code" :value="item.code">{{item.appName}}</option>
    </nts-dropdown>
    <!-- Button Change Mode B2_2-->
    <button v-if="filterByAppType.length > 0" v-bind:class = "btnChangeMode.class" class="btn-block p-1 m-1 mt-2"  v-on:click="modeAppr = !modeAppr">{{btnChangeMode.name | i18n}}</button>
    <!-- List App -->
    <div class="accordion accordion-mn3 pt-2">
        <div
            class="card show border border-left-0 border-right-0"
            v-for="(emp, index) in filterByAppType"
            v-bind:key="index"
            :value="emp.empCD"
        >
        <!-- Emp Name -->
        <div class="card-header uk-bg-papaya-whip">
          <button class="btn btn-link" type="button">{{emp.empName}}</button>
        </div>
        <!-- List App by Emp -->
        <div class="collapse">
          <div class="card-body py-0">
            <ul class="list-group list-group-flush"  v-bind:class="{'list-group-selection': !modeAppr, 'ml-n3 mr-n3': modeAppr}" >
              <li
                class="list-group-item mb-0"
                v-for="(item, index) in emp.lstApp"
                v-bind:key="index"
                :value="item.id"
                v-on:click="() => goToDetail(item)"
              >
                <div v-if="!isLinkApp(item.opComplementLeaveApp) && (item.opAppStartDate == item.opAppEndDate)" class="row">
                  <!-- Check box -->
                  <div v-if="modeAppr" class="col-1 p-0 align-middle text-center pt-2">
                    <div v-if="item.appStatusNo == 5">
                    <input v-model="lstAppr" type="checkbox" v-bind:value="item.id" class="input-control" />
                    </div>
                  </div>
                  <!-- Reflect status -->
                  <div class="col-3 pl-2 pr-0">
                    <span v-bind:class="item.reflectCssAppr" class="p-2 d-block">{{item.reflectStatus | i18n}}</span>
                  </div>
                  <!-- App content -->


                  <div class="p-0" v-bind:class="{ 'col-9': !modeAppr, 'col-8': modeAppr }">
                    <div
                      v-bind:class="item.appDateCss"
                      class="pl-2 pt-2 pb-2 d-inline-block pr-2"
                    >{{ item.appDate | date('MM/DD (ddd)')}}</div>
                    <div class="pt-2 pb-2 d-inline-block">{{appContent(item.appName, item.prePostAtr)}}</div>
                  </div>
                </div>


                <div v-if="isLinkApp(item.opComplementLeaveApp)" class="row">
                  <!-- Check box -->
                  <div v-if="modeAppr" class="col-1 p-0 align-middle text-center pt-2">
                    <div v-if="item.appStatusNo == 5">
                    <input v-model="lstAppr" type="checkbox" v-bind:value="item.id" class="input-control" />
                    </div>
                  </div>
                  <!-- Reflect status -->
                  <div class="col-3 pl-2 pr-0 pt-3">
                    <span v-bind:class="item.reflectCssAppr" class="p-2 d-block">{{item.reflectStatus | i18n}}</span>
                  </div>
                  <!-- App content -->


                  <div class="p-0 d-flex" v-bind:class="{ 'col-9': !modeAppr, 'col-8': modeAppr }">
                    <div v-if="item.opComplementLeaveApp.complementLeaveFlg == 0" class="d-inline-block">
                      <div
                        v-bind:class="item.linkAppDateCss"
                        class="pl-2 pt-2 pb-2 d-block pr-2"
                      >{{ item.opComplementLeaveApp.linkAppDate | date('MM/DD (ddd)')}}</div>
                      <div
                        v-bind:class="item.appDateCss"
                        class="pl-2 pt-2 pb-2 d-block pr-2"
                      >{{ item.appDate | date('MM/DD (ddd)')}}</div>   
                    </div>


                    <div v-if="item.opComplementLeaveApp.complementLeaveFlg == 1" class="d-inline-block">
                      <div
                        v-bind:class="item.appDateCss"
                        class="pl-2 pt-2 pb-2 d-block pr-2"
                      >{{ item.appDate | date('MM/DD (ddd)')}}</div>
                      <div
                        v-bind:class="item.linkAppDateCss"
                        class="pl-2 pt-2 pb-2 d-block pr-2"
                      >{{ item.opComplementLeaveApp.linkAppDate | date('MM/DD (ddd)')}}</div>   
                    </div>

                    <div class="pt-4 pb-2 d-inline-block">{{appContent(item.appName, item.prePostAtr)}}</div>
                  </div>
                </div>


                <div v-if="!isLinkApp(item.opComplementLeaveApp) && (item.opAppStartDate != item.opAppEndDate)" class="row">
                  <!-- Check box -->
                  <div v-if="modeAppr" class="col-1 p-0 align-middle text-center pt-2">
                    <div v-if="item.appStatusNo == 5">
                    <input v-model="lstAppr" type="checkbox" v-bind:value="item.id" class="input-control" />
                    </div>
                  </div>
                  <!-- Reflect status -->
                  <div class="col-3 pl-2 pr-0">
                    <span v-bind:class="item.reflectCssAppr" class="p-2 d-block">{{item.reflectStatus | i18n}}</span>
                  </div>
                  <!-- App content -->


                  <div class="p-0" v-bind:class="{ 'col-9': !modeAppr, 'col-8': modeAppr }">
                    <div
                      v-bind:class="item.opAppStartDateCss"
                      class="pl-2 pt-2 pb-2 d-inline-block pr-2"
                    >{{ item.opAppStartDate | date('MM/DD (ddd)')}}</div>
                    <div class="pt-2 pb-2 d-inline-block">{{appContent(item.appName, item.prePostAtr)}}</div>
                    <div
                      v-bind:class="item.opAppEndDateCss"
                      class="pl-2 pt-2 pb-2 d-block pr-2"
                    >～{{ item.opAppEndDate | date('MM/DD (ddd)')}}</div>
                  </div>
                </div>





              </li>
                <div v-if="emp.displayB52" v-html="getHtmlPer()" class="uk-text-red p-3" >
                </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Button Approve B2_4 -->
    <div class="fixed-bottom px-2 py-1" v-if="modeAppr" v-bind:class="{'bg-white': disableB24}">
      <button v-bind:disabled ="disableB24" class = 'btn btn-primary btn-block' 
        v-on:click="processAppr" >{{lstAppr.length == 0 ? 'CMMS45_56' : 'CMMS45_57' | i18n(`${lstAppr.length}`)}}</button>
    </div>
    <div v-if="displayB513 == 1" class="py-3" v-html="getHtmlNone()">
    </div>
    <div v-if="displayB513 == 2" class="uk-text-red py-3" v-html="getHtmlAll()">
    </div>
    <to-top class="to-top"/>
  </div>
</template>