class siteRouter {
    index(req, res) {
        res.send('Hello World') ;
    }
}

module.exports = new siteRouter();