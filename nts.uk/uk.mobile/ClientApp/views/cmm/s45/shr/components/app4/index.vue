<template>
  <div class="cmms45componentsapp4">
    <!-- B2 -->
    <div v-if="isCondition1 && isCondition4" class="card card-label">
      <div class="card-header uk-bg-accordion headerDiv">
        <span class="textPosition">{{'KAFS09_22' | i18n}}</span>
      </div>
    </div>
    <!-- B2_1 -->
    <div v-if="isCondition1 && isCondition4" class="paddingSpan">
      <span v-if="dataOutput.goBackApplication.isChangedWork == 0">{{'KAFS09_24' | i18n}}</span>
      <span v-if="dataOutput.goBackApplication.isChangedWork == 1">{{'KAFS09_23' | i18n}}</span>
    </div>
    <!-- B3 -->

    <div v-if="isCondition2 && isCondition3" class="card card-label">
      <div class="card-header uk-bg-accordion headerDiv">
        <span class="textPosition">{{'KAFS09_3' | i18n}}</span>
      </div>
    </div>
    <!-- B3_1 -->
    <div v-if="isCondition2 && isCondition3">
      <span class="textSize uk-text-dark-gray">{{'KAFS09_4' | i18n}}</span>
    </div>
    <!-- B3_2 -->
    <div v-if="isCondition2 && isCondition3" class="paddingSpan">
      <span>{{$app().workType | i18n}}</span>
    </div>
    <!-- B3_3 -->
    <div v-if="isCondition2 && isCondition3">
      <span class="textSize uk-text-dark-gray">{{'KAFS09_5' | i18n}}</span>
    </div>
    <!-- B3_4 -->
    <div v-if="isCondition2 && isCondition3" class="paddingSpan">
      <span>{{$app().workTime | i18n}}</span>
    </div>

    <!-- B5 -->

    <div class="card card-label">
      <div class="card-header uk-bg-accordion headerDiv">
        <span class="textPosition">{{'KAFS09_8' | i18n}}</span>
      </div>
    </div>
    <!-- B5_1 -->
    <div class="paddingSpan">
      <span v-if="$app().straight">{{'KAFS09_6' | i18n}}</span>
      <span v-if="!$app().straight">{{'KAFS09_7' | i18n}}</span>
    </div>
    <!-- B5_2 -->
    <div class="paddingSpan">
      <span v-if="$app().bounce">{{'KAFS09_9' | i18n}}</span>
      <span v-if="!$app().bounce">{{'KAFS09_10' | i18n}}</span>
    </div>
  </div>
</template>