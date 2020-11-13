const Sequelize = require('sequelize');
const db = require('../database');

const Champion = db.define('champion', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tags: {
        type: Sequelize.ARRAY(Sequelize.ENUM('Mage', 'Assassin', 'Fighter', 'Tank', 'Support', 'Marksman')),
    },
    imageUrl: {
        type: Sequelize.STRING,
        defaultValue: '/#',
    },
});

module.exports = Champion;
