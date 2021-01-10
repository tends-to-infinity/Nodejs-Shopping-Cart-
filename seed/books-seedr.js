var Book = require('../models/book')

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

var books = [new Book({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51p-lBk0WEL._SX258_BO1,204,203,200_.jpg',
    title: 'Reactjs Frontend',
    description: 'Awesome Book!!',
    price: 15
}),new Book({
    imagePath: 'https://d2sis3lil8ndrq.cloudfront.net/books/74438137-2459-4bc9-b9e3-c163ccbe5e4b.png',
    title: 'Js Novoice to Ninja',
    description: 'Having great content for beginners as well as ninjas!!',
    price: 10
}),new Book({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51%2Bp6vUygeL.jpg',
    title: 'Joy of Bootstrap',
    description: 'A book with deep content!!',
    price: 15
}),new Book({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71rNgxcJMqL.jpg',
    title: 'Balaguruswami C++',
    description: 'A complete reference for Beginners!!',
    price: 25
}),new Book({
    imagePath: 'https://booksyaari.com/media/catalog/product/cache/1/thumbnail/600x/17f82f742ffe127f42dca9de82fb58b1/d/a/data-structures-using-c-and-c.jpeg',
    title: 'Data Structrues C++',
    description: 'Have a great content must read!!',
    price: 40
}),new Book({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51xilf5QJqL._SX365_BO1,204,203,200_.jpg',
    title: 'Operating System',
    description: 'Comprises of great content for deep knowledge!!',
    price: 30
}),new Book({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51GxW8immiL.jpg',
    title: 'Machine Learning',
    description: 'Good for statistics!!',
    price: 15
}),new Book({
    imagePath: 'https://www.vikaspublishing.com/uploads/bookimages/vikas-books/9789325984370.jpg',
    title: 'Fundamentals of DBMS',
    description: 'Buy to pursue great Knowledge of DBMS!!',
    price: 10
}),new Book({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/41hz5yYxcIL._SX258_BO1,204,203,200_.jpg',
    title: 'Mean Web',
    description: 'A book for mean stack developers!!',
    price: 15
}),new Book({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/51l5XzLln%2BL._SX348_BO1,204,203,200_.jpghttps://images-na.ssl-images-amazon.com/images/I/71rNgxcJMqL.jpg',
    title: 'Coding Interview',
    description: 'A complete reference for coding interview!!',
    price: 25
}),new Book({
    imagePath: 'http://www.shroffpublishers.com/images/detailed/15/9789352136278.jpg',
    title: 'Python for everybody',
    description: 'Learn python with real life examples',
    price: 40
}),new Book({
    imagePath: 'https://www.guru99.com/images/uploads/2012/06/head-first-java-original_v1.jpg',
    title: 'Head First',
    description: 'A book with Object oriented programming',
    price: 30
})];

var done1 = 0;

for (var i=0;i<books.length;i++){
    books[i].save(function(err, res){
        done1++;
        if(done === books.length){
            exit()
        }
    });

}

function exit(){
    mongoose.disconnect();
}