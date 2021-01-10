var Game = require('../models/game')

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopping',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

var games = [new Game({
    imagePath: 'https://i.ytimg.com/vi/aeNRhnoAiis/maxresdefault.jpg',
    title: 'Rocket League',
    description: 'Awesome Game!!',
    price: 25
}),new Game({
    imagePath: 'https://i.ytimg.com/vi/QsaDnirsCSs/maxresdefault.jpg',
    title: 'CS GO',
    description: 'Best game with battlefield!!',
    price: 30
}),new Game({
    imagePath: 'https://www.pubgmobile.com/en-US/images/slide_img1.jpg',
    title: 'PUBG',
    description: 'Player Unknown Battle ground!!',
    price: 40
}),new Game({
    imagePath: 'https://i.ytimg.com/vi/2lcJMaptofQ/maxresdefault.jpg',
    title: 'BattleField1',
    description: 'Best battlefield game with high graphics!!',
    price: 50
}),new Game({
    imagePath: 'https://i.ytimg.com/vi/QsaDnirsCSs/maxresdefault.jpg',
    title: 'BattleField2',
    description: 'Best game with battlefield!!',
    price: 60
}),new Game({
    imagePath: 'https://i.ytimg.com/vi/BGEl6Lh7Gk8/maxresdefault.jpg',
    title: 'BattleFiels5',
    description: 'Having higher graphics and good controls!!',
    price: 35
})];

var done1 = 0;
for (var i=0;i<games.length;i++){
    games[i].save(function(err, res){
        done1++;
        if(done === games.length){
            exit()
        }
    });

}

function exit(){
    mongoose.disconnect();
}