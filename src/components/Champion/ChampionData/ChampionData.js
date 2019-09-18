class ChampionData {
    name = "Miss Fortune";
    cell = 0;
    items = [];
    level = 1;
    icon = null;
    model = null;
    classes = ["Pirate","Gunslinger"];
    ability = "Bullet Time";
    cost = 5;
    health = [650 , 1170 , 2340];
    armor = 20;
    magicResist = 20;
    damage = [75 , 135 , 270];
    attackSpeed = 0.85;
    range = 3;

    constructor(name,cell,items,level){
        this.name = name;
        this.cell = cell;
        this.level = level;
        this.items = [...items];
    }
}

export default ChampionData