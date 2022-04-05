<template>
  <div id="reset-pass" class="row pt-5 justify-content-md-center">
    <div class="col-lg-3 col-md-5">
      <div class="text-center page-title">{{ 'CCGS07_18' | i18n }}</div>
      <div class="text-left page-info alert-light alert">
        <div>{{ 'CCGS07_9' | i18n(model.userName) }}</div>
        <div>{{ 'CCGS07_19' | i18n }}</div>
      </div>
      <fieldset class="login-form">
        <nts-input-password
          tabindex="1"
          name="CCGS07_11"
          v-model="model.newPassword"
          v-bind:disabled="disabled"
          v-bind:constraint="validations.model.newPassword"
        />

        <form v-submit="changePass">
          <nts-input-password
            tabindex="2"
            name="CCGS07_12"
            v-model="model.newPasswordConfirm"
            v-bind:disabled="disabled"
            v-bind:constraint="validations.model.newPasswordConfirm"
          />
        </form>
        <div class="accordion mb-2" v-if="policy.isUse">
          <div class="card">
            <div class="card-header">
              <button class="btn btn-link" type="button">{{ 'CCGS07_13' | i18n }}</button>
            </div>
            <div class="collapse">
              <div class="card-body">
                <table class="password-policy">
                  <tbody>
                    <tr>
                      <td>
                        <span>{{ 'CCGS07_22' | i18n }}</span>
                      </td>
                      <td>
                        <span>{{ 'CCGS07_23' | i18n(policy.lowestDigits) }}</span>
                      </td>
                    </tr>
                    <tr
                      v-if="policy.alphabetDigit > 0 || policy.numberOfDigits > 0 || policy.symbolCharacters > 0"
                    >
                      <td>
                        <span>{{ 'CCGS07_24' | i18n }}</span>
                      </td>
                      <td>
                        <span>{{ policy.complex.map(m => $i18n(m.rid, m.params)).join('、') }}</span>
                      </td>
                    </tr>
                    <tr v-if="policy.historyCount > 0">
                      <td>
                        <span>{{ 'CCGS07_28' | i18n }}</span>
                      </td>
                      <td>
                        <span>{{ 'CCGS07_29' | i18n(policy.historyCount) }}</span>
                      </td>
                    </tr>
                    <tr v-if="policy.validPeriod > 0">
                      <td>
                        <span>{{ 'CCGS07_30' | i18n }}</span>
                      </td>
                      <td>
                        <span>{{ 'CCGS07_31' | i18n(policy.validPeriod) }}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button
          class="btn btn-primary btn-lg btn-block"
          v-click:500="changePass"
        >{{ 'CCGS07_38' | i18n }}</button>
      </fieldset>
    </div>
  </div>
</template>
