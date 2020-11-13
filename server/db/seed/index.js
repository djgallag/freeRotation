const { green, red } = require('chalk');
const { db, Champion } = require('../index')
const axios = require('axios');
const apiKey = require('../../../api');


const currentPatch = async() => {
    const response = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
    return response.data[0];
}

const freeRotations = async () => {
    const response = await axios.get(`https://na1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${apiKey}`);
    return response.data.freeChampionIds;
}

const getChampions = async (patch) => {
    try {
        const response = await axios.get(`http://ddragon.leagueoflegends.com/cdn/${patch}/data/en_US/champion.json`);
        return response.data.data;
    } catch(err) {
        console.log(err);
    }
}


const seed = async () => {
    try{
        await db.sync({ force: true })

        const freeRotation = await freeRotations();
        const patch = await currentPatch();
        const allChampions = await getChampions(patch);

        const champions = [];
        for (const [key, value] of Object.entries(allChampions)) {
            if(freeRotation.includes(Number(value.key))) {
                champions.push(value);
            }
        }

        champions.forEach(champion => {
            Champion.create({
                name: champion.id,
                title: champion.title,
                tags: champion.tags,
                imageUrl: `/tiles/${champion.id}_0.jpg`
            })
        })

        console.log(green('db successfully seeded'));
    }catch(err) {
        console.log(red(err))
    }
}

seed();

module.exports = seed;
