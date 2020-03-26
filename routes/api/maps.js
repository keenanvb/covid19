const express = require('express');
const router = express.Router();
const axios = require('axios');
const csv = require('csvtojson')
const fs = require('fs');

//@route    GET api/southafrica
//@desc     Get South Africa covid19 confirmed cases data
//@access   public
router.get('/south-africa', async (req, res) => {
    try {
        const result = await getResult();
        res.send(result)
    } catch (error) {
        res.status(500).send('server error')
    }
});



const south_africa_meta_data = require('../../meta-data/south-africa.json')

/*
Get data from API source
*/
const getData = async () => {
    try {
        let res = await axios.get('https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_timeline_confirmed.csv');
        let { data } = res;
        let obj = {};
        // let arrayObj = []
        const jsonArray = await csv().fromString(data);
        jsonArray.forEach((element, index) => {
            const { province } = element

            if (obj[province] === undefined) {
                obj[province] = { cases: [element] }
                // obj[province] = [element]
            } else {
                obj[province].cases.push(element);
                // obj[province].push(element);
            }

            // if we want an array of objects
            // if (obj[province] !== undefined) {
            //     arrayObj.push(element);
            // }
        });

        return obj
    } catch (e) {
        console.log('e', e)
        // throw new Error(`Unable to get data`)
    }
}


/*
Append country info to API data source
*/
let getResult = async () => {
    try {
        const { provinces } = south_africa_meta_data
        let JSONdata = await getData();
        Object.keys(provinces).map((province) => {
            let count = JSONdata[province].cases.length
            let provinceInfo = provinces[province]
            Object.assign(JSONdata[province], { count, info: provinceInfo });
        });
        // console.log('JSONdata', JSONdata);
        // fs.writeFileSync('countries-data.json', JSON.stringify(obj));
        return JSONdata

    } catch (e) {
        console.log(e)
    }
}



module.exports = router;