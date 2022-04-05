<template>
<div class="cmms45shrcomponentsapp6">
    <!-- B1_1 -->
    <div class="card card-label">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS10_4" | i18n }}</span>
        </div>
    </div>
    <div>
        <!-- B1_2 -->
        <div class="row mt-1 mb-1">
            <div class="col-12 pl-3 textSize">{{"KAFS10_5" | i18n}}</div>
        </div>
        <!-- B1_3 -->
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pr-2 pl-3">
                {{workInfo.workType.code}}
            </div>
            <div class="col pl-0">
                {{workInfo.workType.name}}
            </div>
        </div>

        <!-- B1_4 -->
        <div class="row mt-1 mb-1">
            <div class="col-12 pl-3 textSize"> {{"KAFS10_6" | i18n}} </div>
        </div>
        <!-- B1_5 -->
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pr-2 pl-3">
                {{workInfo.workTime.code}}
            </div>
            <div class="col pl-0">
                {{workInfo.workTime.name}}
            </div>
        </div>
    </div>

    <!-- B2_1 -->
    <div class="card card-label">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS10_7" | i18n }}</span>
        </div>
    </div>
    <!-- B2_2 -->
    <div>
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pl-3 pr-1 text-left">
                {{workHours1.start}}
            </div>
            <div v-show="workHours1.start != '' && workHours1.end != ''" class="col-0 pl-0 pr-0 text-center">
                ~
            </div>
            <div class="col-9 text-left pl-1">
                 {{workHours1.end}}
            </div>
        </div>
    </div>

    <!-- B3_1 -->
    <div class="card card-label" v-if="c3">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS10_8" | i18n }}</span>
        </div>
    </div>
    <!-- B3_2 -->
    <div v-if="c3">
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pl-3 pr-1 text-left">
                {{workHours2.start}}
            </div>
            <div v-show="workHours2.start != '' && workHours2.end != ''" class="col-0 pl-0 pr-0 text-center">
                ~
            </div>
            <div class="col-9 text-left pl-1">
                {{workHours2.end}}
            </div>
        </div>
    </div>

    <!-- B4_1 -->
    <div class="card card-label" v-if="c15">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS10_9" | i18n }}</span>
        </div>
    </div>
    <div v-if="c15">
        <div 
        v-for="(item, index) in breakTimes"
        v-bind:key="index"
        :value="index"
        >
            <!-- B4_2 -->
            <div class="row mt-1 mb-1">
                <div class="col-12 textSize"> {{item.title}} </div>
            </div>
            <!-- B4_3 -->
            <div class="row mt-1 mb-1">
                <div class="col-1.5 pl-3 pr-1 text-left">
                    {{item.valueHours.start}}
                </div>
                <div class="col-0 pl-0 pr-0 text-center">
                    ~
                </div>
                <div class="col-9 text-left pl-1">
                    {{item.valueHours.end}}
                </div>
            </div>
        </div>
    </div>

    <!-- B8_1 -->
    <div class="card card-label" v-if="c14">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS07_5" | i18n }}</span>
        </div>
    </div>
    <!-- B8_2 -->
    <div v-if="c14">
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pl-3 pr-1 text-left">
                {{ (goWorkAtr ? "KAFS07_11" : "KAFS07_12") | i18n }}
            </div>
        </div>
    </div>
    <!-- B8_3 -->
    <div v-if="c14">
        <div class="row mt-1 mb-1">
            <div class="col-1.5 pl-3 pr-1 text-left">
                {{ (backHomeAtr ? "KAFS07_13" : "KAFS07_14") | i18n }}
            </div>
        </div>
    </div>

    <!-- B5_1 -->
    <div class="card card-label">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS10_13" | i18n }}</span>
        </div>
    </div>
    <div>
      <div
      v-for="(item, index) in holidayTimes"
        v-bind:key="index"
        :value="index"
      >  
        <div v-show="item.visible" class="row mt-1 mb-1">
            <!-- B5_2 -->
            <div class="col pl-4 textSize">
                {{item.title}}
            </div>
            <!-- B5_3 -->
            <div class="col-6">
                {{$dt.timedr(item.applicationTime)}}    
            </div>
        </div>
        <!-- B5_4 -->
        <div v-show="item.visible" class="row mt-1 mb-1">
            <div class="col ml-4">
                <div>
                      <kafs00subp1 v-bind:params="item.preApp" />
                </div>
            </div>
            <div class="col-6">
                <div>
                      <kafs00subp1 v-bind:params="item.actualApp" />
                </div>  
            </div>
        </div>
        <hr v-if="index + 1 != holidayTimes.length" class="row my-0">
       </div> 
    </div>

    <!-- B6_1 -->
    <div class="card card-label" v-if="c13">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS10_17" | i18n }}</span>
        </div>
    </div>
    <div
    v-for="(item, index) in overTimes"
    v-bind:key="index"
    :value="index"
    >   
        <div v-if="item.visible" class="row mt-1 mb-1">
            <!-- B6_2 -->
            <div class="col pl-4 textSize">
                {{item.title}}
            </div>
            <!-- B6_3 -->
            <div class="col-6">
                {{$dt.timedr(item.applicationTime)}}  
            </div>
        </div>
        <!-- B6_4 -->
        <div v-if="item.visible" class="row mt-1 mb-1">
            <div class="col ml-4">
                <div>
                      <kafs00subp1 v-bind:params="item.preApp" />
                </div>
            </div>
            <div class="col-6">
                <div>
                      <kafs00subp1 v-bind:params="item.actualApp" />
                </div>  
            </div>
        </div>
        <hr v-if="index + 1 != overTimes.length" class="row my-0">
    </div>
</div>
</template>