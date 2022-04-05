<template>
  <div
    class="nts-ccgs008-table"
    :style="{'width': size(configs.width, '100%'), 'height': size(configs.height, null)}"
  >
    <div v-if="configs.search" class="col-7 search-box">
      <div class="input-group">
        <input
          class="form-control py-2 border-right-0 border"
          type="text"
          v-model="search"
          @keyup="searchHandle(search)"
        >
        <span class="input-group-append">
          <div class="input-group-text bg-transparent">
            <i class="fa fa-search"></i>
          </div>
        </span>
      </div>
    </div>

    <table class="table" :class="configs.tableClass" v-show="!configs.loading">
      <!-- will not show header if there is no data to show -->
      <thead v-if="!(!configs.items || (configs.items && configs.items.length === 0))">
        <tr :class="configs.headerClass">
          <th v-for="(header, index) in configs.headers" :key="index">{{header.label | i18n }}</th>
        </tr>
      </thead>
      <!-- with header -->
      <tbody v-if="configs.headers" class="tbody-border">
        <tr
          v-for="(item, index) in configs.items"
          :class="item._rowClass ? item._rowClass : configs.rowClass"
          :key="index"
        >
          <td v-for="(header, index) in configs.headers" :key="index" :class="header.cellClass">
            <span v-if="header.html" v-html="item[header.key]"></span>
            <span v-if="!header.html">{{ getValuebyFilter(item[header.key], header.filter) }}</span>
          </td>
        </tr>
      </tbody>
      <!-- just print data out -->
      <tbody v-else>
        <tr
          v-for="(item, index) in configs.items"
          :class="item._rowClass ? item._rowClass : configs.rowClass"
          :key="index"
        >
          <td :class="{ 'pl-3': item.sub }" style="width:50%" class="p1 pl-2">
            <span>{{item.name | i18n}}</span>
          </td>
          <td class="p1 pl-2" v-if="!item['isFormatNew']">
            <span v-if="item['profix']">{{item['profix'] | i18n}}</span>
            <span v-html="item.value"></span>
            <span v-if="item['prefix']">{{item['prefix'] | i18n}}</span>

            <span v-if="item['profix2']">{{item['profix2'] | i18n}}</span>
            <span v-html="item.value2"></span>
            <span v-if="item['prefix2']">{{item['prefix2'] | i18n}}</span>
          </td>
          <td class="p1 pl-2" v-if="item['isFormatNew']">
              <span v-if="item['profix']">{{item['profix'] | i18n}}</span>
              <span v-html="item.value"></span>
              <span v-if="item['prefix']">{{item['prefix'] | i18n}}</span>
          </td>
        </tr>
      </tbody>
      <tbody v-if="!configs.items || (configs.items && configs.items.length === 0)" class="border-0">
        <tr>
          <td :colspan="configs.headers ? configs.headers.length : 1" class="uk-text-danger border-0">
            <div class="text-wrap text-left">
              <span
                class="error-message uk-text-danger text-break"
              >{{configs.noDataMessage ? configs.noDataMessage : '表示するデータがありません'}}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="configs.loading">
      <div id="fountainG">
        <div id="fountainG_1" class="fountainG"></div>
        <div id="fountainG_2" class="fountainG"></div>
        <div id="fountainG_3" class="fountainG"></div>
        <div id="fountainG_4" class="fountainG"></div>
        <div id="fountainG_5" class="fountainG"></div>
        <div id="fountainG_6" class="fountainG"></div>
        <div id="fountainG_7" class="fountainG"></div>
        <div id="fountainG_8" class="fountainG"></div>
      </div>
    </div>
  </div>
</template>
