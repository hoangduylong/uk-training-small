<template>
  <div class="documentscontrolsapproved-status">
    <h5>1. {{'sample' | i18n}}</h5>
    <approved v-model="selected">
      <template v-slot:buttons>
        <button class="uk-apply-reflected">済</button>
        <button class="uk-apply-approved">済</button>
        <button class="uk-apply-denial">済</button>
        <button class="uk-apply-return">済</button>
        <button class="uk-apply-cancel">済</button>
      </template>
      <template v-slot:popovers>
        <template v-if="selected == 0">
          <div class="mb-1">フェーズ１は承認処理が完了しています。</div>
          <table class="table table-sm table-bordered m-0 bg-white">
            <tbody>
              <tr>
                <td></td>
                <td>日通 太郎</td>
              </tr>
              <tr>
                <td>
                  <i class="fa fa-check"></i>
                </td>
                <td>
                  <div>日通・パンツェッタ・ジローラモ・二十二郎</div>
                  <div class="detail-comment">承認します。がんばれ。</div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td>日通 三郎</td>
              </tr>
            </tbody>
          </table>
        </template>
        <template v-else-if="selected == 1">
          <div class="mb-1">フェーズ２は承認処理が完了しています。</div>
          <table class="table table-sm table-bordered m-0 bg-white">
            <tbody>
              <tr>
                <td class="text-center">
                  <i class="fa fa-check"></i>
                </td>
                <td>チャーリーブラウン</td>
              </tr>
              <tr>
                <td></td>
                <td>ライナス</td>
              </tr>
              <tr>
                <td></td>
                <td>サリー</td>
              </tr>
            </tbody>
          </table>
        </template>
        <template v-else-if="selected == 2">
          <div class="mb-1">フェーズ３は承認処理が完了しています。</div>
        </template>
        <template v-else-if="selected == 3">
          <div class="mb-1">フェーズ４は承認処理が完了しています。</div>
        </template>
        <template v-else-if="selected == 4">
          <div class="mb-1">フェーズ５は承認処理が完了しています。</div>
        </template>
      </template>
    </approved>
    <markdown/>
  </div>
</template>