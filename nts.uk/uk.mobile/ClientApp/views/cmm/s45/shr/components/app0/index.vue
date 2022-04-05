<template>
<div class="cmms45shrcomponentsapp0">
    <!-- B1_1 -->
    <div class="card card-label" v-if="c3">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS05_63" | i18n }}</span>
        </div>
    </div>
    <div v-if="c3">
        <!-- B1_2 -->
        <div class="row mt-1 mb-1">
            <div class="col-12 pl-3 textSize">{{"KAFS05_64" | i18n}}</div>
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
            <div class="col-12 pl-3 textSize"> {{"KAFS05_65" | i18n}} </div>
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
    <div class="card card-label" v-if="c3">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS05_66" | i18n }}</span>
        </div>
    </div>
    <!-- B2_2 -->
    <div v-if="c3">
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
    <div class="card card-label" v-if="c3_1">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS05_67" | i18n }}</span>
        </div>
    </div>
    <!-- B3_2 -->
    <div v-if="c3_1">
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
    <div class="card card-label" v-if="c3">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS05_68" | i18n }}</span>
        </div>
    </div>
    <div v-if="c3">
        <div v-if="isEmptyBreakTime">{{'KAFS05_54' | i18n}}</div>
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

    <!-- B5_1 -->
    <div class="card card-label" v-if="c4">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS05_70" | i18n }}</span>
        </div>
    </div>
    <div
    v-for="(item, index) in overTimes"
    v-bind:key="index"
    :value="index"
    >   
        <div v-if="c4" class="row mt-1 mb-1">
            <!-- B5_2_1 -->
            <div class="col pl-4 textSize">
                {{item.title}}
            </div>
            <!-- B5_2_2 -->
            <div class="col-6">
                {{$dt.timedr(item.applicationTime)}}  
            </div>
        </div>

        <div v-if="c4_1 && c4" class="row mt-1 mb-1">
            <!-- B5_2_3 -->
            <div class="col ml-4">
                <div>
                      <kafs00subp1 v-bind:params="item.preApp" />
                </div>
            </div>
            <!-- B5_2_4 -->
            <div class="col-6">
                <div>
                      <kafs00subp1 v-bind:params="item.actualApp" />
                </div>  
            </div>
        </div>
        <hr v-if="index + 1 != overTimes.length" class="row my-0">
    </div>




    <!-- B6_1 -->
    <div class="card card-label" v-if="c18">
        <div class="card-header uk-bg-accordion mt-2 headerDiv">
            <span class="textPosition">{{ "KAFS05_73" | i18n }}</span>
        </div>
    </div>
    <div v-if="c18">
      <div
      v-for="(item, index) in holidayTimes"
        v-bind:key="index"
        :value="index"
      >  
        <div class="row mt-1 mb-1">
            <!-- B6_2_1 -->
            <div class="col pl-4 textSize">
                {{item.title}}
            </div>
            <!-- B6_2_2 -->
            <div class="col-6">
                {{$dt.timedr(item.applicationTime)}}    
            </div>
        </div>

        <div v-if="c4_1" class="row mt-1 mb-1">
            <!-- B6_2_3 -->
            <div class="col ml-4">
                <div>
                      <kafs00subp1 v-bind:params="item.preApp" />
                </div>
            </div>
            <!-- B6_2_4 -->
            <div class="col-6">
                <div>
                      <kafs00subp1 v-bind:params="item.actualApp" />
                </div>  
            </div>
        </div>
        <hr v-if="index + 1 != holidayTimes.length" class="row my-0">
       </div> 
    </div>

</div>
</template>