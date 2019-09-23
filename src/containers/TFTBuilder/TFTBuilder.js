import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxilliary'
import Grid from '../../components/Grid/Grid'
import Shop from '../Shop/Shop'
import Modal from '../../components/UI/Modal/Modal'
import ChampionDetails from '../../components/Champion/ChampionDetails/ChampionDetails'
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'
import axios from 'axios'

class TFTBuilder extends Component {
    state = {
        champions: [],
        shopChampions: [],
        clickedChamp: null
    }

    componentDidMount() {
        axios.get('/champion')
            .then(res => this.setState({ shopChampions: res.data }))
            .catch(err =>
                console.log(err))
    }

    addChampion = (name) => {
        let emptyCell = null;
        let cells = [];
        this.state.champions.forEach(element => {
            cells.push(element.cell);
        });
        for (let i = 0; i < 21; i++)
            if (cells.indexOf(i) < 0) {
                emptyCell = i;
                break;
            }

        let champ = this.mergeChampions(name, 1, []);
        if (champ != null) {
            let champ2 = this.mergeChampions(name, 2, [champ.items]);
            if (champ2 != null)
                champ = champ2;
        } else if (emptyCell != null) {
            champ = this.createChampion(name, emptyCell, [], 1);
        }

        if (champ != null) {
            let newChampions = [champ];
            this.state.champions.forEach(element => {
                if (element.name !== name || element.level >= champ.level)
                    newChampions.push(element);
            });
            this.setState({
                champions: newChampions
            });
        }
    }

    mergeChampions = (name, level, items) => {
        let cnt = 1;
        let cell = 0;
        this.state.champions.forEach(element => {
            if (element.name === name && element.level === level) {
                cnt++;
                items.push.apply(items, element.items);
                cell = element.cell;
            }
        });
        if (cnt === 3) {
            if (items.length > 3)
                items = items.slice(0, 2)
            return this.createChampion(name, cell, items, level + 1);
        }
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
        let newChampions = [...this.state.champions ];
        newChampions.forEach(element => {
            if (element.cell == cell1)
                element.cell = cell2;
            else if (element.cell == cell2)
                element.cell = cell1;
        });
        this.setState({ champions: newChampions });
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.clickedChamp != null} modalClosed={this.backdropClick}>
                    <ChampionDetails {...this.state.clickedChamp} />
                </Modal>
                <Grid champions={this.state.champions} champClickHandler={this.gridChampClick} swapCells={this.swapCells} />
                <Shop champions={this.state.shopChampions} onClickHandler={this.addChampion} />
                <div>Synrgies</div>
                <div>Items</div>
                <div>States</div>
                <div>Matchups</div>
                <div>Controls</div>
            </Aux>
        );
    }
}

export default withErrorHandler(TFTBuilder, axios);