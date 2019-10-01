import React, { Component } from 'react'
import './TFTBuilder.css'

import Grid from '../../components/Grid/Grid'
import Shop from '../Shop/Shop'
import Modal from '../../components/UI/Modal/Modal'
import ChampionDetails from '../../components/Champion/ChampionDetails/ChampionDetails'
import SynrgiesArea from '../../components/Synergy/SynergiesArea/SynergiesArea'
import ItemsArea from '../../components/Item/ItemsArea/ItemsArea'

import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'
import axios from 'axios'

class TFTBuilder extends Component {
    state = {
        champions: [],
        shopChampions: [],
        synergies: [],
        items: [],
        clickedChamp: null,
        buildId: null
    }

    componentDidMount() {
        axios.get('/champion')
            .then(res => this.setState({ shopChampions: res.data }))
            .catch(err =>
                console.log(err));

        axios.get('/synergy')
            .then(res => this.setState({ synergies: res.data }))
            .catch(err =>
                console.log(err));

        axios.get('/item')
            .then(res => this.setState({ items: res.data }))
            .catch(err =>
                console.log(err));

        if (this.props.location.build) {
            this.setState({champions:this.props.location.build});
        }
    }

    addChampion = (name) => {
        this.setState(prevState => {
            let emptyCell = null;
            let cells = prevState.champions.map(element => element.cell);

            for (let i = 0; i < 21; i++)
                if (cells.indexOf(i) < 0) {
                    emptyCell = i;
                    break;
                }

            let champ = this.mergeChampions(prevState.champions, name, 1, []);
            if (champ != null) {
                let champ2 = this.mergeChampions(prevState.champions, name, 2, champ.items);
                if (champ2 != null)
                    champ = champ2;
            } else if (emptyCell != null) {
                let maxTeamSize = 9;
                prevState.champions.forEach(element => element.items.forEach(itemURL => {
                    if (itemURL === prevState.items.filter(item => item.name === "Force of Nature")[0].iconURL) maxTeamSize++;
                }));
                if (prevState.champions.length < maxTeamSize)
                    champ = this.createChampion(name, emptyCell, [], 1);
            }

            if (champ != null) {
                let newChampions = [champ];
                prevState.champions.forEach(element => {
                    if (element.name !== champ.name || element.level >= champ.level)
                        newChampions.push({ ...element })
                })
                return { champions: newChampions };
            }
            return {};
        });
    }

    mergeChampions = (champions, name, level, items) => {
        let cnt = 1;
        let cell = 0;
        champions.forEach(element => {
            if (element.name === name && element.level === level) {
                cnt++;
                element.items.forEach(item => items = this.mergeItems(items, item));
                cell = element.cell;
            }
        });
        if (cnt === 3)
            return this.createChampion(name, cell, items, level + 1);
        return null;
    }

    createChampion = (name, cell, items, level) => {
        let champ = null
        this.state.shopChampions.forEach(champion => {
            if (champion.name === name) {
                champ = { ...champion };
                champ.cell = cell;
                champ.items = items;
                champ.level = level;
                return;
            }
        });
        return champ;
    }

    gridChampClick = (champName) => {
        let champData = null;
        this.state.shopChampions.forEach(element => {
            if (element.name === champName)
                champData = { ...element };
        });
        this.setState({ clickedChamp: champData });
    }

    backdropClick = () => {
        this.setState({ clickedChamp: null });
    }

    swapCells = (cell1, cell2) => {
        this.setState(prevState => {
            let newChampions = prevState.champions.map(element => {
                if (element.cell == cell1)
                    element.cell = cell2;
                else if (element.cell == cell2)
                    element.cell = cell1;
                return { ...element }
            });
            newChampions = newChampions.filter(element => {
                return element.cell > -1;
            });
            return {
                champions: newChampions
            };
        });
    }

    addItem = (cell, item) => {
        this.setState(prevState => {
            let newChampions = prevState.champions.map(element => {
                if (element.cell == cell)
                    element.items = this.mergeItems(element.items, item);
                return { ...element }
            });
            return {
                champions: newChampions
            };
        });
    }


    mergeItems = (items, newItemName) => {
        let newItem = this.state.items.filter(item => item.name === newItemName)[0];
        if (!newItem)
            newItem = this.state.items.filter(item => item.iconURL === newItemName)[0];
        if (items.length === 0) {
            items.push(newItem.iconURL);
            return items;
        }
        let oldItemIcon = items[items.length - 1];
        let oldItem = this.state.items.filter(item => item.iconURL === oldItemIcon)[0];
        if (oldItem.subitems.length === 0) {
            newItem = this.state.items.filter(item => item.subitems.length > 0 && ((item.subitems[0] === newItem.name && item.subitems[1] === oldItem.name) || (item.subitems[1] === newItem.name && item.subitems[0] === oldItem.name)))[0];
            if (newItem)
                items.pop();
        }
        if (items.length < 3 && newItem)
            items.push(newItem.iconURL);
        return items;
    }

    saveBuild = () => {
        let build = {
            champions: this.state.champions,
            owner: "Me",
            votes: 0,
            name: this.refs.buildName.value
        };
        axios.post('/build', build)
            .then(res => {
                console.log(res)
                this.props.history.push('/builds');
            })
            .catch(err => console.log(err));
    }

    clearBuild = () => {
        this.setState({
            champions: [],
            clickedChamp: null
        });
    }

    render() {
        let champSynergies = {};
        this.state.champions.forEach(element => {
            element.classes.forEach(group => {
                if (typeof champSynergies[group] === 'undefined')
                    champSynergies[group] = [];
                champSynergies[group].push(element.name);
            })
        });

        let synergies = [];
        Object.keys(champSynergies).forEach(key => {
            let synergy = { ...this.state.synergies.find(element => element.name === key) };
            synergy.count = champSynergies[key].filter(onlyUnique).length;
            synergies.push(synergy);
        });

        return (
            <div className="row">
                <Modal show={this.state.clickedChamp != null} modalClosed={this.backdropClick}>
                    <ChampionDetails {...this.state.clickedChamp} />
                </Modal>
                <div className="col-2">
                    <SynrgiesArea synergies={synergies} />
                    <ItemsArea items={this.state.items} />
                </div>
                <div className="col-md-auto">
                    <Grid champions={this.state.champions} champClickHandler={this.gridChampClick} swapCells={this.swapCells} addItem={this.addItem} />
                    <Shop champions={this.state.shopChampions} onClickHandler={this.addChampion} swapCells={this.swapCells} />
                    <div>
                        <label className="MainInput">
                            <input type="text" id="buildName" ref="buildName" placeholder="&nbsp;" />
                            <span className="Label">Build Name</span>
                            <span className="Border"></span>
                        </label>
                        <div><button className="MainButton" onClick={this.saveBuild}>Save</button>
                            <button className="MainButton" style={{ "marginLeft": "6%" }} onClick={this.clearBuild}>Clear</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withErrorHandler(TFTBuilder, axios);

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}