
function HomeRoute(req, res){
    res.json({
        message: 'Server is running...'
    })
}

module.exports = {
    HomeRoute
}