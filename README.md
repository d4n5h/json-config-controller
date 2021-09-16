# json-config-controller

 Controls .json files with a deep proxy

## Install

```$ npm install json-config-controller```

## Example

```javascript
const configController = require('json-config-controller');
const cc = new configController("./config.json");

const config = cc.data;

// Create a listener for property change
cc.on('port', (data)=>{
    console.log(data)
})

config.port = 3000; // Will automatically be saved in the config.json file
```
