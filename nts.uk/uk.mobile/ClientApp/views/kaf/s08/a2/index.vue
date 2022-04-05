<template>
  <div class="kafs08a2 mt-4 mx-n3">
    <!-- A2_1 -->
    <div v-if="hidden" class="card bg-danger top-alert uk-text-danger topError">
              <button class="btn btn-link uk-text-danger">
                <i class="fa fa-exclamation-circle" aria-hidden="true" ></i>
                {{ 'KAFS08_13' | i18n }}
              </button>
    </div>
    <!-- A7 -->
    <div class="field-set mt-3 ml-3">
      <!-- A7_1 -->
      <label class="uk-text-dark-gray">{{'KAFS08_20' | i18n}}</label>
      <!-- A7_2 -->
      <div class="pl-5">
        <label>{{application.prePostAtr == 0 ? 'KAFS00_10' : 'KAFS00_11' | i18n}}</label>
      </div>
      <!-- A7_3 -->
      <label class="uk-text-dark-gray">{{'KAFS08_23' | i18n}}</label>
      <!-- A7_4 -->
      <div class="pl-5">
        <label v-if="application.opAppStartDate == application.opAppEndDate">{{application.opAppStartDate}}</label>
        <label v-else >{{application.opAppStartDate + ' ~ ' + application.opAppEndDate}} </label>
      </div>
      <!-- A7_5 -->
      <div class="uk-text-dark-gray">
        <label class="a7_5">{{'KAFS08_28' | i18n}}</label>
        <!-- A7_6 -->
        <label v-if="derpartureTime == null">{{''}}</label>
        <label v-else>{{derpartureTime | timewd}}</label>
      </div>
      <!-- A7_7 -->
      <div class="uk-text-dark-gray">
        <label class="a7_7">{{'KAFS08_29' | i18n}}</label>
        <!-- A7_8 -->
        <label v-if="returnTime == null">{{''}}</label>
        <label v-else>{{returnTime | timewd}}</label>
      </div>
      <!-- A6 -->
      <div class="field-set">
        <!-- A6_1 -->
        <span v-bind:style="{color: comment.colorCode,fontWeight : comment.bold ? 'bold' : 'normal'}" class="a6_1">{{comment.comment}}</span>
      </div>
      <!-- A_10 -->
      <div class="mx-n2">
        <table id="table-a10" tabindex="1" class="table uk-table-striped table-bordered">
          <thead>
            <tr>
              <th class="px-1" scope="col">{{"KAFS08_34" | i18n}}</th>
              <th class="px-1" scope="col">{{"KAFS08_35" | i18n}}</th>
              <th class="px-1" scope="col">{{"KAFS08_36" | i18n}}</th>
              <th class="px-1" scope="col">{{"KAFS08_37" | i18n}}</th>
              <th class="px-1 border-right-0" scope="col">{{"KAFS08_38" | i18n}}</th>
              <th class="border-left-0"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data,index) in businessTripActualContent" v-bind:key="index">
              <td class="px-1" v-date="data.date">{{data.date }}</td>
              <td class="px-1" v-if="data.opAchievementDetail.opWorkTypeName != null">{{data.opAchievementDetail.opWorkTypeName}}</td>
              <td class="px-1" v-else>{{''}}</td>
              <td class="px-1" v-if="data.opAchievementDetail.opWorkTimeName != null">{{data.opAchievementDetail.opWorkTimeName}}</td>
              <td class="px-1" v-else>{{''}}</td>
              <td class="px-1" v-if="data.opAchievementDetail.opWorkTime != null">{{data.opAchievementDetail.opWorkTime | timewd}}</td>
              <td class="px-1" v-else>{{''}}</td>
              <td class="border-right-0 px-1" v-if="data.opAchievementDetail.opLeaveTime != null">{{data.opAchievementDetail.opLeaveTime | timewd}}</td>
              <td class="px-1" v-else>{{''}}</td>
              <td class="text-center px-0 border-left-0" @click="selectRowDate(data)">
                <fa-font class="pr-4" v-bind:size="'1'" icon="angle-right" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- A50_F2 -->
      <div class="process-button">
        <!-- A50_2 -->
        <button @click="nextToStepThree()" tabindex="2" v-if="mode" class="btn btn-primary btn-lg btn-block">{{'KAFS08_39' | i18n}}</button>
        <button @click="nextToStepThree()" tabindex="2" v-else class="btn btn-primary btn-lg btn-block">{{'KAFS08_41' | i18n}}</button>
        <!-- A50_3 -->
        <button @click="prevStepOne()" tabindex="3" class="btn btn-secondary btn-lg btn-block">{{'KAFS08_40' | i18n}}</button>
      </div>
    </div>
  </div>
</template>