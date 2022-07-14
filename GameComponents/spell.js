class Spell{
	constructor(distance,lane,vertDist,width,height,speed,vertSpeed,damage,id){
		this.x = gameComponents[0].cameraX
		this.lane = lane
		this.distance = distance
		this.y = vertDist
		this.width = width*sqrWidth
		this.height = height*sqrHeight
		this.speed = speed
		this.vertSpeed = vertSpeed
		this.damage = damage
		this.imageNo = id
		this.active
	}

	display(){
		image(spellImages[this.imageNo],this.x,this.y-(this.width-1),this.width,this.height)
	}

	update(){
		this.x = gameComponents[0].cameraX+this.distance
		if(this.y<4*sqrHeight + sqrHeight*this.lane-(this.width-sqrHeight)){
			this.y+=this.vertSpeed
		}
		else{
			this.active = true
			gameComponents[0].particles.push(new Particles(this.distance+sqrWidth,4*sqrHeight + sqrHeight*this.lane,sqrHeight,sqrWidth,1,[70,49,33,boom]))
		}
	}

}

class Catapult extends Spell{
	constructor(distance,lane,vertDist,width,height,speed,vertSpeed,damage,id){
		super(distance,lane,vertDist,width,height,speed,vertSpeed,damage,id)
	}

	display(){
		super.display()
		
	}

	update(){
		super.update()
		if(this.active == true){
			for(let k of gameComponents[0].knights[this.lane]){
				if((this.distance+this.width>=k.distance && this.distance <= k.distance) || (this.distance<=k.size*sqrWidth+k.distance && this.distance+this.width>=k.size*sqrWidth+k.distance)){
					k.hp-=this.damage
					if(k.hp<=0){
						gameComponents[0].knights[this.lane].splice(gameComponents[0].knights[this.lane].indexOf(k),1)
					}
				}
			}
			for(let s of gameComponents[0].samurai[this.lane]){
				if((this.distance+this.width>=s.distance && this.distance <= s.distance+sqrWidth*(s.size-1)) || (this.distance<=s.size*sqrWidth+s.distance && this.distance+this.width>=s.size*sqrWidth+s.distance)){
					s.hp-=this.damage
					if(s.hp<=0){
						gameComponents[0].samurai[this.lane].splice(gameComponents[0].samurai[this.lane].indexOf(s),1)
					}
				}
			}
			gameComponents[0].spells.splice(gameComponents[0].spells.indexOf(this),1)	
		}
		//when touches the ground, explode the stuff 
	}
}