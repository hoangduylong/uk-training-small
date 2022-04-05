<template>
  <!-- A4 絞り込み -->
  <div id="A4">
    <div class="modal-header rounded-0 d-block p-0">
      <div class="uk-bg-teal p-2">
        <h4 class="modal-title text-white" v-on:click="$close('back')">       
            <i class="fas fa-angle-double-left mr-1" ></i>
            <span>{{ 'CCG003_30' | i18n }}</span>        
        </h4>
      </div>
    </div>
    <!-- A4_1 表示期間(ラベル) -->
    <label>{{ "CCGS03_6" | i18n }}</label>
    <div class="row">
      <!-- A4_2 表示期間 -->
      <div class="date-range-input col-10 col-sm-11 col-md-11 col-lg-11">
        <nts-date-range-input :constraint="validations.dateRangeInput" tabindex="1" name="CCGS03_6" :show-title="false" v-model="dateValue"></nts-date-range-input>
      </div>
      <div class="btn-search col-2 col-sm-1 col-md-1 col-lg-1">
        <!-- A4_3 検索 -->
        <button tabindex="2" class="btn btn-secondary no-wrap float-right" @click="onClickFilter">{{ "CCGS03_7" | i18n }}</button>
      </div>
    </div>
    <!-- A5_0 記念日アコーディオン -->
    <div>
      <!-- A5 記念日アコーディオン -->
      <div v-for="(item, index) in anniversaries" :key="'A' + index">
        <div class="accordion">
          <div ref="classAnniversary" class="card">
            <div class="card-header uk-bg-schedule-focus" @click="onClickAnniversary(index)">
              <span class="flex">
                <span @click="clickTitle('classAnniversary', index)" class="title">
                  {{ item.anniversaryNotice.anniversaryTitle }}
                </span>
                <img :src="iconNew" class="iconNew" v-if="item.flag">
              </span>
            </div>
            <div class="collapse">
              <div class="card-body">
                <!-- A5_2 記念日内容 -->
                <div>
                  <nts-label :constraint="{ required: false }">
                    <span class="break-space" v-html="item.anniversaryNotice.notificationMessage"></span>
                  </nts-label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- A6 メッセージアコーディオン -->
      <div v-for="(item, index) in msgNotices" :key="'M' + index">
        <div class="accordion">
          <div ref="classMsgNotice" class="card">
            <div class="card-header uk-bg-schedule-focus" @click="onClickMessageNotice(item.message.creatorID, item.message.inputDate, index)">
              <span class="flex">
                <span @click="clickTitle('classMsgNotice', index)" class="title">
                  {{ item.message.notificationMessage }}
                </span>
                <img :src="iconNew" class="iconNew" v-if="item.flag">
              </span>
            </div>
            <div class="collapse">
              <div class="card-body">
                <div>
                  <!-- A6_2 -->
                  <nts-label :constraint="{ required: false }">
                    <span class="break-space" v-html="item.messageDisplay"></span>
                    <span class="block-5 small-size">{{ 'CCG003_8' | i18n(item.creator) }}</span>
                    <span class="block-5">{{ 'CCG003_9' | i18n(item.dateDisplay) }}</span>
                  </nts-label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>