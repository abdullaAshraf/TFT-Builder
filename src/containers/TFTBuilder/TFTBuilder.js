import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Aux'
import Grid from '../../components/Grid/Grid'
import Shop from '../Shop/Shop'
import ChampionData from '../../components/Champion/ChampionData/ChampionData'
import Modal from '../../components/UI/Modal/Modal'
import ChampionDetails from '../../components/Champion/ChampionDetails/ChampionDetails'
import withErrorHandler from '../../hoc/withErrorHandle/withErrorHandle'
import axios from 'axios'

class TFTBuilder extends Component {
    state = {
        champions: [new ChampionData("Miss Fortune", 18, ["Hush", "Yuumi"], 1), new ChampionData("Garen", 8, ["Frozen Heart"], 2), new ChampionData("Aatrox", 13, ["Dragon's Claw"], 3)],
        shopChampions: [new ChampionData("Miss Fortune", 0, [], 1), new ChampionData("Garen", 0, [], 1), new ChampionData("Aatrox", 0, [], 1)],
        clickedChamp: null
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
            champ = new ChampionData(name, emptyCell, [], 1);
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
            if(items.length > 3)
                items = items.slice(0,2)
            return new ChampionData(name, cell, items, level + 1);
        }
        return null;
    }

    gridChampClick = (champName) => {
        //TODO get champ from DataBase
        let champData = null;
        this.state.champions.forEach(element => {
            if(element.name === champName)
                champData = {...element};
        });
        this.setState({clickedChamp:champData});
    }

    backdropClick = () => {
        this.setState({clickedChamp:null});
    }

    render() {
        return (
            <Aux>
                <Modal show={this.state.clickedChamp != null} modalClosed={this.backdropClick}>
                    <ChampionDetails {...this.state.clickedChamp}/>
                </Modal>
                <Grid champions={this.state.champions} champClickHandler={this.gridChampClick}/>
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

export default withErrorHandler(TFTBuilder,axios);