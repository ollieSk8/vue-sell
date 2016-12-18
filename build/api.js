exports.setApi=function(app,apiRouters){
	var appData = require('../data.json');
	var seller = appData.seller;
	var goods = appData.goods;
	var ratings = appData.ratings;
	apiRouters.get('/seller',function(req,res){
		res.json({
			errno:0,
			data:seller
		});
	});
	apiRouters.get('/goods',function(req,res){
		res.json({
			errno:0,
			data:goods
		});
	});
	apiRouters.get('/ratings',function(req,res){
		res.json({
			errno:0,
			data:ratings
		});
	});
	app.use('/api',apiRouters);
};