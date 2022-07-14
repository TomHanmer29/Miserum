class Base{
	constructor(lane,distance,faction){
		this.baseHp = 10000
		this.hp = 10000
		this.distance = distance
		this.speed = 0
		this.size = 1
		this.faction = faction
	}

	display(){

	}

	update(){
		if (this.faction == 0){
			gameComponents[0].currentKnightHP-=(this.baseHp-this.hp)
		}
		else if (this.faction == 1){
			gameComponents[0].currentSamuraiHP-=(this.baseHp-this.hp)
		}
		this.baseHp = this.hp

		
	}

}