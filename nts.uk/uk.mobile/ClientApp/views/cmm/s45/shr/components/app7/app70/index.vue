<template>
    <div class="cmms45shrcomponentsapp70 mb-4">
        <div v-if="(listWorkHours.length > 0) || (listTempoHours.length > 0)">
            <!-- B1 -->
            <div class="card card-label" v-if="dispTitleWorkHour">
                <div class="card-header uk-bg-accordion mt-2">
                <span>{{ "KAFS02_3" | i18n }}</span>
                </div>
            </div>

            <!-- workHours -->
            <div v-if="condition5 || listWorkHours.length > 0">
                <div v-for="itemWH in listWorkHours" :key="itemWH.frame">
                    <div class="row mt-1" v-if="(itemWH.cancelAtr || itemWH.appHours.startTime !== null || itemWH.appHours.endTime !== null)">
                        <!-- B1_1 -->
                        <div class="col-6">{{ itemWH.title | i18n }}</div>
                    </div>

                    <div class="row" v-if="(itemWH.cancelAtr || itemWH.appHours.startTime !== null || itemWH.appHours.endTime !== null)">
                        <!-- B1_2 -->
                        <div class="col-6 text-left pr-1" style="font-size: 90%">
                            <div v-if="itemWH.cancelAtr">{{ "KAFS02_5" | i18n }}</div>
                            <kafs00subp3 v-else v-bind:params="itemWH.appHours" />
                        </div>

                        <!-- B1_3 -->
                        <div class="col-6 text-left pl-1" style="font-size: 90%" v-if="dataFetch.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr === 1"><kafs00subp3 v-bind:params="itemWH.actualHours" /></div>
                    </div>
                    <div class="mt-0 mb-n2" v-if="(itemWH.cancelAtr || itemWH.appHours.startTime !== null || itemWH.appHours.endTime !== null) && itemWH.frame < listWorkHours[listWorkHours.length - 1].frame || dispHRFrame(itemWH)"><hr/></div>
                </div>
            </div>

            <!-- tempoHours -->
            <div v-if="condition4 || listTempoHours.length > 0">
                <div v-for="itemTH in listTempoHours" :key="itemTH.frame">
                    <div class="row mt-1" v-if="itemTH.cancelAtr || itemTH.appHours.startTime !== null || itemTH.appHours.endTime !== null">
                        <!-- B1_1 -->
                        <div class="col-6">{{ itemTH.title | i18n(itemTH.frame) }}</div>
                    </div>

                    <div class="row" v-if="itemTH.cancelAtr || itemTH.appHours.startTime !== null || itemTH.appHours.endTime !== null">
                        <!-- B1_2 -->
                        <div class="col-6 text-left pr-1" style="font-size: 90%">
                            <div v-if="itemTH.cancelAtr">{{ "KAFS02_5" | i18n }}</div>
                            <kafs00subp3 v-else v-bind:params="itemTH.appHours" />
                        </div>

                        <!-- B1_3 -->
                        <div class="col-6 text-left pl-1" style="font-size: 90%" v-if="dataFetch.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr === 1"><kafs00subp3 v-bind:params="itemTH.actualHours" /></div>
                    </div>

                    <div class="mt-0 mb-n2" v-if="(itemTH.cancelAtr || itemTH.appHours.startTime !== null || itemTH.appHours.endTime !== null) && itemTH.frame < listTempoHours[listTempoHours.length - 1].frame"><hr/></div>
                </div>
            </div>
        </div>

        <!-- goOutHours -->
        <div v-if="listOutingHours.length > 0">
            <!-- B2 -->
            <div class="card card-label" v-if="dispTitleOutingHour">
                <div class="card-header uk-bg-accordion mt-2">
                <span>{{ "KAFS02_8" | i18n }}</span>
                </div>
            </div>

            <!-- goOutHours -->
            <div class="mt-1">
                <div v-for="itemGH in listOutingHours" :key="itemGH.frame">
                    <div class="row" v-if="itemGH.cancelAtr || itemGH.appHours.startTime !== null || itemGH.appHours.endTime !== null">
                        <!-- B2_1 -->
                        <div class="col-6">
                            <span>{{ itemGH.title | i18n(itemGH.frame) }}</span>
                            <span v-if="itemGH.outingType !== null"> (</span>
                            <span v-if="itemGH.outingType === 0">私用</span>
                            <span v-if="itemGH.outingType === 1">公用</span>
                            <span v-if="itemGH.outingType === 2">有償</span>
                            <span v-if="itemGH.outingType === 3">組合</span>
                            <span v-if="itemGH.outingType !== null">)</span>
                        </div>
                    </div>

                    <div class="row" v-if="itemGH.cancelAtr || itemGH.appHours.startTime !== null || itemGH.appHours.endTime !== null">
                        <!-- B2_2 -->
                        <div class="col-6 text-left pr-1" style="font-size: 90%">
                            <div v-if="itemGH.cancelAtr">{{ "KAFS02_5" | i18n }}</div>
                            <kafs00subp3 v-else v-bind:params="itemGH.appHours" />
                        </div>

                        <!-- B2_3 -->
                        <div class="col-6 text-left pl-1" style="font-size: 90%" v-if="dataFetch.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr === 1"><kafs00subp3 v-bind:params="itemGH.actualHours" /></div>
                    </div>

                    <div class="mt-0 mb-n2" v-if="(itemGH.cancelAtr || itemGH.appHours.startTime !== null || itemGH.appHours.endTime !== null) && itemGH.frame < listOutingHours[listOutingHours.length - 1].frame"><hr/></div>
                </div>
            </div>
        </div>

        <!-- breakHours -->
        <div v-if="listBreakHours.length > 0">
            <!-- B2 -->
            <div class="card card-label" v-if="dispTitleBreakHour">
                <div class="card-header uk-bg-accordion mt-2">
                <span>{{ "KAFS02_11" | i18n }}</span>
                </div>
            </div>

            <!-- breakHours -->
            <div class="mt-1">
                <div v-for="itemBH in listBreakHours" :key="itemBH.frame">
                    <div class="row" v-if="itemBH.cancelAtr || itemBH.appHours.startTime !== null || itemBH.appHours.endTime !== null">
                        <!-- B3_1 -->
                        <div class="col-6">
                            <span>{{ itemBH.title | i18n(itemBH.frame) }}</span>
                        </div>
                    </div>

                    <div class="row" v-if="itemBH.cancelAtr || itemBH.appHours.startTime !== null || itemBH.appHours.endTime !== null">
                        <!-- B3_2 -->
                        <div class="col-6 text-left pr-1" style="font-size: 90%">
                            <div v-if="itemBH.cancelAtr">{{ "KAFS02_5" | i18n }}</div>
                            <kafs00subp3 v-else v-bind:params="itemBH.appHours" />
                        </div>

                        <!-- B3_3 -->
                        <div class="col-6 text-left pl-1" style="font-size: 90%" v-if="dataFetch.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr === 1"><kafs00subp3 v-bind:params="itemBH.actualHours" /></div>
                    </div>

                    <div class="mt-0 mb-n2" v-if="(itemBH.cancelAtr || itemBH.appHours.startTime !== null || itemBH.appHours.endTime !== null) && itemBH.frame < listBreakHours[listBreakHours.length - 1].frame"><hr/></div>
                </div>
            </div>
        </div>

        <!-- chidcareHours -->
        <div v-if="listParentHours.length > 0">
            <!-- B4 -->
            <div class="card card-label" v-if="dispTitleParentHour">
                <div class="card-header uk-bg-accordion mt-2">
                <span>{{ "KAFS02_13" | i18n }}</span>
                </div>
            </div>

            <!-- chidcareHours -->
            <div class="mt-1">
                <div v-for="itemCH in listParentHours" :key="itemCH.frame">
                    <div class="row" v-if="itemCH.cancelAtr || itemCH.appHours.startTime !== null || itemCH.appHours.endTime !== null">
                        <!-- B4_1 -->
                        <div class="col-6">
                            <span>{{ itemCH.title | i18n(itemCH.frame) }}</span>
                        </div>
                    </div>

                    <div class="row" v-if="itemCH.cancelAtr || itemCH.appHours.startTime !== null || itemCH.appHours.endTime !== null">
                        <!-- B4_2 -->
                        <div class="col-6 text-left pr-1" style="font-size: 90%">
                            <div v-if="itemCH.cancelAtr">{{ "KAFS02_5" | i18n }}</div>
                            <kafs00subp3 v-else v-bind:params="itemCH.appHours" />
                        </div>

                        <!-- B4_3 -->
                        <div class="col-6 text-left pl-1" style="font-size: 90%" v-if="dataFetch.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr === 1"><kafs00subp3 v-bind:params="itemCH.actualHours" /></div>
                    </div>

                    <div class="mt-0 mb-n2" v-if="(itemCH.cancelAtr || itemCH.appHours.startTime !== null || itemCH.appHours.endTime !== null) && itemCH.frame < listParentHours[listParentHours.length - 1].frame"><hr/></div>
                </div>
            </div>
        </div>

        <!-- longTermHours -->
        <div v-if="listNursingHours.length > 0">
            <!-- B5 -->
            <div class="card card-label" v-if="dispTitleNursingHour">
                <div class="card-header uk-bg-accordion mt-2">
                <span>{{ "KAFS02_15" | i18n }}</span>
                </div>
            </div>

            <!-- longTermHours -->
            <div class="mt-1">
                <div v-for="itemLH in listNursingHours" :key="itemLH.frame">
                    <div class="row" v-if="itemLH.cancelAtr || itemLH.appHours.startTime !== null || itemLH.appHours.endTime !== null">
                        <!-- B5_1 -->
                        <div class="col-6">
                            <span>{{ itemLH.title | i18n(itemLH.frame) }}</span>
                        </div>
                    </div>

                    <div class="row" v-if="itemLH.cancelAtr || itemLH.appHours.startTime !== null || itemLH.appHours.endTime !== null">
                        <!-- B5_2 -->
                        <div class="col-6 text-left pr-1" style="font-size: 90%">
                            <div v-if="itemLH.cancelAtr">{{ "KAFS02_5" | i18n }}</div>
                            <kafs00subp3 v-else v-bind:params="itemLH.appHours" />
                        </div>

                        <!-- B5_3 -->
                        <div class="col-6 text-left pl-1" style="font-size: 90%" v-if="dataFetch.appDispInfoStartupOutput.appDetailScreenInfo.application.prePostAtr === 1"><kafs00subp3 v-bind:params="itemLH.actualHours" /></div>
                    </div>

                    <div class="mt-0 mb-n2" v-if="(itemLH.cancelAtr || itemLH.appHours.startTime !== null || itemLH.appHours.endTime !== null) && itemLH.frame < listNursingHours[listNursingHours.length - 1].frame"><hr/></div>
                </div>
            </div>
        </div>
    </div>
</template>