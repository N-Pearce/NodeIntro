const fs = require('fs')
const axios = require('axios')

function handleOutput(text, out){
    if (out){
        fs.writeFile(out, text, 'utf8', (err) => {
            if (err){
                console.error(`couldn't write ${out}: ${err}`)
                process.exit(1)
            }
        })
    } else {
    console.log(text)
    }
}

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(`Error reading ${path}: ${err}`)
            process.exit(1)
        }
        handleOutput(data, out)
    })
}

async function webCat(url){
    try {
        let resp = await axios.get(url);
        if (out)
            handleOutput(url, out)
        else
            handleOutput(resp.data, out)
    } catch (err){
        console.error(`Error reading ${url}: ${err}`)
        process.exit(1)
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}