<template>
  <div class="cmms45componentsapp3">
    <!-- B5_1 -->
    <div class="card mx-n4 py-2">
      <div class="card-header">{{ "KAFS08_93" | i18n }}</div>
    </div>
    <!-- B5_2 -->
    <div class="row mt-2 mx-0">
      <span class="col-4 pr-0 pl-4">{{ "KAFS08_94" | i18n }}</span>
      <span class="col-8" v-if="time.departureTime == null">{{ "" }}</span>
      <span class="col-8" v-else>{{ time.departureTime | timewd }}</span>
    </div>
    <div class="row my-2 mx-0">
      <span class="col-4 pr-0 pl-4">{{ "KAFS08_95" | i18n }}</span>
      <span class="col-8" v-if="time.returnTime == null">{{ "" }}</span>
      <span class="col-8" v-else>{{ time.returnTime | timewd }}</span>
    </div>
    <!-- B10 -->
    <table class="table uk-table-striped table-bordered">
      <thead>
        <tr>
          <th class="px-1" scope="col">{{ "KAFS08_97" | i18n }}</th>
          <th class="px-1" scope="col">{{ "KAFS08_98" | i18n }}</th>
          <th class="px-1" scope="col">{{ "KAFS08_99" | i18n }}</th>
          <th class="px-1" scope="col">{{ "KAFS08_100" | i18n }}</th>
          <th class="px-1 border-right-0" scope="col">
            {{ "KAFS08_101" | i18n }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, index) in table" v-bind:key="index">
          <td class="px-1" v-date="data.date">{{ data.date }}</td>
          <td class="px-1" v-if="data.workTypeName != null">
            {{ data.workTypeName }}
          </td>
          <td class="px-1" v-else>{{ "" }}</td>
          <td class="px-1" v-if="data.workTimeName != null">
            {{ data.workTimeName }}
          </td>
          <td class="px-1" v-else>{{ "" }}</td>
          <td class="px-1" v-if="data.startWorkTime">
            {{ data.startWorkTime | timewd }}
          </td>
          <td class="px-1" v-else>{{ "" }}</td>
          <td class="px-1" v-if="data.endWorkTime != null">
            {{ data.endWorkTime | timewd }}
          </td>
          <td class="px-1" v-else>{{ "" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>