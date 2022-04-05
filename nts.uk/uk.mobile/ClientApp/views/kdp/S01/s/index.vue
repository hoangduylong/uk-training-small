<template>
  <div>
    <div class="col-6 px-0">
      <nts-year-month
        v-bind:showTitle="false"
        v-model="yearMonth"
        name="対象月"
      />
    </div>
    <div class="d-flex">
      <div class="col-6 px-0">
        <nts-label>{{ "KDPS01_55" | i18n }}</nts-label>
      </div>
      <div v-focus class="col-6 px-0">
        <nts-dropdown showTitle="false" v-model="selectedValue">
          <option
            v-for="(item, k) in dropdownList"
            :value="item.code"
            v-bind:key="k"
          >
            {{ item.text | i18n }}
          </option>
        </nts-dropdown>
      </div>
    </div>

    <table class="table mt-3 table-bordered uk-table-striped">
      <colgroup>
      <col span="1" style="width: 25%;">
       <col span="1" style="width: 40%;">
       <col span="1" style="width: 35%;">
  </colgroup>
      <thead>
        <tr>
          <th class="text-center" scope="col">{{ "KDPS01_61" | i18n }}</th>
          <th class="text-center" scope="col">{{ "KDPS01_62" | i18n }}</th>
          <th class="text-center" scope="col">{{ "KDPS01_63" | i18n }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getItems" v-bind:key="item.stampStringDatetime">
          <td scope="row" 
            v-bind:style="{
              color: getTextColor(item)
            }"
          >
            {{ item.stampStringDatetime | date("D（ddd）") }}
          </td>
          <td scope="row" >
            <div class="row m-0">
              <div class="col-3 px-0">
                {{ getSymbol(item) | i18n }}
              </div>
              <div class="col-9">
                {{ item.stampStringDatetime | date("HH:mm") }}
              </div>
            </div>
          </td>
          <td scope="row" 
            v-bind:style="{
              'text-align': getTextAlign(item)
            }"
          >
            {{ item.stampAtr }}
          </td>
        </tr>
      </tbody>
    </table>
    <button
      type="button"
      v-on:click="$close"
      class="mt-3 btn btn-secondary btn-block"
    >
      {{ "KDPS01_64" | i18n }}
    </button>
  </div>
</template>
