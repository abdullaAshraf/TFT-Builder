import React, { Component } from 'react'
import './Shop.css'
import ChampionShop from '../../components/Champion/ChampionShop/ChampionShop'
import Spinner from '../../components/UI/Spinner/Spinner'

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

class Shop extends Component {
    state = {
        tier: "All",
        class: "All"
    }

    filterByTier = (event) => {
        this.setState({
            tier: event.target.options[event.target.selectedIndex].value
        });
    }

    filterByClass = (event) => {
        this.setState({
            class: event.target.options[event.target.selectedIndex].value
        });
    }

    render() {
        let champs = [];
        let tierOptions = ["All", 1, 2, 3, 4, 5];
        let classOptions = ["All"];

        if (this.props.champions.length > 0) {
            this.props.champions.forEach(element => {
                classOptions.push.apply(classOptions, element.classes);
                if ((this.state.tier === "All" || element.tier == this.state.tier) && (this.state.class === "All" || element.classes.indexOf(this.state.class) >= 0))
                    champs.push(<ChampionShop key={element.name} onClickHandler={this.props.onClickHandler} {...element} />);
            });
        } else {
            champs = <Spinner />
        }
    

        return (
            <div className="ShopArea">
                <div className="Select" style={{ 'float': 'left'}}>
                    <select name="tier" onChange={this.filterByTier}>
                        {tierOptions.map(item => <option value={item} key={item}>{item}</option>)}
                    </select>
                </div>

                <div className="Select">
                <select name="class" onChange={this.filterByClass}>
                        {classOptions.filter(onlyUnique).map(item => <option value={item} key={item}>{item}</option>)}
                    </select>
                </div>



                <div className="Shop">
                    {champs}
                </div>
            </div>
        );
    }
}

export default Shop;