import React from 'react'
import "@babel/polyfill";
import axios from 'axios'



class App extends React.Component {
    constructor() {
        super();
        this.state = {
            champions: [],
            filters: []
        }
    }
    async componentDidMount() {
        try {
            if(!this.state.champions.length) {
                const champions = await axios.get("http://localhost:3000/api/champions");
                console.log('here', champions)
                this.setState({ champions: champions.data })
            };
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        const { champions } = this.state;
        console.log('render', champions)
        return champions.length ? (
            <div>
                <h3>Free Rotation Champions:</h3>
                <div id="championCards">
                    {
                        champions.map(champion => {
                            return (
                                <div key={`champion_${champion.name}`}>
                                    Champion: {champion.name}
                                </div>
                            )
                        })
                    }
                </div>
                    <h3>Filter by tags:</h3>
                    <div>
                        <button>Filter</button>
                    </div>
                <div>

                </div>
            </div>
        ) : <div>Hello There</div>;
    }
}

export default App;

//<ChampionCard champion={champion}/>
