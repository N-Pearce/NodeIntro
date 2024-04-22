const fs = require('fs')
const axios = require('axios')

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(err)
            process.exit(1)
        }
        console.log(data)
    })
}

async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(resp.data)
    } catch (err){
        console.error(`Error reading ${url}: ${err}`)
        process.exit(1)
    }

}

arg = process.argv[2]

if (arg.slice(0,4) === 'http'){
    webCat(arg)
} else {
    cat(arg)
}