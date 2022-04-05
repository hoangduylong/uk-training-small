<template>
  <div class="cmms45componentsapp1">
    <!-- B1_1 -->

    <div class="card card-label">
      <div class="card-header uk-bg-accordion headerDiv">
        <span class="textPosition">{{'KAFS07_2' | i18n}}</span>
      </div>
    </div>
    <!-- B1_2 -->
    <div>
      <span class="textSize uk-text-dark-gray">{{'KAFS07_3' | i18n}}</span>
    </div>
    <!-- B1_3 -->
    <div class="paddingSpan">
      <span>{{$app().workType | i18n}}</span>
    </div>
    <!-- B1_4 -->
    <div>
      <span class="textSize uk-text-dark-gray">{{'KAFS07_4' | i18n}}</span>
    </div>
    <!-- B1_5 -->
    <div class="paddingSpan">
      <span>{{$app().workTime | i18n}}</span>
    </div>

    <!-- B2_1 -->

    <div class="card card-label">
      <div class="card-header uk-bg-accordion headerDiv">
        <span class="textPosition">{{'KAFS07_5' | i18n}}</span>
      </div>
    </div>
    <!-- B2_2 -->
    <div class="paddingSpan">
      <span v-if="$app().straight">{{'KAFS07_11' | i18n}}</span>
      <span v-if="!$app().straight">{{'KAFS07_12' | i18n}}</span>
    </div>
    <!-- B2_3 -->
    <div class="paddingSpan">
      <span v-if="$app().bounce">{{'KAFS07_13' | i18n}}</span>
      <span v-if="!$app().bounce">{{'KAFS07_14' | i18n}}</span>
    </div>

    <!-- B3_1 -->

    <div v-if="isCondition1" class="card card-label">
      <div class="card-header uk-bg-accordion headerDiv">
        <span class="textPosition">{{'KAFS07_6' | i18n}}</span>
      </div>
    </div>
    <!-- B3_2 -->
    <div v-if="isCondition1" class="paddingSpan">
      <span>{{$app().workHours1 | i18n}}</span>
    </div>

    <!-- B4_1 -->
    <div v-if="isCondition2" class="card card-label">
      <div class="card-header uk-bg-accordion headerDiv">
        <span class="textPosition">{{'KAFS07_7' | i18n}}</span>
      </div>
    </div>
    <!-- B4_2 -->
    <div v-if="isCondition2" class="paddingSpan">
      <span>{{$app().workHours2 | i18n}}</span>
    </div>
  </div>
</template>