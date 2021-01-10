var Product = require('../models/product');

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

var products = [new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51p-lBk0WEL._SX258_BO1,204,203,200_.jpg',
    title: 'Reactjs Frontend',
    description: 'Awesome Book!!',
    price: 15
}),new Product({
    imagePath: 'https://d2sis3lil8ndrq.cloudfront.net/books/74438137-2459-4bc9-b9e3-c163ccbe5e4b.png',
    title: 'Js Novoice to Ninja',
    description: 'Having great content for beginners as well as ninjas!!',
    price: 10
}),new Product({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51%2Bp6vUygeL.jpg',
    title: 'Joy of Bootstrap',
    description: 'A book with deep content!!',
    price: 15
}),new Product({
    imagePath: 'https://qph.fs.quoracdn.net/main-qimg-5e84093b30b1e8d6a54f9d6a77810399',
    title: 'NoSql With MongoDB',
    description: 'Best Book for MongoDB!!',
    price: 20
}),new Product({
    imagePath: 'http://www.shroffpublishers.com/images/detailed/15/9789352136278.jpg',
    title: 'Python For Everybody',
    description: 'A complete guide for python!!',
    price: 18
}),new Product({
    imagePath: 'https://pictures.abebooks.com/isbn/9780070667266-uk.jpg',
    title: 'Datastructures & Algorithms',
    description: 'Must buy for coding interview!!',
    price: 14
})];


var done = 0;
for (var i=0;i<products.length;i++){
    products[i].save(function(err, res){
        done++;
        if(done === products.length){
            exit()
        }
    });

}


function exit(){
    mongoose.disconnect();
}