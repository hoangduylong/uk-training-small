<template>
  <div class="cmms45shrcomponentsapp71">
    <div>
      <div class="card card-label">
        <!-- D1 -->
        <div class="card-header uk-bg-accordion mt-2 mb-n2">
          <span>{{ "KAFS02_20" | i18n }}</span>
        </div>

        <div class="mt-3 mb-2">
          <!-- D1_1 -->
          <span v-if="stampAtr === 0">出勤</span>
          <span v-if="stampAtr === 1">退勤</span>
          <span v-if="stampAtr === 2">退勤（残業）</span>
          <span v-if="stampAtr === 3">外出</span>
          <span v-if="stampAtr === 4">戻り</span>
          <span v-if="stampAtr === 5">早出</span>
          <span v-if="stampAtr === 6">休出</span>

          <span>{{ 'KAFS02_29' | i18n }}</span>

          <!-- D1_2 -->
          <span v-if="gooutReason !== null">（</span>
          <span v-if="stampAtr === 3 && gooutReason === 0">私用</span>
          <span v-if="stampAtr === 3 && gooutReason === 1">公用</span>
          <span v-if="stampAtr === 3 && gooutReason === 2">有償</span>
          <span v-if="stampAtr === 3 && gooutReason === 3">組合</span>
          <span v-if="gooutReason !== null">）</span>

          <!-- D1_3 -->
          <span>：</span>
          <span>{{ timeDuration }}</span>
        </div>
      </div>
    </div>
  </div>
</template>