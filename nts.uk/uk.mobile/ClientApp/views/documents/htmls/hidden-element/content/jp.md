##### 1. 説明
時々画面のエレメントを隠す必要がある。  
例えば、削除権がない人に削除のボタンを隠すこと。  
その時そのボタンを隠すために`.d-none`というクラスを使ってください。

##### 2. 詳細

細かい情報は下のTableに示す。

Screen Size |	Hidden | Visible
---- | ---- | ---- |
ALL | `.d-none` |  `.d-block` | 
Extra Small |  `.d-none .d-sm-block` |  `.d-block .d-sm-none` |
Small | `.d-sm-none .d-md-block` | `.d-none .d-sm-block .d-md-none` |
Medium | `.d-md-none .d-lg-block` |  `.d-none .d-md-block .d-lg-none` |
Large | `.d-lg-none .d-xl-block` |  `.d-none .d-lg-block .d-xl-none` |
Extra Large |  `.d-xl-none` | `.d-none .d-xl-block` |

