<template>
  <div class="kafs02c">
    <div>
      <kafs00-a
        v-if="kaf000_A_Params != null"
        v-bind:params="kaf000_A_Params"
      />
    </div>

    <div
      v-if="!$valid || !isValidateAll"
      class="card bg-danger top-alert uk-text-danger topError mb-1"
    >
      <button class="btn btn-link uk-text-danger">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        {{ "KAFS07_1" | i18n }}
      </button>
    </div>

    <div class="card card-label" v-if="!mode">
      <!-- C0 -->
      <div class="card-header uk-bg-accordion mt-2 mb-n2">
        <span>{{ "KAFS02_30" | i18n }}</span>
      </div>

      <div class="mt-3">{{ data.appDispInfoStartupOutput.appDispInfoNoDateOutput.employeeInfoLst[0].bussinessName }}</div>
    </div>

    <div class="card card-label">
      <!-- C2 -->
      <div class="card-header uk-bg-accordion mt-2 mb-n2">
        <span>{{ "KAFS02_19" | i18n }}</span>
        <span class="badge badge-warning">必須</span>
      </div>

      <!-- C2_1 -->
      <div class="mt-4">
        <div class="mt-n2" v-if="!mode">{{ $dt(date, 'YYYY/MM/DD') }}</div>
        <nts-date-input
          v-if="mode"
          v-bind:showTitle="false"
          v-on:changeDate="changeDate"
          v-model="date"
        />
      </div>
    </div>

    <div class="card card-label">
      <!-- C3 -->
      <div class="card-header uk-bg-accordion mt-2 mb-n2">
        <span>{{ "KAFS02_20" | i18n }}</span>
        <span class="badge badge-warning">必須</span>
      </div>

      <div class="mt-4">
        <!-- C3_1 -->
        <div>
          <nts-dropdown
            v-bind:constraint="{ required: true }"
            v-model="selectedStampCD"
            v-bind:inlineTitle="true"
            name="KAFS02_21"
            v-bind:columns="{
              title: 'col-4 col-md-4 pr-1 control-label-required',
              input: 'col-5 col-md-5'
            }"
          >
            <option
              v-for="item in stampAtrs"
              :key="item.code"
              :value="item.code"
              >{{ item.name }}</option
            >
          </nts-dropdown>
        </div>

        <!-- C3_2 -->
        <div class="w-100" v-if="condition1">
          <nts-switchbox
            v-for="item in outingTypeAtrs"
            :key="item.code"
            v-model="selectedOutCD"
            v-bind:value="item.code"
          >
            {{ item.name }}
          </nts-switchbox>
        </div>

        <!-- C3_3 -->
        <div class="">{{ "KAFS02_20" | i18n }}</div>
        <div>
          <nts-time-editor
            v-model="timeDuration"
            time-input-type="time-point"
          />
        </div>
      </div>
    </div>

    <div>
      <kafs00-c
        v-if="kaf000_C_Params != null"
        v-bind:params="kaf000_C_Params"
        v-on:kaf000CChangeReasonCD="kaf000CChangeReasonCD"
        v-on:kaf000CChangeAppReason="kaf000CChangeAppReason"
      />
    </div>

    <!-- C5 -->
    <button
      type="button"
      class="btn btn-primary btn-block text-center mb-3"
      v-on:click="register()"
      v-if="mode"
    >
      {{ "KAFS02_17" | i18n }}
    </button>
    <button
      type="button"
      class="btn btn-primary btn-block text-center mb-3"
      v-on:click="register()"
      v-if="!mode"
    >
      {{ "KAFS02_18" | i18n }}
    </button>
  </div>
</template>