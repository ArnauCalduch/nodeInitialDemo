const db = require("../models");
const Game = db.games;
const Op = db.Sequelize.Op;

exports.play = (req,res) => {
    const userId = req.params.id;

    let success = 0;
    const dice1 = parseInt(6*Math.random()+1);
    const dice2 = parseInt(6*Math.random()+1);
    const result = dice1 + dice2;

    if(result === 7){
        success = 1;
    }

    const game = {
        userId: userId,
        dice1: dice1,
        dice2: dice2,
        success: success
    };

    Game.create(game)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the game(throw)"
        });
    });
};

exports.userGames = (req,res) => {
    const userId = req.params.id;

    Game.findAll({ where: { userId: userId } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving tutorial with id=" + userId
        });
    });
};

exports.delete = (req,res) => {
    const userId = req.params.id;

    Game.destroy({ where: { userId: userId } })
    .then(num => {
        if(true){
            res.send({
                message: `Games from user ${userId} deleted successfully`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Cannot delete games from user ${userId}`
        });
    });
};