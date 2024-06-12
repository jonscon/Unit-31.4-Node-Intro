const fs = require('fs');
const process = require('process');
const axios = require('axios');
const argv = process.argv;

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle possible error
            console.error(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
        // otherwise success
        console.log(`file contents: ${data}`);
    })
    console.log('reading file');
}

async function webCat(url) {
    try {
        let response = await axios.get(url);
        console.log(response.data);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
    
}
let arg = argv[2];
if (arg.slice(0,4) === 'http') {
    webCat(arg);
}
else {
    cat(arg)
}
