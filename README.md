# json-config-controller

 Controls .json files with a deep proxy

## Install

```$ npm install json-config-controller```

## Example

```javascript
const configController = require('json-config-controller');
const config = new configController("./config.json");

config.port = 3000; // Will automatically be saved in the config.json file
```
