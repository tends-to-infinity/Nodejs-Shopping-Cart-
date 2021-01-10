var Sport = require('../models/sport')

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

var sports = [new Sport({
    imagePath: 'https://shop.r10s.jp/racket/cabinet/item_img/4600/ynx-ax77-1.jpg',
    title: 'Yonex Rackets',
    description: 'Best for bady have good control!!',
    price: 15
}),new Sport({
    imagePath: 'https://static.10kya.com/media/catalog/product/cache/1/image/1080x/b05d625d6b6a602168d46abb7a406194/s/s/ss-ton-orange-cricket-bat-01.jpg',
    title: 'SS Bats',
    description: 'Made of good material and having good grip!!',
    price: 30
}),new Sport({
    imagePath: 'https://n1.sdlcdn.com/imgs/b/y/z/Adidas-Conext-15-Hardground-Football-SDL786822240-1-51ebe.jpg',
    title: 'Adidas Football',
    description: 'Build of good quality of rubber!!',
    price: 25
}),new Sport({
    imagePath: 'https://images.chesscomfiles.com/uploads/v1/article/17623.87bb05cd.668x375o.47d81802f1eb@2x.jpeg',
    title: 'Chess Board',
    description: 'Made of good plastic material',
    price: 15
}),new Sport({
    imagePath: 'http://pankajsports.com/products/swimming/costumes/men/1.jpg',
    title: 'Men Swimming Costumes',
    description: 'Made of good fibre matrerial!!',
    price: 40
}),new Sport({
    imagePath: 'https://cf2.s3.souqcdn.com/item/2015/12/11/97/01/12/5/item_XL_9701125_11249125.jpg',
    title: 'Carrom Board',
    description: 'Made of strong wood!!',
    price: 30
})];

var done1 = 0;

for (var i=0;i<sports.length;i++){
    sports[i].save(function(err, res){
        done1++;
        if(done === sports.length){
            exit()
        }
    });

}

function exit(){
    mongoose.disconnect();
}