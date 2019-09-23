class ChampionData {
    name;
    cell = 0;
    items = [];
    level = 1;
    icon = null;
    model = null;
    classes = [];
    ability = {};
    tier = 5;
    health = [650 , 1170 , 2340];
    armor = 20;
    magicResist = 20;
    damage = [75 , 135 , 270];
    attackSpeed = 0.85;
    range = 3;
    iconURL = '';
    shopIconUrl = '';

    getHealth(){
        return this.health[this.level];
    }

    getDamage(){
        return this.damage[this.level];
    }

    getDPS(){
        return this.getDamage() / this.attackSpeed;
    }
}

export default ChampionData