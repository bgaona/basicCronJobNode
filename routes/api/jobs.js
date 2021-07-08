var router = require('express').Router();

const availbleJobs = [
    {
        id: 1,
        name: "pingUrl",
        description: "ping a website and scrape the headers",
    }
];

router.get('/jobs', (req, res, next) => res.send(availbleJobs));

module.exports = router;