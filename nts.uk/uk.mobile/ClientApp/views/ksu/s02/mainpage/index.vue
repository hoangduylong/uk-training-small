<template>
<div class="ksus02" style="margin-top : -10px;">
    <div class="wrapper">
      <div
        class="container-fluid px-3"
        v-bind:style="smallDevice? { overflow: hidden }: { overflow: hidden }"
        style="overflow: hidden;"
      >
        <div>
          <div
            role="alert"
            class="border border-warning rounded p-1 mt-2 alarm-message"
            style="display: block; margin-top: 0px !important ;height: 40px;margin-left: -0.65rem; margin-right: -0.65rem ;"
          
          >
            <div style="display: flex;font-size: 12px">
              <i class="text-danger m-2 fas fa-exclamation-triangle fa-"></i
              ><span style="align-self: center;width: 85vw;"
                >{{alarmMsg}}</span
              >
            </div>
            <!---->
          </div>
          <!---->
        </div>
        <div style="padding-top: 10px;" >
          <calendar v-bind:params="{datas: dataCalendar}"  @dataChangeMonth="dataChange($event)" @dataFromComponent="dataFromChild($event)"></calendar>
        </div>
        <div  v-if="smallDevice == false && isCurrentMonth == true"
          style="
            position: fixed;
            width: -webkit-fill-available;
            height: 45px;
            left: 0px;
            text-align: center;
            bottom: 0;
          "
        >
          <button
            v-if="isCurrentMonth == true" 
            v-click="register"
            type="button"
            class="btn btn-success btn-block"
            style="width: 90%; margin-top: 5px;"
          >
            {{'KSUS02_2' | i18n}}
          </button>
        </div>
        <div v-if="smallDevice == true && isCurrentMonth == true"
          style="
            position: fixed;
            width: -webkit-fill-available;
            height: 45px;
            left: 0px;
            bottom: 0;
            text-align: center;
          "
        >
        <button
            v-if="isCurrentMonth == true" 
            v-click="register"
            type="button"
            class="btn btn-success btn-block"
            style="width: 90%; margin-top: 5px;"
          >
            {{'KSUS02_2' | i18n}}
          </button>
        </div>
      </div>
    </div>
</div>
</template>
