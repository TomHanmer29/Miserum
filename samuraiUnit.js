class SamuraiUnit{
	constructor(lane,unitData,id){
		this.lane = parseInt(lane,10)
		this.size = parseInt(unitData[5],10)
		this.x = gameComponents[0].cameraX
		this.distance = (5*width-sqrWidth*this.size)
		this.baseSpeed = parseInt(unitData[1],10)
		this.speed = this.baseSpeed
		this.baseHp = parseInt(unitData[3],10)
		this.hp = this.baseHp
		this.baseDmg = parseInt(unitData[4],10)
		this.dmg = this.baseDmg
		this.buffs = []
		this.id = parseInt(id)
		this.imageNo = 0		
		this.inCombat = 0
		this.startFrame
		this.walkFrames = parseInt(unitData[7],10)
		this.walkStart = 0
		this.nearestEnemy
	}
	display(){
		image(samuraiImages[this.id][this.imageNo],this.x,(5*sqrHeight + sqrHeight*this.lane)-(sqrHeight*this.size),sqrWidth*this.size,sqrHeight*this.size)
	}

	update(){
		this.x = gameComponents[0].cameraX
		this.x += this.distance
		this.distance -= this.speed
		if((frameCount%16)==0){
			if(this.imageNo<(this.walkFrames+this.walkStart) && this.speed!==0){
				this.imageNo = (this.imageNo+1)%this.walkFrames+this.walkStart
			}
		}
		this.combat()
		for (let b of this.buffs){
			b.parent = gameComponents[0].samurai[this.lane].indexOf(this) 
			b.display()
			b.update()
		}
	}

	combat(){
		if (gameComponents[0].knights[this.lane].length>0){
			//find the closest enemy to the right
			let i = 0
			while(this.nearestEnemy===undefined){
				if(gameComponents[0].knights[this.lane][i].distance<this.distance){
					this.nearestEnemy = i
				}
				i++
			}
			if(gameComponents[0].knights[this.lane][this.nearestEnemy].hp<=0 || gameComponents[0].knights[this.lane][this.nearestEnemy].distance > this.distance+this.size){
				this.nearestEnemy = undefined
			}
			if(this.inCombat == 0 && this.distance<gameComponents[0].knights[this.lane][this.nearestEnemy].distance+gameComponents[0].knights[this.lane][this.nearestEnemy].size*sqrWidth+1){
				this.speed = 0
				if(frameCount%90 === 0){
					gameComponents[0].projectiles.push(new SamuraiProjectile(this.lane,this.distance,["stab",this.dmg,-1,"basic",10],"stab"))
					stabSounds[Math.floor(random(0,6))].play(0,1,0.1)
				}
			}
			else if (this.speed == 0){
				this.speed = this.baseSpeed
			}
		}
	}
}

class Farmer extends SamuraiUnit{
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
				if(gameComponents[0].samuraiGoldAssign[i]==false && this.assign===undefined){
					this.assign = i
					gameComponents[0].samuraiGoldAssign[i]=true
				}
			}
		}
		if(this.assign !== undefined){
			if(collide(gameComponents[0].cameraX+(5*width-gameComponents[0].gold[this.assign][0]),1,0,this.x,this.size,this.speed)==true && this.speed>0){
				this.currentGold = 100
				this.speed=-this.speed
				this.imageNo = (this.imageNo+4)%8
				this.walkStart = (this.walkStart+4)%8
				mine1.play(0,1,0.6)
			}
			if (this.distance>=5*width && this.speed<0){
				if (gameComponents[0].currentSamuraiGold<1000-this.currentGold){
					gameComponents[0].currentSamuraiGold += this.currentGold
				}
				else{
					gameComponents[0].currentSamuraiGold = 1000
				}
				this.currentGold = 0
				this.speed = -this.speed
				this.imageNo = (this.imageNo+4)%8
				this.walkStart = (this.walkStart+4)%8
			}
		}
	}
}
class Shogun extends SamuraiUnit{
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
class Oni extends SamuraiUnit{
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
class StormKing extends SamuraiUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if (gameComponents[0].knights[this.lane].length>0){
			if(this.inCombat == 0 && this.distance-parseInt(samuraiProjectileData[1][4],10)<gameComponents[0].knights[this.lane][this.nearestEnemy].distance){
				this.speed = 0
				if(frameCount%120 === 0){
					gameComponents[0].projectiles.push(new SamuraiProjectile(this.lane,this.distance,samuraiProjectileData[1],1))
				}
			}
			else if (this.inCombat == 0){
				this.speed = this.baseSpeed
			}
		}
	}
}
class Ninja extends SamuraiUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if (gameComponents[0].knights[this.lane].length>0){
			if(this.inCombat == 0 && this.distance-parseInt(samuraiProjectileData[0][4],10)<gameComponents[0].knights[this.lane][this.nearestEnemy].distance){
				this.speed = 0
				if(frameCount%30 === 0){
					gameComponents[0].projectiles.push(new SamuraiProjectile(this.lane,this.distance,samuraiProjectileData[0],0))
				}
			}
			else if (this.inCombat == 0){
				this.speed = this.baseSpeed
			}
		}
	}
}

class Healer extends SamuraiUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if(this.buffs.length<=0){
			this.buffs.push(new Heal(this.distance,2,this.lane,gameComponents[0].samurai[this.lane].indexOf(this),1,this.size,1))
		}
		for (let s of gameComponents[0].samurai[this.lane]){
			if (this.distance+(sqrWidth*this.size)+(2*sqrWidth) > s.distance && this.distance-(2*sqrWidth) < s.distance && s.buffs!==undefined){
				if(s.buffs.length<=0){
					s.buffs.push(new Heal(this.distance,2,this.lane,gameComponents[0].samurai[this.lane].indexOf(this),1,s.size,1))
				}
			}
		}
	}
}

class Kappa extends SamuraiUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
		this.nets = 1
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		if(this.inCombat == 0 && this.distance-sqrWidth<gameComponents[0].knights[this.lane][this.nearestEnemy].distance && this.nets>0){
			this.speed = 0
			if(frameCount%60 === 0){
				gameComponents[0].knights[this.lane][this.nearestEnemy].buffs.push(new Slow(gameComponents[0].knights[this.lane][this.nearestEnemy].distance,3,this.lane,gameComponents[0].knights[this.lane].indexOf(gameComponents[0].knights[this.lane][this.nearestEnemy]),0,gameComponents[0].knights[this.lane][this.nearestEnemy].size,0))
				this.nets--
			}
		}
		else if (this.inCombat == 0){
			this.speed = this.baseSpeed
		}
	}
}

class SlavNinja extends SamuraiUnit{
	constructor(lane,unitData,id){
		super(lane,unitData,id)
		bass.loop(0,1,0.3)
		this.volume = 0
	}
	display(){
		super.display()
	}
	update(){
		super.update()
		bass.setVolume(0.15*Math.sin(this.volume))
		if(gameComponents[0].cameraX+this.distance>=0){
			this.volume = map(gameComponents[0].cameraX+this.distance,5*width,0,0,1)
		}
		else{
			this.volume = map(gameComponents[0].cameraX+this.distance,0,-4*width,1,0)
		}
	}
}

//max cameraX = -4*width