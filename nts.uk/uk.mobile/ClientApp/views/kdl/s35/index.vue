<template>
  <div class="kdls35">
    <!-- A1_1 -->
    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white">
          <i class="fas fa-angle-double-left mr-1" v-on:click="back()"></i>
          <span>{{ "KDLS35_1" | i18n }}</span>
        </h4>
      </div>
      <!-- A1_2 -->
      <div class="uk-bg-headline py-3 pl-3">
        <!-- A1_3 -->
        <span>{{ "KDLS35_2" | i18n }}</span>
      </div>
    </div>
    <div class="modal-component modal-body m-n3">
      <!-- A2_1 -->
      <div class="row">
        <div class="col-5">
          <nts-label>{{ "KDLS35_3" | i18n }}</nts-label>
        </div>
        <!-- A2_2 -->
        <div class="col-7 pt-2" id="A2_2">
          <label v-if="startDate === endDate">{{ startDate | i18n }}</label>
          <label v-else>{{ "KDLS35_14" | i18n([startDate, endDate]) }}</label>
        </div>
      </div>
      <!-- A3_1 -->
      <div class="row pt-1">
        <div class="col-5">
          <nts-label>{{ "KDLS35_4" | i18n }}</nts-label>
        </div>
        <!-- A3_2 -->
        <label class="col-7 pt-2" id="A3_2">{{
          "KDLS35_5" | i18n(requiredNumberOfDays)
        }}</label>
      </div>
      <div class="row pt-1">
        <div class="col-5">
          <!-- A4_1 -->
          <fa-font icon="fas fa-exclamation-triangle" />
          <!-- A4_2 -->
          <label>{{ "KDLS35_6" | i18n }}</label>
        </div>
        <div class="col-7" id="A4_2">
          <!-- A4_3 -->
          <fa-font icon="fas fa-calendar-check" />
          <!-- A4_4 -->
          <label>{{ "KDLS35_7" | i18n }}</label>
        </div>
      </div>
      <!-- A5_1 -->
      <table class="table table-responsive w-auto" v-focus>
        <thead class="text-center">
          <tr>
            <th scope="col" id="A5_1"></th>
            <!-- A5_2 -->
            <th scope="col" id="A5_2">{{ "KDLS35_8" | i18n }}</th>
            <!-- A5_3 -->
            <th scope="col" id="A5_3">{{ "KDLS35_9" | i18n }}</th>
            <!-- A5_4 -->
            <th scope="col" id="A5_4">{{ "KDLS35_10" | i18n }}</th>
            <!-- A5_5 -->
            <th scope="col" id="A5_5">{{ "KDLS35_11" | i18n }}</th>
          </tr>
        </thead>
        <tbody
          v-for="(item, index) in substituteWorkInfoList"
          v-bind:key="index"
        >
          <tr class="text-center">
            <td>
              <!-- A5_6 -->
              <nts-checkbox
                v-if="item.enable && index == 0"
                v-bind:value="true"
                v-model="item.checked"
                v-on:input="(val) => checkRequirementOfDay(item, val)"
                v-focus
              />
              <nts-checkbox
                v-else-if="item.enable"
                v-bind:value="true"
                v-model="item.checked"
                v-on:input="(val) => checkRequirementOfDay(item, val)"
              />
              <nts-checkbox
                v-else
                class="cb-bg-color"
                v-bind:value="true"
                v-model="item.checked"
                v-on:input="() => checkRequirementOfDay(item)"
                v-bind:disabled="true"
              />
            </td>
            <!-- A5_7 -->
            <td v-on:click="() => checkRequirementOfDayWithCheck(item)">
              <template v-if="item.icon">
                <fa-font :icon="item.icon" />
              </template>
              <template v-else />
            </td>
            <!-- A5_8 -->
            <td
              class="substituteWorkDate"
              v-on:click="() => checkRequirementOfDayWithCheck(item)"
            >
              {{ item.substituteWorkDate | date("YY/MM/DD(ddd)") }}
            </td>
            <!-- A5_9 -->
            <td
              class="remainingNumber"
              v-on:click="() => checkRequirementOfDayWithCheck(item)"
            >
              <span>{{ "KDLS35_5" | i18n(item.remainingNumber) }}</span>
            </td>
            <!-- A5_10 -->
            <td
              class="expirationDate"
              v-on:click="() => checkRequirementOfDayWithCheck(item)"
            >
              <span>{{ item.expirationDate | date("YY/MM/DD(ddd)") }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="modal-footer">
        <!-- A6_1 -->
        <button class="btn btn-link" v-on:click="decide()">
          {{ "KDLS35_12" | i18n }}
        </button>
        <!-- A6_2 -->
        <button class="btn btn-link" v-on:click="back()">
          {{ "KDLS35_13" | i18n }}
        </button>
      </div>
    </div>
  </div>
</template>