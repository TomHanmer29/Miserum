class KnightUnit{
	constructor(lane,unitData,id){
		this.lane = parseInt(lane,10)
		this.size = parseInt(unitData[5],10)
		this.x = gameComponents[0].cameraX
		this.distance = 0
		this.baseSpeed = parseInt(unitData[1],10)
		this.speed = parseInt(unitData[1],10)
		this.baseHp = parseInt(unitData[3],10)
		this.hp = parseInt(unitData[3],10)
		this.baseDmg = parseInt(unitData[4],10)
		this.dmg = parseInt(unitData[4],10)
		this.buffs = []
		this.id = parseInt(id)
		this.imageNo=0
		this.inCombat = 0
		this.startFrame
		this.targets
		this.walkFrames = parseInt(unitData[7],10)
		this.nearestEnemy
		this.walkStart = 0
	}
	display(){
		image(knightImages[this.id][this.imageNo],this.x,(5*sqrHeight + sqrHeight*this.lane)-(sqrHeight*this.size),sqrWidth*this.size,sqrHeight*this.size)
	}

	update(){
		this.x = gameComponents[0].cameraX
		this.x += this.distance
		this.distance += this.speed
		if((frameCount%16)==0){
			if(this.imageNo<(this.walkFrames+this.walkStart) && this.speed!==0){
				this.imageNo = (this.imageNo+1)%this.walkFrames+this.walkStart
			}
		}
		this.combat()

		for (let b of this.buffs){
			b.parent = gameComponents[0].knights[this.lane].indexOf(this) 
			b.display()
			b.update()
		}

		if(this.distance>=5*width-this.size*sqrWidth){
			
		}
	}

	combat(){
		if (gameComponents[0].samurai[this.lane].length>0 /*this needs to only run if the samurai is after the knight*/){
			//find the closest enemy to the right
			let i = 0
			while(this.nearestEnemy===undefined){
				if(gameComponents[0].samurai[this.lane][i].distance>this.distance){
					this.nearestEnemy = i
				}
				i++
			}
			if(gameComponents[0].samurai[this.lane][this.nearestEnemy].hp<=0 || gameComponents[0].samurai[this.lane][this.nearestEnemy].distance<this.distance){
				this.nearestEnemy = undefined
			}
			if(this.inCombat == 0 && this.distance+this.size*sqrWidth+this.speed>gameComponents[0].samurai[this.lane][this.nearestEnemy].distance){
				this.speed = 0
				if(frameCount%90 === 0){
					gameComponents[0].projectiles.push(new KnightProjectile(this.lane,this.distance+((this.size-1)*sqrWidth),["stab",this.dmg,1,"basic",10],"stab"))
					stabSounds[Math.floor(random(0,6))].play(0,1,0.1)
				}
			}
			else if (this.speed == 0){
				this.speed = this.baseSpeed
			}
		}
	}
}

class Peasant extends KnightUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
		this.currentGold = 0
		this.assign
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		for(let i = 0;i<3;i++){
			if(gameComponents[0].gold[i][1] == this.lane){
				if(gameComponents[0].knightGoldAssign[i]==false && this.assign===undefined){
					this.assign = i
					gameComponents[0].knightGoldAssign[i]=true
				}
			}
		}
		if(this.assign !== undefined){
			if(collide(this.x,this.size,this.speed,gameComponents[0].cameraX+gameComponents[0].gold[this.assign][0],sqrWidth,0)==true){
				this.currentGold = 100
				this.speed=-this.speed
				this.imageNo = (this.imageNo+4)%8
				this.walkStart = (this.walkStart+4)%8
				mine1.play(0,1,0.6)
			}
			if (this.distance<=0 && this.speed<0){
				if (gameComponents[0].currentKnightGold<1000-this.currentGold){
					gameComponents[0].currentKnightGold += this.currentGold
				}
				else{
					gameComponents[0].currentKnightGold = 1000
				}
				this.currentGold = 0
				this.speed = -this.speed
				this.imageNo = (this.imageNo+4)%8
				this.walkStart = (this.walkStart+4)%8
			}
		}
	}
}

class Knight extends KnightUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
	}
	display(){
		super.display()
	}
	update(){
		super.update()
	}
}

class Cavalry extends KnightUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
		this.accel = 0.01
		this.maxSpeed = 8
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if (this.speed<this.maxSpeed && this.speed !== 0){
			this.speed+=this.accel
		}
		if (this.inCombat>0){
			this.accel = 0
		}
		else{
			this.accel = 0.01
		}
		if(this.buffs.length<=0 && this.speed>3){
			this.buffs.push(new Lance(this.lane,this.distance+((this.size-1)*sqrWidth),["stab",this.baseDmg,this.baseSpeed,"basic",9999999],"stab",gameComponents[0].knights[this.lane].indexOf(this)))
		}
	}
}

