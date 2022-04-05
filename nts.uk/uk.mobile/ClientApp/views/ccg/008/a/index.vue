<template>
  <div class="ccg008a">
    <!-- top aleart -->
    <div class="section top-alert-wrapper" v-if="serverAlert && serverAlert.visible">
      <div class="accordion">
        <div class="card bg-danger top-alert uk-text-danger">
          <div class="card-header">
            <h2 class="mb-0">
              <button class="btn btn-link uk-text-danger">
                <i class="fa fa-exclamation-circle" aria-hidden="true" ></i>
                {{ 'CCGS08_2' | i18n }}
              </button>
            </h2>
          </div>
          <div class="collapse">
            <div class="card-body">
              <ul>
                <li v-if="serverAlert.system.visible">
                  <span v-html="serverAlert.system.usageStopMessage">  </span>
                </li>
                <li v-if="serverAlert.company.visible">
                  <span v-html="serverAlert.company.usageStopMessage"></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End top alert -->

    <!-- Notice -->
    <div class="section notice-wrapper" v-show="displayNotifis && displayNotifis.length > 0">
      <nts-label v-bind:constraint="labelConstraint">{{ 'CCGS08_3' | i18n}}</nts-label>
      <div class="content" v-show="displayNotifisVissible">
        <template v-for="notice in displayNotifis" >
          <button
            type="button"
            class="btn btn-secondary btn-selection mb-2"
            v-on:click="openModal(notice.title)"
            :key="notice.title"
            v-if="notice.visible"
          >
            <i class="fa fa-info-circle color-attendance uk-text-medium-blue" aria-hidden="true"></i>
            {{notice.title | i18n}} 
          </button>
        </template>
      </div>
      <div class="pl-3 pt-2" v-show="!displayNotifisVissible">{{ 'CCGS08_35' | i18n }}</div>
    </div>
    <!-- End notice -->

    <!-- Overtime -->
    <div id="test" class="section overtime-wrapper" v-if="overtime.visible">
      <nts-label v-bind:constraint="labelConstraint">{{ 'CCGS08_5' | i18n}}</nts-label>
      <div class="row content" v-show="false">
        <div class="date-label">
          <label for>{{'CCGS08_6' | i18n}}</label>
        </div>
        <div class="col-8">
          <nts-year-month
            v-model="model.date"
            v-bind:showTitle="false"
            v-bind:constraint="{required: true}"
          />
        </div>
      </div>
      <div class="overtime-info">
        <div class="error-message color-danger" v-if="false">{{overtime.errorMessage}}</div>
        <nts-ccgs008-table :configs="overtime.tableConfigs" />
        <div class="text-center mt-n2">
          <button type="button" v-bind:class="{'btn-outline-info': showFull, 'btn-info': !showFull}"  v-show="agreementButton"
            style="width: 150px" v-on:click="reverseShowAgreement" class="shadow-none btn rounded-pill">
            <span v-if="!showFull">
              <i class="fas fa-angle-double-down"></i> 
              {{ 'CCGS08_33' | i18n }}
            </span>
            <span v-if="showFull">
              <i class="fas fa-angle-double-up"></i> 
              {{ 'CCGS08_34' | i18n }}
            </span>
          </button>
        </div>
      </div>
    </div>
    <!-- End overtime -->

    <!-- Time status -->
    <div class="section time-status-wrapper" v-if="timeStatus.visible">
      <nts-label v-bind:constraint="labelConstraint">{{ 'CCGS08_4' | i18n}}</nts-label>
      <div class="content">
        <nts-ccgs008-table :configs="timeStatus.tableConfigs" />
      </div>
    </div>
    <!-- End time status -->   
  </div>
</template>