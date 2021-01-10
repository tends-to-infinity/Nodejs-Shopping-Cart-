var Electronic = require('../models/electronic')

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

var electronics = [new Electronic({
    imagePath: 'https://n2.sdlcdn.com/imgs/e/u/6/SDL851507089_1_-839ce.jpg',
    title: 'Electric Induction',
    description: 'Have a nice look with screen touch functioning!!',
    price: 40
}),new Electronic({
    imagePath: 'https://dam.which.co.uk/4d7b397f-f0bb-4a6e-8a68-1b00ba026292.jpg',
    title: 'Electric Heater',
    description: 'Less electricity consumption',
    price: 50
}),new Electronic({
    imagePath: 'https://cf-catman.infibeam.net/img/m1/abab/8841726/95/38/orientelectricfabripress1000wironoriginalimaevtgybmxep3rv.jpeg.aa95384f6f.999x600x550.jpg',
    title: 'Electric Iron',
    description: 'Having a nice surface',
    price: 35
}),new Electronic({
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71uVGHQlccL._SL1500_.jpg',
    title: 'Washing Machines',
    description: 'Automatic washing with no noise',
    price: 90
}),new Electronic({
    imagePath: 'https://image3.mouthshut.com/images/imagesp/925892567s.jpg',
    title: 'Orient electric cooler',
    description: 'Nice air cooling with rotaion functioning',
    price: 80
}),new Electronic({
    imagePath: 'https://www.bpl.in/wp-content/uploads/2018/09/angle-1.jpg',
    title: 'Samsung Refridgerator',
    description: 'BPL 564L Frost Free Side-by-Side Refrigerator',
    price: 150
})];

var done1 = 0;

for (var i=0;i<electronics.length;i++){
    electronics[i].save(function(err, res){
        done1++;
        if(done === electronics.length){
            exit()
        }
    });

}

function exit(){
    mongoose.disconnect();
}