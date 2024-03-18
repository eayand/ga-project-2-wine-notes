module.exports = {
    index,
}

function index(req, res) {
    res.render('home', { title: 'Wine Notes' });
}