<template>
  <div class="kafs05step2">
    <!-- top-->
    <div>
      <kafs00-a
        v-if="$appContext.kaf000_A_Params != null"
        v-bind:params="$appContext.kaf000_A_Params"
      />
      <div class="accordion mb-2" v-if="$appContext.overTimeWorkHoursDto != null">
          <div class="card" v-if="true">
            <div class="card-header uk-bg-accordion">
              <button class="btn btn-link" type="button">
                  {{'KAFS05_41' | i18n}}
              </button>
            </div>
            <div class="collapse">
              <div class="card-body">
                  <kafs00subp2 v-bind:params="$appContext.overTimeWorkHoursDto" />      
              </div>
            </div>
          </div>
      </div>
    </div>

    <div>
        <div class="border border-warning rounded p-1 mt-2 alarm-message" role="alert" style="display:block;"
            v-if="isMsg_1557 || isMsg_1556">
            <div v-if="isMsg_1557" style="display:flex;">
                <fa-font icon="exclamation-triangle" class="text-danger m-2" />
                <span style="align-self:center">{{ 'Msg_1557' | i18n($appContext.date) }}</span>
            </div>
            <div v-if="isMsg_1556" style="display:flex;">
                <fa-font icon="exclamation-triangle" class="text-danger m-2" />
                <span style="align-self:center">{{ 'Msg_1556' | i18n($dt($appContext.date)) }}</span>
            </div>
        </div>
    </div>


    <!-- A2_B1 -->
    <div class="card card-label">
      <!--A2_B1_1-->
      <div class="card-header uk-bg-accordion mt-2">
        <span>{{ "KAFS05_70" | i18n }}</span>
        <span class="badge badge-warning">必須</span>
      </div>
      <!--A2_B1_5-->
      <div
       v-if="!$valid || !$appContext.isValidateAll" 
      class="card bg-danger top-alert uk-text-danger topError mt-2"
      >
        <button class="btn btn-link uk-text-danger">
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
          {{ "Msg_1562" | i18n }}
        </button>
      </div>
      <!--A2_B1_2-->
      <div v-for="(item, index) in overTimes" v-bind:key="index" :value="index">
        <div v-show="item.visible" class="card-body">
          <div class="row mt-3">
            <div class="col-4 textSize">{{ item.title }}</div>
            <div class="col-8.5">
              <div class="row mt-0">
                  <div v-show="$appContext.c4_1" class="col-6">
                      <kafs00subp1 v-bind:params="item.preApp" />
                  </div>
                  <div v-show="$appContext.c4_1" class="col-6">
                      <kafs00subp1 v-bind:params="item.actualApp" />
                  </div>
              </div>
              
            </div>
            
          </div>
          <div v-show="item.visible" class="card-body">
            <nts-time-editor
              v-model="overTimes[index].applicationTime"
              name=""
              v-bind:record-id="index"
              v-bind:disabled="!$appContext.c3_disable"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- A2_B2 -->

    <div v-if="$appContext.c16" class="card card-label">
      <!-- A2_B2_1 -->
      <div class="card-header uk-bg-accordion mt-2">
        <span>{{ "KAFS05_73" | i18n }}</span>
        <span class="badge badge-warning">必須</span>
      </div>
      <div
        v-for="(item, index) in holidayTimes"
        v-bind:key="index"
        :value="index"
      >
        <div v-show="item.visible" class="card-body">
          <div class="row mt-3">
            <div class="col-4 textSize">{{ item.title }}</div>
            <div class="col-8.5">
              <div class="row mt-0">
                  <div v-show="$appContext.c4_1" class="col-6">
                      <kafs00subp1 v-bind:params="item.preApp" />
                  </div>
                  <div v-show="$appContext.c4_1" class="col-6">
                      <kafs00subp1 v-bind:params="item.actualApp" />
                  </div>
              </div>
              
            </div>
            
          </div>
          <div class="card-body">
            <nts-time-editor
              v-model="holidayTimes[index].applicationTime"
              name=""
              v-bind:record-id="index"
              v-bind:disabled="!$appContext.c3_disable"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <kafs00-c
        v-if="$appContext.kaf000_C_Params != null"
        v-bind:params="$appContext.kaf000_C_Params"
        v-on:kaf000CChangeReasonCD="$appContext.kaf000CChangeReasonCD"
        v-on:kaf000CChangeAppReason="$appContext.kaf000CChangeAppReason"
      />
    </div>

    <!--A2_B5-->

    <div class="card card-label" v-if="$appContext.c12">
        <!--A2_B5_1-->
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n1" v-bind:constraint="validations.DivergenceReason">
                {{'KAFS05_78' | i18n(reason1.title)}}</v-label>
            <span class="badge badge-info">任意</span>
        </div>
        <div class="card-body">
            <!--A2_B5_2-->
            <div v-if="$appContext.c13">
                  <div class="mb-1">
                        <span class="small-header">{{'KAFS05_79' | i18n(reason1.title)}}</span>
                  </div>
                  <div>
                        <nts-dropdown v-model="reason1.selectedValue">
                            <option v-for="(item, index) in reason1.dropdownList" :key="index" :value="item.code">
                                {{item.text}}
                            </option>
                        </nts-dropdown>
                  </div>
            </div>
            <!--A2_B5_1-->
            <div v-if="$appContext.c14">
                  <div class="mb-1">
                        <span class="small-header">{{'KAFS05_80' | i18n(reason1.title)}}</span>
                  </div>
                  <div>
                        <nts-text-area v-model="reason1.reason" />
                  </div>
            </div>
        </div>
    </div>


    <!--A2_B6-->
    <div class="card card-label" v-if="$appContext.c19">
        <!--A2_B6_1-->
        <div class="card-header uk-bg-accordion" style="align-items: center">
            <v-label class="border-0 pl-0 my-n1" v-bind:constraint="validations.DivergenceReason">
                {{'KAFS05_78' | i18n(reason2.title)}}</v-label>
            <span class="badge badge-info">任意</span>
        </div>
        <div class="card-body">
            <!--A2_B6_2-->
            <div v-if="$appContext.c20">
                  <div class="mb-1">
                        <span class="small-header">{{'KAFS05_79' | i18n(reason2.title)}}</span>
                  </div>
                  <div>
                        <nts-dropdown v-model="reason2.selectedValue">
                            <option v-for="(item, index) in reason2.dropdownList" :key="index" :value="item.code">
                                {{item.text}}
                            </option>
                        </nts-dropdown>
                  </div>
            </div>
            <!--A2_B6_1-->
            <div v-if="$appContext.c21">
                  <div class="mb-1">
                        <span class="small-header">{{'KAFS05_80' | i18n(reason2.title)}}</span>
                  </div>
                  <div>
                        <nts-text-area v-model="reason2.reason" />
                  </div>
            </div>
        </div>
    </div>

    <!--A3_C1-->
    <div class="card card-label">
      <!-- A2_C1_1 -->
      <button
        type="button"
        class="btn btn-block btn-primary btn-lg"
        v-on:click="$appContext.register"
      >
        {{($appContext.modeNew ? 'KAFS05_11' : 'KAFS05_18') | i18n}}
      </button>
      <!-- A2_C1_2 -->
      <button
        type="button"
        class="btn btn-block btn-secondary"
        v-on:click="backStep1"
      >
        {{ "KAFS05_12" | i18n }}
      </button>
    </div>
  </div>
</template>