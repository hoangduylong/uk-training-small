<template>
    <div class="kdws03c py-0">
        <div class="modal-header rounded-0 d-block p-0">
            <div class="uk-bg-teal py-2">
                <h4 class="col-4 modal-title text-white" v-on:click="$close">
                    <i class="fas fa-angle-left mr-1"></i>
                    <span>{{ 'KDWS03_75' | i18n }}</span>
                </h4>
            </div>
        </div>
    <div class="uk-text-quote py-2 mx-n3 uk-bg-white-smoke">
      <div class="pl-2"><span>{{'KDWS03_6' | i18n}}</span></div>
    </div>

        <div class="card card-label">
            <div class="card-header pl-0 pr-0 uk-bg-light-coral">
                <span>{{'KDWS03_39' | i18n}}</span>
            </div>
    
            <div class="card-body">
                <ul class="list-group list-group-selection m-n3">
                    <li class="list-group-item pl-2" v-for="item in displayData" v-click:500="() => openErrorList(item.employeeId)">{{item.employeeName}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>