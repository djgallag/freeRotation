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
            <div>
                <h3>Free Rotation Champions:</h3>
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
                    <h3>Filter by tags:</h3>
                    <form onSubmit={ getFilters }>
                        <input type="checkbox" name="filter" value="Assassin" onChange={ changeState('Assassin')} />
                        <label className="assassin">Assassin</label>
                        <input type="checkbox" name="filter" value="Fighter" onChange={ changeState('Fighter')} />
                        <label className="Fighter">Fighter</label>
                        <input type="checkbox" name="filter" value="Mage" onChange={ changeState('Mage')} />
                        <label className="Mage">Mage</label>
                        <input type="checkbox" name="filter" value="Marksman" onChange={ changeState('Marksman')} />
                        <label className="Marksman">Marksman</label>
                        <input type="checkbox" name="filter" value="Support" onChange={ changeState('Support')} />
                        <label className="Support">Support</label>
                        <input type="checkbox" name="filter" value="Tank" onChange={ changeState('Tank')} />
                        <label className="Tank">Tank</label>
                        <button>Filter</button>
                    </form>
                <div>

                </div>
            </div>
        ) : <div>The Champions did not load, we are sorry.</div>;
    }
}

export default App;
