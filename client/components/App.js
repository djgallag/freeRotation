import React from 'react'
import "@babel/polyfill";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getChampions } from "../store/championsReducer";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            champions: [],
            filters: []
        }
    }
    componentDidMount() {
        this.props.getChampions();
        console.log('this works', this.props)
    }
    render() {
        const { champions } = this.props;
        return champions ? (
            <div>
                <h3>Free Rotation Champions:</h3>
                <div id="championCards">
                    {
                        champions.map(champion => {
                            return (
                                <div key={`champion_${champion.name}`}>
                                    Champion: {champion}
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

const mapState = ({ champions }) => ({
    champions
});

const mapDispatch = (dispatch) => ({
    getChampions: () => dispatch(getChampions()),
});

export default connect(mapState, mapDispatch)(App);

//<ChampionCard champion={champion}/>
