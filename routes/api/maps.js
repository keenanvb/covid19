const express = require('express');
const router = express.Router();
const axios = require('axios');
const csv = require('csvtojson')
// const fs = require('fs');

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
        let res = await axios.all([
            axios.get(`https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_timeline_confirmed.csv`),
            axios.get(`https://raw.githubusercontent.com/dsfsi/covid19za/master/data/covid19za_provincial_cumulative_timeline_confirmed.csv`),
            // axios.get(`https://raw.githubusercontent.com/dsfsi/covid19za/master/data/health_system_za_public_hospitals.csv`)
        ]);

        let { data: confirmedData } = res[0];
        let { data: testingData } = res[1];

        let confirmedDataObj = {};

        // let arrayObj = []
        const objArrayConfirmed = await csv().fromString(confirmedData);
        const objArrayTestingData = await csv().fromString(testingData);

        objArrayConfirmed.forEach((element, index) => {
            const { province } = element

            if (confirmedDataObj[province] === undefined) {
                confirmedDataObj[province] = { cases: [element] }

            } else {
                confirmedDataObj[province].cases.push(element);

            }
            // if we want an array of objects
            // if (obj[province] !== undefined) {
            //     arrayObj.push(element);
            // }
        });

        return {
            confirmed: confirmedDataObj,
            testingData: objArrayTestingData
        }
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
        let { confirmed, testingData } = await getData();
        let testDatalastRown = testingData[testingData.length - 1];

        Object.keys(provinces).map((province) => {
            let count = confirmed[province].cases.length
            let provinceInfo = provinces[province];

            let mapProvinceCount = {
                'date': testDatalastRown.date,
                'count': testDatalastRown[province]
            };

            if (province == 'UNK') {
                mapProvinceCount = {
                    'date': testDatalastRown.date,
                    'count': testDatalastRown['UNKNOWN']
                };
            }
            Object.assign(confirmed[province], { count, info: provinceInfo, mapProvinceCount });
        });

        // Object.assign(confirmed, { testingData: testDatalastRown });
        // fs.writeFileSync('./countries-data.json', JSON.stringify(confirmed));
        return confirmed

    } catch (e) {
        console.log(e)
    }
}


module.exports = router;