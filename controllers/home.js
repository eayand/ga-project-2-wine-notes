module.exports = {
    index,
}

function index(req, res) {
    console.log('home ctrl: ', req.params.user)
    res.render('home', { title: 'Wine Notes' });
}