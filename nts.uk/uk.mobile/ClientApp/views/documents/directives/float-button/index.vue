<template>
  <div class="documentsdirectivesfloat-button">
    <div class="fixed-action-btn" v-float-action="{ icon: 'fas fa-pen', background: 'bg-brown-500', forceground: '' }">
      <ul>
        <li class="btn-info">
          <span>{{'vote_app' | i18n}}</span>
          <i class="fas fa-star"></i>
        </li>
        <li class="btn-primary">
          <span>{{'manager_users' | i18n}}</span>
          <i class="fas fa-user"></i>
        </li>
        <li class="btn-success">
          <span>{{'go_to_mail' | i18n}}</span>
          <i class="fas fa-envelope"></i>
        </li>
        <li class="btn-warning">
          <span>{{'go_to_cart' | i18n}}</span>
          <i class="fas fa-shopping-cart"></i>
        </li>
      </ul>
    </div>

    <markdown/>
  </div>
</template>