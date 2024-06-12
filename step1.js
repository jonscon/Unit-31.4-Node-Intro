const fs = require('fs');
const process = require('process');
const argv = process.argv;

function readPath(path) {
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

readPath(argv[2]);