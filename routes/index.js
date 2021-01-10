var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Game = require('../models/game');
var Cart = require('../models/cart')
var Order = require('../models/order')
var Book = require('../models/book')
var Sport = require('../models/sport')
var Electronic = require('../models/electronic')

/* GET home page. */
router.get('/', function(req, res, next) {

  var successMsg = req.flash('success')[0];
    res.render('shop/index', { title: 'shopping cart', successMsg: successMsg, noMessages: !successMsg});
  
});

router.get('/shopping/games/', function(req, res, next) {
  Game.find(function(err,docs) {
  var successMsg = req.flash('success')[0];
  var productChunks = [];
  var chunkSize = 3;
  console.log(docs)
  for (var i = 0; i < docs.length; i += chunkSize) {
    productChunks.push(docs.slice(i,i+chunkSize));
  }
    res.render('shop/games', { title: 'shopping cart', products: productChunks,successMsg: successMsg, noMessages: !successMsg});
  });
});

router.get('/add-to-cart/games/:id',function(req,res,next){
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : {})
 
  Game.findById(productId, function(err, product){
    if(err){
      return res.redirect('/')
    }
    cart.add(product, product.id)
    req.session.cart = cart
   // console.log(cart.generateArray())
    res.redirect('/shopping/games/')
  })
 })


 // books
 router.get('/shopping/books/', function(req, res, next) {
  Book.find(function(err,docs) {
  var successMsg = req.flash('success')[0];
  var productChunks = [];
  var chunkSize = 3;
  console.log(docs)
  for (var i = 0; i < docs.length; i += chunkSize) {
    productChunks.push(docs.slice(i,i+chunkSize));
  }
    res.render('shop/books', { title: 'shopping cart', products: productChunks,successMsg: successMsg, noMessages: !successMsg});
  });
});

router.get('/add-to-cart/books/:id',function(req,res,next){
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : {})
 
  Book.findById(productId, function(err, product){
    if(err){
      return res.redirect('/')
    }
    cart.add(product, product.id)
    req.session.cart = cart
   // console.log(cart.generateArray())
    res.redirect('/shopping/books/')
  })
 })

 // Sport

 router.get('/shopping/sports/', function(req, res, next) {
  Sport.find(function(err,docs) {
  var successMsg = req.flash('success')[0];
  var productChunks = [];
  var chunkSize = 3;
  console.log(docs)
  for (var i = 0; i < docs.length; i += chunkSize) {
    productChunks.push(docs.slice(i,i+chunkSize));
  }
    res.render('shop/sports', { title: 'shopping cart', products: productChunks,successMsg: successMsg, noMessages: !successMsg});
  });
});

router.get('/add-to-cart/sports/:id',function(req,res,next){
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : {})
 
  Sport.findById(productId, function(err, product){
    if(err){
      return res.redirect('/')
    }
    console.log(product)
    cart.add(product, product.id)
    req.session.cart = cart
   // console.log(cart.generateArray())
    res.redirect('/shopping/sports/')
  })
 })

 // Electronics

 router.get('/shopping/electronics/', function(req, res, next) {
  Electronic.find(function(err,docs) {
  var successMsg = req.flash('success')[0];
  var productChunks = [];
  var chunkSize = 3;
  console.log(docs)
  for (var i = 0; i < docs.length; i += chunkSize) {
    productChunks.push(docs.slice(i,i+chunkSize));
  }
    res.render('shop/electronics', { title: 'shopping cart', products: productChunks,successMsg: successMsg, noMessages: !successMsg});
  });
});

router.get('/add-to-cart/electronics/:id',function(req,res,next){
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : {})
 
  Electronic.findById(productId, function(err, product){
    if(err){
      return res.redirect('/')
    }
    cart.add(product, product.id)
    req.session.cart = cart
   // console.log(cart.generateArray())
    res.redirect('/shopping/electronics/')
  })
 })

router.get('/reduce/:id',function(req,res,next){
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : {})

  cart.reduceByOne(productId)
  req.session.cart = cart
  res.redirect('/shopping-cart')
})

router.get('/remove/:id',function(req,res,next){
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : {})

  cart.removeItem(productId)
  req.session.cart = cart
  res.redirect('/shopping-cart')
})

router.get('/shopping-cart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products: null})
  }
  var cart = new Cart(req.session.cart)
  res.render('shop/shopping-cart',{products: cart.generateArray(), totalPrice: cart.totalPrice})
})

router.get('/checkout',isLoggedIn, function(req,res,next){
  if(!req.session.cart){
    return res.redirect('/shopping-cart')
  }
  var cart = new Cart(req.session.cart)
  var errMsg = req.flash('error')[0]; 
  res.render('shop/checkout',{total:cart.totalPrice,errMsg: errMsg, noError: !errMsg})
})

router.post('/checkout', isLoggedIn ,function(req, res, next) {
  if (!req.session.cart) {
      return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  
  var stripe = require("stripe")(
      'sk_test_3BhvjEI075fy8Pk3OZwTflWR00PYyyFQiS'
  );

  stripe.charges.create({
      amount: cart.totalPrice * 100,
      currency: "usd",
      source: req.body.stripeToken, // obtained with Stripe.js
      description: "Test Charge"
  }, function(err, charge) {
      if (err) {
          req.flash('error', err.message);
          return res.redirect('/checkout');
      }
      var order = new Order({
        user: req.user,
        cart: cart,
        address: req.body.address,
        name: req.body.name,
        paymentId: charge.id
      })
      order.save(function(err, result){
        req.flash('success', 'Successfully bought product!');
        req.session.cart = null;
        res.redirect('/');
      })
  }); 
});

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
      return next()
  }
  req.session.oldUrl = req.url
  res.redirect('/user/signin')
}