<template>
<div v-if="mode !== null">
  <div v-if="mode == 1">
    <calendara  v-bind:params="{dataFromParent: dataFromParent}" @changeMonth ="dataChange($event)" @passDataToParent="dataFromChild($event)"></calendara>
  </div>
  <div  v-if="mode == 0">
    <calendarb  v-bind:params="{dataFromParent: dataFromParent}" @changeMonth ="dataChange($event)" @passDataToParent="dataFromChild($event)"></calendarb>
  </div>
  </div>
</template>
