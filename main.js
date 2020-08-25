const fs = require('fs');
const superagent = require('superagent');

const JsonRaw = fs.readFileSync('./download-config.json', 'utf8');
const config = JSON.parse(JsonRaw);

const downloadImage = async (url, filename) => {
    return new Promise((resolve, reject) => {
        const filePath = (__dirname + `${config.path}/${filename}.jpg`);

        superagent
            .get(url, (err, res) => {
                if (err) { reject("error downloading file") }
                fs.writeFile(filePath, res.body, () => {
                    console.log("File downloaded");
                })
            })
    })
}

const getDogPic = async (data) => {
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    return res.body.message;
}


(async () => {

    for (let i = 1; i <= config.count; i++) {
        downloadImage(await getDogPic(config.breed), `img_${i}`).catch(e => { console.log(e) });
    }
})();