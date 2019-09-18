import React, { Component } from 'react'
import './Shop.css'
import ChampionShop from '../../components/Champion/ChampionShop/ChampionShop'

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

class Shop extends Component {
    state = {
        cost : "All",
        class : "All"
    }
    
    render() {
        let champs = [];
        let costOptions = ["All"];
        let classOptions = ["All"];

        this.props.champions.forEach(element => {
            costOptions.push(element.cost);
            classOptions.push.apply(classOptions,element.classes);
            if((this.state.cost === "All" || element.cost == this.state.cost)&&(this.state.class === "All" || element.classes.indexOf(this.state.class) >= 0))
                champs.push(<ChampionShop key={element.name} onClickHandler={this.props.onClickHandler} {...element}/>);
        });

        const filterByCost = (event) =>{
            this.setState({
                cost: event.target.options[event.target.selectedIndex].value
            });
        }

        const filterByClass = (event) =>{
            this.setState({
                class: event.target.options[event.target.selectedIndex].value
            });
        }

        return (
            <div className="ShopArea"> 
                <select name="tier" onChange={filterByCost}>
                    {costOptions.filter(onlyUnique).map(item => <option value={item} key={item}>{item}</option>)}
                </select>

                <select name="class" onChange={filterByClass}>
                    {classOptions.filter(onlyUnique).map(item => <option value={item} key={item}>{item}</option>)}
                </select>
                
                <div className="Shop">
                    {champs}
                </div>
            </div>
        );
    }
}

export default Shop;