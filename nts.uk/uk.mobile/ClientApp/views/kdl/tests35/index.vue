<template>
  <div class="kdltests35">
    <div>
      <nts-date-range-input name="申請期間 (Date Period)" v-model="dateValue" />
    </div>
    <div>
      <nts-label v-bind:constraint="{}">日数単位 (Day Unit)</nts-label>
      <div>
        <nts-switchbox v-model="daysUnit" v-bind:value="0.5"
          >0.5</nts-switchbox
        >
        <nts-switchbox v-model="daysUnit" v-bind:value="1.0"
          >1.0</nts-switchbox
        >
      </div>
    </div>
    <div>
      <nts-label v-bind:constraint="{}"
        >対象選択区分 (TargetSelectionAtr)</nts-label
      >
      <div>
        <nts-switchbox v-model="targetSelectionAtr" v-bind:value="0"
          >自動</nts-switchbox
        >
        <nts-switchbox v-model="targetSelectionAtr" v-bind:value="1"
          >申請</nts-switchbox
        >
        <nts-switchbox v-model="targetSelectionAtr" v-bind:value="2"
          >手動</nts-switchbox
        >
      </div>
    </div>
    <div>
      <nts-label v-bind:constraint="{}">List 表示する実績内容</nts-label>
    </div>
    <div>
      <nts-label v-bind:constraint="{}">List 振出振休紐付け管理</nts-label>
    </div>
    <div>
      <div class="text-center mt-3">
        <button v-on:click="openKDLS35" type="button" class="btn btn-primary">Open Dialog KDLS35</button>
      </div>
      <pre>{{managementData}}</pre>
    </div>
  </div>
</template>