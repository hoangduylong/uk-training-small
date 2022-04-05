<template>
      <div>
        <div>
          <!----><!---->
          <div
            role=""
            class="table-container mx-n3 mt-n2"
            style="margin-top: -8px !important"
          >
            <div class="table-header" style="height: 35px">
              <table class="table table-bordered m-0 table-sm table-custom">
                  <tr 
                      class="uk-bg-green"
                      style="
                        border-bottom-width: 1px !important;
                        border-bottom: 1px;
                        border-color: #e0f59e !important;
                        height: 32px;
                        width: 100%;
                      ">
                    <td style="width: 35%; border: 0px solid #dee2e6 !important;">
                      <div><i v-click="openPrevMonth" class="fas fa-arrow-alt-circle-left"></i></div>
                      </td>
                      <td style="border: 0px solid #dee2e6 !important;">
                        <div style="margin-top: -4px; width: 127px;">
                        <nts-year-month id="yearmonth-cmm"
                          v-bind:showTitle="false"
                          v-model="yearMonth"
                          name="対象月"
                        /></div>
                      </td>
                      <td  style="width: 35%; border: 0px solid #dee2e6 !important;">
                      <div style="float: right;">
                        <i v-click="openNextMonth"
                          class="fas fa-arrow-alt-circle-right"
                        ></i
                      ></div>
                    </td>
                  </tr>
              </table>
            </div>
            <div
              class="table-body"
              style="
                margin-bottom: -1px;
                margin-top: -1px;
                height: auto;
                overflow: hidden;
              "
            >
              <div style="text-align: right"><!----><!----><!----></div>
              <table class="table table-bordered m-0 table-sm table-custom">
                <tbody>
                  <tr style="">
                    <td
                      class="uk-bg-schedule-sunday header-css"
                      style=" color:#FF0000;"
                    >
                      {{'KSUS02_3' | i18n}}
                    </td>
                    <td class="uk-bg-disable header-css" style=" color:#404040;">
                      {{'KSUS02_4' | i18n}}
                    </td>
                    <td class="uk-bg-disable header-css" style="color:#404040;">{{'KSUS02_5' | i18n}}</td>
                    <td class="uk-bg-disable header-css" style=" color:#404040;">{{'KSUS02_6' | i18n}}</td>
                    <td class="uk-bg-disable header-css" style=" color:#404040;">{{'KSUS02_7' | i18n}}</td>
                    <td class="uk-bg-disable header-css" style=" color:#404040;">{{'KSUS02_8' | i18n}}</td>
                    <td
                      id="d-1"
                      class="uk-bg-schedule-saturday header-css"
                      style="color:#0000FF;"
                    >
                      {{'KSUS02_9' | i18n}}
                    </td>
                  </tr>
                  <tr>
                    <td v-for="(item, index) in listDataDisplay.slice(0,7)" v-bind:key="index"  v-on="{ click: item.disable || !item.canUpdateCell? () =>{}: cellFocus }"
                      :id="item.id"
                      :class="item.disable ? 'uk-bg-white-smoke w-51' : !item.canUpdateCell || !isCurrentMonth ? 'uk-bg-silver w-51': 'w-51'"
                    >
                      <div v-if="item.disable == true" >
                        <div class="uk-bg-white-smoke" style="height: 80px;font-size: 10.5px; float: left; width: 100%;" ></div>
                      </div>
                      <div v-else style="height: 80px;font-size: 10.5px; float: left; width: 100%;"  class="table-block-day">
                          <div id="header">
                            <span v-html="item.dateDisplay"></span> 
                            <span id = "memo-area" v-if="item.showMemo == true" ><i class="far fa-sticky-note memo-css"></i></span>
                          </div>
                          <div id = "data-area" style="text-align:center;">
                            <div v-if="item.nameListInfor.length < 3" >
                              <div v-for="(shift, k) in item.nameListInfor"  v-bind:key="k">
                                <span v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                  class="form-control select-el"
                                  style="
                                    border-radius: 0.25rem;
                                    font-size: 9px;
                                    padding: 2px;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                    margin-top: 3px;
                                    height: 20px;
                                  "
                                  >{{shift.shiftMasterName}}</span>
                              </div>
                            </div>
                            <div v-else> 
                                <span v-for="(shift, k) in item.nameListInfor.slice(0,2)"  v-bind:key="k" v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                  class="form-control select-el"
                                  style="
                                    border-radius: 0.25rem;
                                    font-size: 9px;
                                    padding: 2px;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                    margin-top: 2px;
                                    height: 20px;
                                  "
                                  >{{shift.shiftMasterName}}</span>
                              <span class="font-size-8px">{{'KSUS02_24' | i18n}}</span>
                            </div>
                          </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="swipeCalendar">
                    <td v-for="(item, index) in listDataDisplay.slice(7,14)" v-bind:key="index"  v-on="{ click: item.disable || !item.canUpdateCell? () =>{}: cellFocus }"
                      :id="item.id"
                      :class="item.disable ? 'uk-bg-white-smoke w-51' : !item.canUpdateCell || !isCurrentMonth ? 'uk-bg-silver w-51': 'w-51'"
                    >
                      <div v-if="item.disable == true" class="uk-bg-white-smoke" style="height: 80px;font-size: 10.5px; float: left;" ></div>
                    
                      <div v-else class="table-block-day" style="height: 80px;font-size: 10.5px; float: left;">
                        <div id="header">
                          <span v-html="item.dateDisplay"></span>
                          <span id = "memo-area" v-if="item.showMemo == true" ><i class="far fa-sticky-note memo-css"></i></span>
                        </div>
                        <div  id = "data-area" style="text-align:center;">
                          <div v-if="item.nameListInfor.length < 3" >
                            <div v-for="(shift, k) in item.nameListInfor"  v-bind:key="k">
                              <span v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                class="form-control select-el"
                                style="
                                  border-radius: 0.25rem;
                                  font-size: 9px;
                                  padding: 2px;
                                  font-weight: bold;
                                  border: 1px solid #ced4da;
                                  text-align: center;
                                  margin-top: 3px;
                                  height: 20px;
                                "
                                >{{shift.shiftMasterName}}</span>
                            </div>
                          </div>
                          <div v-else> 
                              <span v-for="(shift, k) in item.nameListInfor.slice(0,2)"  v-bind:key="k" v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                class="form-control select-el"
                                style="
                                  border-radius: 0.25rem;
                                  font-size: 9px;
                                  padding: 2px;
                                  font-weight: bold;
                                  border: 1px solid #ced4da;
                                  text-align: center;
                                  margin-top: 2px;
                                  height: 20px;
                                "
                                >{{shift.shiftMasterName}}</span>
                            <span class="font-size-8px">{{'KSUS02_24' | i18n}}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td v-for="(item, index) in listDataDisplay.slice(14,21)" v-bind:key="index"  v-on="{ click: item.disable || !item.canUpdateCell? () =>{}: cellFocus }"
                      :id="item.id"
                      :class="item.disable ? 'uk-bg-white-smoke w-51' : !item.canUpdateCell || !isCurrentMonth ? 'uk-bg-silver w-51': 'w-51'"
                    >
                        <div v-if="item.disable == true" class="uk-bg-white-smoke" style="height: 80px;font-size: 10.5px; float: left;" ></div>
                     
                        <div v-else class="table-block-day" style="height: 80px;font-size: 10.5px; float: left;">
                          <div id="header">
                            <span v-html="item.dateDisplay"></span>
                            <span id = "memo-area" v-if="item.showMemo == true" ><i class="far fa-sticky-note memo-css"></i></span>
                          </div>
                          <div  id = "data-area" style="text-align:center;">
                            <div v-if="item.nameListInfor.length < 3" >
                              <div v-for="(shift, k) in item.nameListInfor"  v-bind:key="k">
                                <span v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                  class="form-control select-el"
                                  style="
                                    border-radius: 0.25rem;
                                    font-size: 9px;
                                    padding: 2px;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                    margin-top: 3px;
                                    height: 20px;
                                  "
                                  >{{shift.shiftMasterName}}</span>
                              </div>
                            </div>
                            <div v-else> 
                                <span v-for="(shift, k) in item.nameListInfor.slice(0,2)"  v-bind:key="k" v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                  class="form-control select-el"
                                  style="
                                    border-radius: 0.25rem;
                                    font-size: 9px;
                                    padding: 2px;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                    margin-top: 2px;
                                    height: 20px;
                                  "
                                  >{{shift.shiftMasterName}}</span>
                              <span class="font-size-8px">{{'KSUS02_24' | i18n}}</span>
                            </div>
                          </div>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td v-for="(item, index) in listDataDisplay.slice(21,28)" v-bind:key="index"  v-on="{ click: item.disable || !item.canUpdateCell? () =>{}: cellFocus }"
                      :id="item.id"
                      :class="item.disable ? 'uk-bg-white-smoke w-51' : !item.canUpdateCell || !isCurrentMonth ? 'uk-bg-silver w-51': 'w-51'"
                    >
                      <div v-if="item.disable == true" >
                        <div class="uk-bg-white-smoke" style="height: 80px;font-size: 10.5px; float: left;" ></div>
                      </div>
                        <div v-else class="table-block-day" style="height: 80px;font-size: 10.5px; float: left;">
                          <div id="header">
                            <span v-html="item.dateDisplay"></span>
                            <span id = "memo-area" v-if="item.showMemo == true" ><i class="far fa-sticky-note memo-css"></i></span>
                          </div>
                          <div  id = "data-area" style="text-align:center;">
                            <div v-if="item.nameListInfor.length < 3" >
                              <div v-for="(shift, k) in item.nameListInfor"  v-bind:key="k">
                                <span v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                  class="form-control select-el"
                                  style="
                                    border-radius: 0.25rem;
                                    font-size: 9px;
                                    padding: 2px;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                    margin-top: 3px;
                                    height: 20x;
                                  "
                                  >{{shift.shiftMasterName}}</span>
                              </div>
                            </div>
                            <div v-else> 
                                <span v-for="(shift, k) in item.nameListInfor.slice(0,2)"  v-bind:key="k" v-bind:style="{  backgroundColor: shift.colorSmartphone }"
                                  class="form-control select-el"
                                  style="
                                    border-radius: 0.25rem;
                                    font-size: 9px;
                                    padding: 2px;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                    margin-top: 2px;
                                    height: 20px;
                                  "
                                  >{{shift.shiftMasterName}}</span>
                              <span class="font-size-8px">{{'KSUS02_24' | i18n}}</span>
                            </div>
                          </div>
                        </div>
                    </td>
                  </tr>
                  <tr>
                    <td v-for="(item, index) in listDataDisplay.slice(28,35)" v-bind:key="index"  v-on="{ click: item.disable || !item.canUpdateCell? () =>{}: cellFocus }"
                      :id="item.id"
                      :class="item.disable ? 'uk-bg-white-smoke w-51' : !item.canUpdateCell || !isCurrentMonth ? 'uk-bg-silver w-51': 'w-51'"
                    >
                      <div v-if="item.disable == true" >
                        <div class="uk-bg-white-smoke" style="height: 80px;font-size: 10.5px; float: left;" ></div>
                      </div>
                      <div v-else class="table-block-day" style="height: 80px;font-size: 10.5px; float: left;">
                        <div id="header">
                          <span v-html="item.dateDisplay"></span>
                          <span id = "memo-area" v-if="item.showMemo == true" ><i class="far fa-sticky-note memo-css"></i></span>
                        </div>
                        <div  id = "data-area" style="text-align:center;">
                          <div v-if="item.nameListInfor.length < 3" >
                            <div v-for="(shift, k) in item.nameListInfor"  v-bind:key="k">
                              <span v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                class="form-control select-el"
                                style="
                                  border-radius: 0.25rem;
                                  font-size: 9px;
                                  padding: 2px;
                                  font-weight: bold;
                                  border: 1px solid #ced4da;
                                  text-align: center;
                                  margin-top: 3px;
                                  height: 20px;
                                "
                                >{{shift.shiftMasterName}}</span>
                            </div>
                          </div>
                          <div v-else> 
                              <span v-for="(shift, k) in item.nameListInfor.slice(0,2)"  v-bind:key="k" v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                class="form-control select-el"
                                style="
                                  border-radius: 0.25rem;
                                  font-size: 9px;
                                  padding: 2px;
                                  font-weight: bold;
                                  border: 1px solid #ced4da;
                                  text-align: center;
                                  margin-top: 2px;
                                  height: 20px;
                                "
                                >{{shift.shiftMasterName}}</span>
                            <span class="font-size-8px">{{'KSUS02_24' | i18n}}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td style="border-bottom: 2px solid #dee2e6;" v-for="(item, index) in listDataDisplay.slice(35,42)" v-bind:key="index"  v-on="{ click: item.disable || !item.canUpdateCell? () =>{}: cellFocus }"
                      :id="item.id"
                      :class="item.disable ? 'uk-bg-white-smoke w-51' : !item.canUpdateCell || !isCurrentMonth ? 'uk-bg-silver w-51': 'w-51'"
                    >
                      <div v-if="item.disable == true" >
                        <div class="uk-bg-white-smoke" style="height: 80px;font-size: 10.5px; float: left;" ></div>
                      </div>
                        <div v-else class="table-block-day" style="height: 80px;font-size: 10.5px; float: left;">
                          <div id="header">
                            <span v-html="item.dateDisplay"></span>
                            <span id = "memo-area" v-if="item.showMemo == true" ><i class="far fa-sticky-note memo-css"></i></span>
                          </div>
                          <div  id = "data-area" style="text-align:center;">
                            <div v-if="item.nameListInfor.length < 3" >
                              <div v-for="(shift, k) in item.nameListInfor"  v-bind:key="k">
                                <span v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                  class="form-control select-el"
                                  style="
                                    border-radius: 0.25rem;
                                    font-size: 9px;
                                    padding: 2;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                    margin-top: 3px;
                                    height: 20px;
                                  "
                                  >{{shift.shiftMasterName}}</span>
                              </div>
                            </div>
                            <div v-else> 
                                <span v-for="(shift, k) in item.nameListInfor.slice(0,2)"  v-bind:key="k" v-bind:style="{  backgroundColor: shift.colorSmartphone, color: shift.colorText }"
                                  class="form-control select-el"
                                  style="
                                    border-radius: 0.25rem;
                                    font-size: 9px;
                                    padding: 2px;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                    margin-top: 2px;
                                    height: 20px;
                                  "
                                  >{{shift.shiftMasterName}}</span>
                              <span class="font-size-8px">{{'KSUS02_24' | i18n}}</span>
                            </div>
                          </div>
                        </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table-footer">
              <table class="table table-bordered m-0 table-sm table-custom">
                <tbody></tbody>
                <tfoot>
                  <tr class="d-none">
                    <td>合計</td>
                    <td class=""></td>
                    <td class=""></td>
                    <td class=""></td>
                    <td class=""></td>
                    <td class="d-none"></td>
                    <td class="d-none"></td>
                    <td class="d-none"></td>
                    <td class="d-none"></td>
                    <td class="d-none"></td>
                    <td class="d-none"></td>
                    <td class="d-none"></td>
                    <td class="d-none"></td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div
            id="detailPopup" v-show="showPopup"
            class="card"
            style="width: 375px; height: 530px; position: absolute; top: 0"
          >
            <div style="background-color: white; height: 81px">
              <table
                class="table table-bordered m-0 table-sm table-custom"
                style="position: absolute"
              >
                <tbody id="tbody1row"></tbody>
              </table>
            </div>

            <h6
              v-click="closePopup"
              class="card-header uk-bg-choice-row"
              style="margin-top: 1px; padding: 5px; z-index: 1"
            >
              <span
                id="monthday"
                style="float: left; font-weight: bold; margin-left: 6px; width:50%;"
                ></span
              >
              <i
                v-click="closePopup"
                style="
                  font-size: 19px;
                  float: left;
                  margin-top: -6px;
                "
                class="fas fa-sort-down"
              ></i>
              <i 
                v-click="clearAll"
                style="margin-right: 10px; font-size: 19px; float: right"
                :class="isCurrentMonth ? 'fas fa-trash-alt' : ''"
              ></i>
            </h6>
            <div class="card-body" style="background-color: #f4fbfd">
              <div class="accordion">
                <!-- 既に開きたいならshowを追加してください。 -->
                <div class="card1 card" > 
                  <div class="card-header uk-bg-accordion">
                    <button class="btn btn-link" type="button">
                      <i class="far fa-star"></i>
                      <span class="small-header">{{'KSUS02_10' | i18n}}</span>
                    </button>
                  </div>
                  <div v-show="showCheckboxs">
                    <div class="">
                      <div
                        id="only-shift"
                        style="
                          height: 200px;
                          top: 60px;
                          overflow: scroll;
                        "
                       >
                       <div v-if="isCurrentMonth">
                          <nts-checkbox v-for="(option, k) in listShiftMasterInfo" 
                            v-model="checked2s" 
                            v-bind:value="option.shiftMaster.shiftMasterCode" v-bind:key="k" 
                            v-click="setDataDisplay"
                            >
                              <div  v-click="setDataDisplay" style="float: right" > <span
                              v-bind:style="{  backgroundColor: option.shiftMaster.colorSmartphone, color: option.shiftMaster.colorText }"
                                class="form-control select-el"
                                style="
                                  margin-top: 4px;
                                  font-size: 15px;
                                  width: 42px;
                                  height: 26px;
                                  padding: 0;
                                  float: left;
                                  margin-left: 10px;
                                  font-weight: bold;
                                  border: 1px solid #ced4da;
                                  text-align: center;
                                "
                                >{{option.shiftMaster.shiftMasterName}}</span> &nbsp;&nbsp;  {{option.shiftMaster.workTime1}} &nbsp;&nbsp; {{option.shiftMaster.workTime2}}</div>
                          </nts-checkbox>
                        </div>
                        <div v-else>
                            <div v-for="(option, k) in nameListInforCurrent" 
                              v-bind:key="k" 
                              style="float: left;font-size: 12px;" class="form-check-2"
                              >
                                <span
                                v-bind:style="{  backgroundColor: option.shiftMaster.colorSmartphone, color: option.shiftMaster.colorText }"
                                  class="form-control select-el"
                                  style="
                                    margin-top: 4px;
                                    font-size: 15px;
                                    width: 42px;
                                    height: 26px;
                                    padding: 0;
                                    float: left;
                                    margin-left: 10px;
                                    font-weight: bold;
                                    border: 1px solid #ced4da;
                                    text-align: center;
                                  "
                                  >{{option.shiftMaster.shiftMasterName}}</span>
                                  <span style="float: left;margin-top: 6px;"> &nbsp;&nbsp;  {{option.shiftMaster.workTime1}} &nbsp;&nbsp; {{option.shiftMaster.workTime2}}</span>
                                  
                            </div>
                          </div>
                      </div> 
                    </div>
                  </div>
                </div>
                <div class="card2 card">
                  <div class="card-header uk-bg-accordion">
                    <button
                      v-click="showMemo"
                      class="btn btn-link"
                      type="button"
                    >
                      <i class="far fa-sticky-note"></i
                      ><span class="small-header" style="margin-left: 9px"
                        >{{'KSUS02_11' | i18n}}</span
                      >
                      <i
                        id="plus-minus"
                        class="fas fa-plus-circle"
                        style="float: right; margin-top: 4px"
                      ></i>
                    </button>
                  </div>
                  <div class="" style="height:115px;" v-show="showMemoArea">
                    <div class="card-body">
                      <div>
                        <div>
                          <div
                            class="input-group input-group-transparent"
                          >
                            <!-- <textarea
                              v-model="memoCurent"
                              disabled
                              type=""
                              rows="2"
                              v-bind:placeholder="$i18n('KSUS02_12')"
                              class="form-control"
                              style="
                                margin-top: 0px;
                                margin-bottom: 0px;
                                height: 80px; 
                              "
                            ></textarea> -->
                            <nts-text-area
                              id="text-area-1"
                              v-model="memoCurent"
                              rows="3"
                              v-bind:placeholder="$i18n('KSUS02_12')"
                              class="form-control"
                              style="margin-top: 0px;
                                margin-bottom: 0px;
                                height: 82px; "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
