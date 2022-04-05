# UK Mobile
UK Mobile (using bootstrap).

## Required
- nodejs
## Install
1. Clone this repo
2. Open command/terminal/shell and type 3 command (for first time)
  - ```npm install```
  - ```npm run webpack:vendor```
  - ```npm run webpack```
3. Run server (and auto build)
  - ```npm run start:dev```
## Deploy as a product
1. Run two command for deploy
  - ```npm run webpack:vendor:prod```
  - ```npm run webpack:prod```
2. Copy war file in wwwroot folder to webservice.


Run Uk Mobile with other server  
```npm run start:dev -- --env.api=http://192.168.50.14:8480```