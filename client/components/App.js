import React from 'react'
import "@babel/polyfill";
import axios from 'axios'
import { ChampionCard } from './ChampionCard'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            champions: [],
            filters: [],
            assassin: false,
        }
        this.getFilters = this.getFilters.bind(this);
        this.changeState = this.changeState.bind(this);
    }
    async componentDidMount() {
        try {
            if(!this.state.champions.length) {
                const champions = await axios.get("http://localhost:3000/api/champions");
                this.setState({ champions: champions.data })
            };
        } catch (err) {
            console.log(err)
        }
    }
    getFilters(ev) {
        ev.preventDefault();
        console.log('test')
        const checkboxes = document.querySelectorAll("input:checked");
        const filters = [];

        checkboxes.forEach(checkbox => {
            filters.push(checkbox.value);
        });
        this.setState({ filters })
    }
    changeState(tag) {
        return (ev) => this.setState({ [tag]: !this.state[tag] })
    }
    render() {
        const { champions, filters } = this.state;
        console.log(filters)
        const { getFilters, changeState } = this;
        const filteredChampions = filters.length ? champions.filter(champion => {
            for (const tag of filters) {
                if (champion.tags.includes(tag)) {
                    return true;
                }
            }
        }): champions;
        return filteredChampions.length ? (
            <main id="main">
                <h2 id="title">Free Rotation Champions:</h2>
                <div id="championCards">
                    {
                        filteredChampions.map(champion => {
                            return (
                                <div key={`champion_${champion.id}`}>
                                    <ChampionCard champion={champion}/>
                                </div>
                            )
                        })
                    }
                </div>
                <div id="filter">
                    <h3 id="title" className="smallerTitle">Filter by tags:</h3>
                    <form onSubmit={ getFilters }>
                        <div id="assassin">
                            <input type="checkbox" name="filter" value="Assassin" onChange={ changeState('Assassin')} />
                            <label className="assassin">Assassin</label>
                        </div>
                        <div id="fighter">
                            <input type="checkbox" name="filter" value="Fighter" onChange={ changeState('Fighter')} />
                            <label className="Fighter">Fighter</label>
                        </div>
                        <div id="mage">
                            <input type="checkbox" name="filter" value="Mage" onChange={ changeState('Mage')} />
                            <label className="Mage">Mage</label>
                        </div>
                        <div id="marksman">
                            <input type="checkbox" name="filter" value="Marksman" onChange={ changeState('Marksman')} />
                            <label className="Marksman">Marksman</label>
                        </div>
                        <div id="support">
                            <input type="checkbox" name="filter" value="Support" onChange={ changeState('Support')} />
                            <label className="Support">Support</label>
                        </div>
                        <div id="tank">
                            <input type="checkbox" name="filter" value="Tank" onChange={ changeState('Tank')} />
                            <label className="Tank">Tank</label>
                        </div>
                        <div id="button">
                            <button>Filter</button>
                        </div>
                    </form>
                </div>
            </main>
        ) : <div className="error">The Champions did not load, we are sorry.</div>;
    }
}

export default App;
