<template>
  <div class="documentsdirectivesfxtable">
    <h5>1. {{'sample' | i18n}}</h5>
    <button class="btn btn-primary" v-on:click="insertItem">{{'add_new' | i18n}}</button>
    <button class="btn btn-primary" v-on:click="changeBindValue">{{'change_binding' | i18n}}</button>
    <table class="table table-bordered" v-fxtable="fixed">
      <thead>
        <tr>
          <th class="pl-0 pr-0 text-center">#</th>
          <th class="pl-0 pr-0 text-center">ID</th>
          <th>Name</th>
          <th>Address</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
          <template v-for="(item, k) in items">
            <tr v-bind:key="k" v-bind:data-id="k">
              <td class="text-danger pl-0 pr-0 text-center">{{k + 1}}</td>
              <td class="text-danger pl-0 pr-0 text-center">{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.address}}</td>
              <td class="text-center" v-on:click="removeItem(item)"><i class="fa fa-remove"></i></td>
            </tr>
          </template>
      </tbody>
      <tfoot>
        <tr>
          <th class="pl-0 pr-0 text-center">#</th>
          <th class="pl-0 pr-0 text-center">ID</th>
          <th>Name</th>
          <th>Address</th>
          <th></th>
        </tr>
      </tfoot>
    </table>
    <markdown/>
  </div>
</template>