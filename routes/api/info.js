var router = require('express').Router();
const axios = require("axios").default;
const cron = require("node-cron");


router.post('/info', (req, res, next) => {
    const url = req.body.url;

    return getHeaderOfUrl(url).then((result) => {
        res.send(result);
    });
});

router.post('/infoCron', (req, res, next) => {
    const url = req.body.url;
    const exp = req.body.cronExpression;

    return startScheduleToGetHeaderInformation(exp, url).then(() => {
        res.send({ status: 'running' });
    });
});


/**
 * Return headers of specific call.
 *
 * @param {*} url url to get information
 * @return {*} headers
 */
const getHeaderOfUrl = async (url) => {
    try {
        const response = await axios.get(url);
        console.log({ url: url, status: response.status });
        return response.headers;
    } catch (error) {
        console.log(error);
    }
};

/**
 * create an cron schedule according to specific expressión
 *
 * @param {*} expression cron expression
 * @param {*} url url to get header information
 */
const startScheduleToGetHeaderInformation = async (expression, url) => {
    try {
        cron.schedule(expression, () => {
            getHeaderOfUrl(url);
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = router;