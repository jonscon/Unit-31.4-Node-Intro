const fs = require('fs');
const process = require('process');
const axios = require('axios');
const argv = process.argv;

// Write to the new output file or print the contents of the input file, based on the arguments
function handleOutput(text, output) {
    // If there is an output file, write to the the output file
    if (output) {
        fs.writeFile(output, text, 'utf8', function(err) {
            if (err) {
                console.log(err);
                process.exit(1);
            }
            console.log('Successfully wrote to file!')
        });
    }
    // Else, just print out the contents of the input file
    else {
        console.log(text);
    }
}

// Read the contents of a local file
function cat(path, out) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle possible error
            console.error(err);
            // kill the process and tell the shell it errored
            process.exit(1);
        }
        else {
            handleOutput(data, out);
        }
    })
    console.log('reading file');
}

// Read the contents of a URL
async function webCat(url, out) {
    try {
        let response = await axios.get(url);
        handleOutput(response.data, out);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}

let path;
let out;

if (argv[2] === '--out') {
    path = argv[4];
    out = argv[3];
}
else {
    path = argv[2];
}
if (path.slice(0, 4) === 'http') {
    webCat(path, out);
}
else { 
    cat(path, out);
}

