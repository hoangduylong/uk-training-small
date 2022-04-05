<template>
    <div class="kdw003a">
        <div v-if="displayFormat == '0'" class="mt-n1 mx-n2">
            <div class="row">
                <div class="col-9 pr-1">
                    <nts-dropdown v-model="selectedEmployee">
                        <option v-for="item in lstEmployee" :value="item.id">
                            {{item.code}} &nbsp;&nbsp;&nbsp; {{item.businessName}}
                        </option>
                    </nts-dropdown>
                </div>
                <div class="col-3">
                    <button type="button" class="btn btn-primary btn-block" v-click:500="openMenu">{{'KDWS03_23' | i18n}}</button>
                </div>
            </div>
            <div class="row mt-n2">
                <div class="col-5 pr-1">
                    <nts-year-month v-model="yearMonth"/>
                </div>
                <div class="col-7">
                    <nts-dropdown v-model="actualTimeSelectedCode">
                        <option v-for="item in actualTimeOptionDisp" :value="item.code">
                            {{item.name}}
                        </option>
                    </nts-dropdown>
                </div>
            </div>
        </div>
        <div v-if="displayFormat == '1'" class="m-n2">
            <div class="row">
                <div class="col-8 pr-1">
                    <nts-date-input v-model="selectedDate" />
                </div>
                <div class="col-4 pl-1">
                    <button type="button" class="btn btn-primary btn-block" v-click:500="openMenu" v-if="dPCorrectionMenuDto.errorReferButtonDis">{{'KDWS03_76' | i18n}}</button>
                </div>
            </div>
        </div>
    
        <fix-table v-if="displayFormat == '0'" table-class="table table-bordered m-0 table-sm table-custom" class="mx-n3 mt-n2" style="font-size: 11px" :key="resetTable">
            <thead class="uk-bg-headline">
                <tr>
                    <th c-width="56" style="height: 50px; text-align:center"></th>
                    <th v-for="(item, i) of displayHeaderLst" v-bind:style="{ 'background-color': item.color}"><span class="crop-text">{{item.headerText}}</span></th>
                    <th c-width="48"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) of displayDataLstEx">
                    <td v-bind:style="{ height: rowHeight + 'px' }" v-bind:class="row.dateColor">{{row.date}}</td>
                    <td v-for="(cell, j) of row.rowData" v-bind:class="cell.class"><span :class="cell.class.includes('text-truncate') ? '' : 'crop-text'">{{cell.displayvalue}}</span></td>
                    <td>
                        <div style="text-align: right" v-click:500="() => openEdit(row.id)">
                            <span style="color: red" class="fa fa-exclamation-circle fa-lg uk-text-crimson" v-if="null != row.ERAL && row.ERAL.includes('ER')"></span>
                            <span style="color: red" class="fa fa-exclamation-triangle fa-lg uk-text-yellow" v-if="null != row.ERAL && !row.ERAL.includes('ER') && row.ERAL.includes('AL')"></span>
                            <span class="pl-1" v-if="row.date != ''">></span>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td v-bind:style="{ height: rowHeight - 4 + 'px' }">合計</td>
                    <td v-for="header in displayHeaderLst" class="row-style text-truncate" :class="Array.isArray(displaySumLst[header.key]) ? displaySumLst[header.key][1] : ''">
                        <span class="text-truncate" v-if="Array.isArray(displaySumLst[header.key])">{{displaySumLst[header.key][0]}}</span>
                        <span class="text-truncate" v-if="!Array.isArray(displaySumLst[header.key])">{{displaySumLst[header.key]}}</span>
                    </td>
                    <td></td>
                </tr>
            </tfoot>
        </fix-table>
        <fix-table v-if="displayFormat == '1'" table-class="table table-bordered m-0 table-sm table-custom" class="mx-n3 mt-n2" style="font-size: 11px" :key="resetTable">
            <thead class="uk-bg-headline">
                <tr>
                    <th c-width="58" style="height: 50px; text-align:center"></th>
                    <th v-for="(item, i) of displayHeaderLst" v-bind:style="{ 'background-color': item.color}"><span class="crop-text">{{item.headerText}}</span></th>
                    <th c-width="48"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, i) of displayDataLstEx">
                    <td v-bind:style="{ height: rowHeight + 'px' }"><span class="crop-text">{{row.employeeName}}</span></td>
                    <td v-for="(cell, j) of row.rowData" v-bind:class="cell.class"><span :class="cell.class.includes('text-truncate') ? '' : 'crop-text'">{{cell.displayvalue}}</span></td>
                    <td>
                        <div style="text-align: right" v-click:500="() => openEdit(row.id)">
                            <span style="color: red" class="fa fa-exclamation-circle fa-lg uk-text-crimson" v-if="null != row.ERAL && row.ERAL.includes('ER')"></span>
                            <span style="color: red" class="fa fa-exclamation-triangle fa-lg uk-text-yellow" v-if="null != row.ERAL && !row.ERAL.includes('ER') && row.ERAL.includes('AL')"></span>
                            <span class="pl-1" v-if="row.employeeName != ''">></span>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="d-none">
                    <td>合計</td>
                    <td v-for="value in displayHeaderLst"></td>
                    <td></td>
                </tr>
            </tfoot>
        </fix-table>
        <div class="border-top mx-n3" style="font-size: 10px" v-if="displayFormat == '1'">
            <div class="row m-2 mt-2">
                <div class="col-3 pl-1" v-bind:class="previousState">
                    <span class="mr-n1" v-click:500="previousPage">⇦前の20件</span>
                </div>
                <div class="col-6 text-center">
                    <span>{{itemStart}}～{{itemEnd}}件（{{displayDataLst.length}}件中）</span>
                </div>
                <div class="col-3 pr-1 text-right" v-bind:class="nextState">
                    <span v-click:500="nextPage">次の20件⇨</span>
                </div>
            </div>
        </div>
    </div>
</template>