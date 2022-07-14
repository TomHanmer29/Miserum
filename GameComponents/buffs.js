class Buffs{
	constructor(distance,id,lane,parent,faction,size){
		this.x
		this.id = id
		this.parent = parent
		this.distance = distance
		this.lane = lane
		this.imageNo = 0
		this.faction  = faction
		this.size = size
	}

	display(){
		for(let i = 0;i<this.size-0.5;i+=0.5){
			image(buffImages[this.id][this.imageNo],this.x+(i*sqrWidth),(4*sqrHeight + sqrHeight*this.lane),sqrWidth,sqrHeight)
		}
	}

	update(){
		if (this.faction == 0){
			this.distance = gameComponents[0].knights[this.lane][this.parent].distance
		}
		else{
			this.distance = gameComponents[0].samurai[this.lane][this.parent].distance
		}
		this.x = gameComponents[0].cameraX+this.distance
		if((frameCount%8)==0){
			this.imageNo = (this.imageNo+1)%buffImages[this.id].length
		}
	}
}

class Heal extends Buffs{
	constructor(distance,id,lane,parent,faction,size,heal){
		super(distance,id,lane,parent,faction,size)
		this.heal = heal
	}

	display(){
		super.display()
	}

	update(){
		super.update()
		if (frameCount%20 == 0 && gameComponents[0].samurai[this.lane][this.parent].hp<gameComponents[0].samurai[this.lane][this.parent].maxHp){
			gameComponents[0].samurai[this.lane][this.parent].hp+=this.heal
		}
	}
}

class Slow extends Buffs{
	constructor(distance,id,lane,parent,faction,size,slowMod){
		super(distance,id,lane,parent,faction,size)
	}

	display(){
		super.display()
	}

	update(){
		super.update()
	}
}

class Boost extends Buffs{
	constructor(distance,id,lane,parent,faction,size,speedMod,dmgMod){
		super(distance,id,lane,parent,faction,size)
		this.dmgMod = dmgMod
		this.speedMod = speedMod
		gameComponents[0].knights[this.lane][this.parent].baseDmg*=this.dmgMod
		gameComponents[0].knights[this.lane][this.parent].dmg*=this.dmgMod
		gameComponents[0].knights[this.lane][this.parent].baseSpeed*=this.speedMod
		gameComponents[0].knights[this.lane][this.parent].speed*=this.speedMod
		if(gameComponents[0].knights[this.lane][this.parent].maxSpeed!==undefined){
			gameComponents[0].knights[this.lane][this.parent].maxSpeed*=this.speedMod
		}
		if(random(0,5)>4){
			luteSounds[Math.floor(random(0,2))].play(0,1,0.2)
		}
	}

	display(){
		super.display()
	}

	update(){
		super.update()
	}
}