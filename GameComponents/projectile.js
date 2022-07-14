class Projectile{
	constructor(lane,distance,unitData,id){
		this.x = gameComponents[0].cameraX
		this.distance = distance
		this.speed = parseInt(unitData[2],10)
		this.damage = parseInt(unitData[1],10)
		this.lane = lane
		this.type = unitData[3]
		this.range =  parseInt(unitData[4],10)
		this.id = id
		this.image
	}

	display(){
		if(this.id!=="stab"){
			image(this.image,this.x,4*sqrHeight + sqrHeight*this.lane,sqrWidth,sqrHeight)
		}
	}

	update(){
		this.x=gameComponents[0].cameraX
		this.x+=this.distance
		this.distance+=this.speed
		this.range-=Math.abs(this.speed)
	}
}

class KnightProjectile extends Projectile{
	constructor(lane,distance,unitData,id){
		super(lane,distance,unitData,id)
		if(this.id !== "stab"){
			this.image = knightProjectiles[this.id]
			projectile2.play(0,1,0.3)
		}
	}

	display(){
		super.display()
	}

	update(){
		super.update()
		if (this.range>0){
			for (let s of gameComponents[0].samurai[this.lane]){
				if(collide(this.distance,1,this.speed,s.distance,s.size,s.speed)){
						s.hp -= this.damage
						gameComponents[0].particles.push(new Particles(this.distance+sqrWidth,4*sqrHeight + sqrHeight*this.lane,sqrHeight,sqrWidth,1,[200,0,0]))
						if (s.hp<=0){
							gameComponents[0].samurai[this.lane].splice(gameComponents[0].samurai[this.lane].indexOf(s),1)
							if(s.assign!==undefined){
								gameComponents[0].samuraiGoldAssign[s.assign]=false
							}
							if(s.id==7){
								bass.stop()
							}
							gameComponents[0].knightKills+=1
							deathSounds[Math.floor(random(0,6))].play(0,1,0.4)
							if(random(0,10)>8){
								if(random(0,3)>1){
									if(random([0,1])==1){
										insultSounds[Math.round(random(0,11))].play(0,1,1.8)
									}
									else{
										peasantSounds[Math.round(random(0,6))].play(0,1,5)
									}
								}
								else{
									laughSounds[Math.floor(random(0,3))].play(0,1,1.8)
								}
							}
						}
					switch(this.type){
							case "basic":
								gameComponents[0].projectiles.splice(gameComponents[0].projectiles.indexOf(this),1)
							break
							case "electric":
								gameComponents[0].projectiles.splice(gameComponents[0].projectiles.indexOf(this),1)
								gameComponents[0].projectiles.push(new KnightProjectile(this.lane,s.distance+sqrWidth,["arc",this.damage,this.speed,this.type,300],this.id))
							break
							case "fire":
								//DONT splice but only hit them once
							break
					}
				}
			}
		}
		else{
			gameComponents[0].projectiles.splice(gameComponents[0].projectiles.indexOf(this),1)
		}
	}
}

class SamuraiProjectile extends Projectile{
	constructor(lane,distance,unitData,id){
		super(lane,distance,unitData,id)
		this.speed=-(Math.abs(this.speed))
		if(this.id !== "stab"){
			this.image = samuraiProjectiles[this.id]
					projectile1.play(0,1,0.2)
		}
	}

	display(){
		super.display()
	}

	update(){
		super.update()
		if (this.range>0){
			for (let k of gameComponents[0].knights[this.lane]){
				if(collide(k.distance,k.size,k.speed,this.distance,1,this.speed)){
						k.hp -= this.damage
						gameComponents[0].particles.push(new Particles(this.distance,4*sqrHeight + sqrHeight*this.lane,sqrHeight,sqrWidth,-1,[200,0,0]))
						if (k.hp<=0){
							gameComponents[0].knights[this.lane].splice(gameComponents[0].knights[this.lane].indexOf(k),1)
							if(k.assign!==undefined){
								gameComponents[0].knightGoldAssign[k.assign]=false
							}
							gameComponents[0].samuraiKills+=1
							deathSounds[Math.floor(random(0,6))].play(0,1,0.2)
						}
					switch(this.type){
							case "basic":
								gameComponents[0].projectiles.splice(gameComponents[0].projectiles.indexOf(this),1)
							break
							case "electric":
								gameComponents[0].projectiles.splice(gameComponents[0].projectiles.indexOf(this),1)
								gameComponents[0].projectiles.push(new SamuraiProjectile(this.lane,k.distance,["arc",this.damage,this.speed,this.type,300],this.id))
							break
							case "fire":
								//DONT splice but only hit them once
							break
						}
					}
				}
			}
		else{
			gameComponents[0].projectiles.splice(gameComponents[0].projectiles.indexOf(this),1)
		}
	}
}

class Lance extends Projectile{
	constructor(lane,distance,unitData,id,parent){
		super(lane,distance,unitData,id)
		this.baseDmg = parseInt(unitData[1],10)
		this.parent = parent
		this.imageNo = 0
		this.prevDist = 0
	}

	display(){
		//spicy fire effect goes here
		if((frameCount%8)==0){
			this.imageNo = (this.imageNo+1)%4
		}
		let extra = 0
		if(gameComponents[0].knights[this.lane][this.parent].imageNo>1){
			extra = sqrWidth/32
		}
		else{
			extra = 0
		}
		image(holyLance[this.imageNo],this.x,4*sqrHeight + sqrHeight*(this.lane-1)-extra,sqrWidth,sqrHeight*2)
	}

	update(){
		super.update()
		this.distance = gameComponents[0].knights[this.lane][this.parent].distance + sqrWidth * (gameComponents[0].knights[this.lane][this.parent].size-1)
		this.speed = this.distance - this.prevDist
		//easy workaround to the speed bug, nice spaghetti code :)
		if(this.speed>8){
			this.speed = 8
		}
		this.damage = floor(this.baseDmg+(this.baseDmg*this.speed))
		if (this.range>0){
			for (let s of gameComponents[0].samurai[this.lane]){
				if(collide(this.distance,1,this.speed,s.distance,s.size,s.speed)){
						s.hp -= this.damage
						gameComponents[0].knights[this.lane][this.parent].speed = 0
						
					if (s.hp<=0){
						gameComponents[0].samurai[this.lane].splice(gameComponents[0].samurai[this.lane].indexOf(s),1)
						gameComponents[0].knightKills+=1
					}
					gameComponents[0].knights[this.lane][this.parent].buffs.splice(gameComponents[0].knights[this.lane][this.parent].buffs.indexOf(this),1)
					lance1.play(0,1,0.3)
				}
			}
		}
		else{
			gameComponents[0].knights[this.lane][this.parent].buffs.splice(gameComponents[0].knights[this.lane][this.parent].buffs.projectiles.indexOf(this),1)
		}

		//SOMETIMES this.distance is really big and i dont know why
		this.prevDist = this.distance
	}
}