class Bard extends KnightUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
		//luteSounds[1].loop(0,0.8,0.5)
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if(this.buffs.length<=0){
			this.buffs.push(new Boost(this.distance,0,this.lane,gameComponents[0].knights[this.lane].indexOf(this),0,this.size,1.5,1.5))
		}
		for (let k of gameComponents[0].knights[this.lane]){
			if (this.distance+(sqrWidth*this.size)+(2*sqrWidth) > k.distance && this.distance-(2*sqrWidth) < k.distance && k.buffs!==undefined){
				if(k.buffs.length<=0){
					k.buffs.push(new Boost(this.distance,0,this.lane,gameComponents[0].knights[this.lane].indexOf(k),0,k.size,1.5,1.5))
				}
			}
		}
	}
}

class Spear extends KnightUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
		this.nearestEnemy
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if (gameComponents[0].samurai[this.lane].length>0){
			//find the closest enemy to the right
			let i = 0
			while(this.nearestEnemy===undefined){
				if(gameComponents[0].samurai[this.lane][i].distance>this.distance){
					this.nearestEnemy = i
				}
				i++
			}
			if(gameComponents[0].samurai[this.lane][this.nearestEnemy].hp<=0 || gameComponents[0].samurai[this.lane][this.nearestEnemy].distance<this.distance){
				this.nearestEnemy = undefined
			}
			//the spear does more damage to big enemies and to fast enemies - size ^ 2 * enemy speed/2
			this.dmg = this.baseDmg + (Math.ceil(gameComponents[0].samurai[this.lane][this.nearestEnemy].baseSpeed/2)*this.baseDmg*gameComponents[0].samurai[this.lane][this.nearestEnemy].size^2)
		}
	}
}

class Archer extends KnightUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if (gameComponents[0].samurai[this.lane].length>0){
			if(this.inCombat == 0 && this.distance+parseInt(knightProjectileData[0][4],10)>gameComponents[0].samurai[this.lane][this.nearestEnemy].distance){
				this.speed = 0
				if(frameCount%120 === 0){
					gameComponents[0].projectiles.push(new KnightProjectile(this.lane,this.distance,knightProjectileData[0],0))
				}
			}
			else if (this.inCombat == 0){
				this.speed = this.baseSpeed
			}
		}
	}
}

class Wizard extends KnightUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if (gameComponents[0].samurai[this.lane].length>0){
			if(this.inCombat == 0 && this.distance+parseInt(knightProjectileData[1][4],10)>gameComponents[0].samurai[this.lane][this.nearestEnemy].distance){
				this.speed = 0
				if(frameCount%120 === 0){
					gameComponents[0].projectiles.push(new KnightProjectile(this.lane,this.distance,knightProjectileData[1],1))
				}
			}
			else if (this.inCombat == 0){
				this.speed = this.baseSpeed
			}
		}
	}
}

class Engineer extends KnightUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
		this.barricades = 1
	}
	display(){
		super.display()
	}

	update(){
		super.update()
		if(this.distance>width*0.5 && this.barricades>0){
			for(let k of gameComponents[0].knights[this.lane]){
				if (k.id == 8 && k.distance == this.distance &&k.level<2){
					k.level++
					this.barricades--
				}
				else if(k.level>2){
					k.hp = k.baseHp
					this.barricades--
				}
			}
			if(this.barricades>0){
				gameComponents[0].knights[this.lane].push(new Barricade(this.lane,knightUnitData[8],8,this.distance))
				this.barricades--
			}				
			//make him do something else; either regenerate barricades or dig pit traps or something like that
		}
	}
}

class Barricade extends KnightUnit{
	constructor(lane,unitData,id,distance){
		super(lane,unitData,id)
		this.distance = distance
		this.level = 0
	}
	display(){
		image(barricade[this.level],this.x,(5*sqrHeight + sqrHeight*this.lane)-(sqrHeight*this.size),sqrWidth*this.size,sqrHeight*this.size)
	}

	update(){
		super.update()
		if(this.level==1 && this.baseHp!==150){
			this.baseHp = 150
			this.hp = 150
		}
		if(this.level==2 && this.dmg!==5){
			this.dmg = 5
			this.baseHp = 200
			this.hp = 200
		}
	}
}

class KnightGeneral extends KnightUnit{
	constructor(lane){
		super(lane)
		this.baseHp = gameComponents[0].currentKnightHP
		this.hp = gameComponents[0].currentKnightHP
		this.baseDmg = 60
		this.dmg = 60

	}

	display(){
		image(knightGeneral[this.imageNo],this.x,3*sqrHeight + sqrHeight*this.lane,2*sqrWidth,2*sqrHeight)
	}

	update(){
		this.x = gameComponents[0].cameraX
		this.x += this.distance
		
	}
}

//buffs[i] instanceof Slow