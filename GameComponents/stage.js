class Stage{
	constructor(){
		//knights
		this.knights = [[],[],[],[],[]]
		this.knightUnitNumber = 0
		this.maxKnightHP = 250
		this.currentKnightHP = 250
		this.maxKnightGold = 1000
		this.currentKnightGold = 0
		this.knightClasses = [Peasant,Knight,Cavalry,Bard,Spear,Archer,Wizard,Engineer]
		this.knightGoldAssign = [false,false,false]
		this.defaultKnightCDs = []
		this.currentKnightCDs = []
		this.knightKills = 0
		for(let i = 0;i<knightUnitData.length;i++){
			this.defaultKnightCDs.push(60*parseInt(knightUnitData[i][6],10))
			this.currentKnightCDs.push(60*parseInt(knightUnitData[i][6],10))
		}

		//weebs
		this.samurai = [[],[],[],[],[]]
		this.maxSamuraiHP = 250
		this.currentSamuraiHP = 250
		this.maxSamuraiGold = 1000
		this.currentSamuraiGold = 0
		this.samuraiClasses = [Farmer,Shogun,Oni,StormKing,Ninja,Healer,Kappa,SlavNinja]
		this.samuraiGoldAssign = [false,false,false]
		this.defaultSamuraiCDs = []
		this.currentSamuraiCDs = []
		this.samuraiKills = 0
		for(let i = 0;i<samuraiUnitData.length;i++){
			this.defaultSamuraiCDs.push(60*parseInt(samuraiUnitData[i][6],10))
			this.currentSamuraiCDs.push(60*parseInt(samuraiUnitData[i][6],10))
		}

		this.nextEnemy
		
		//misc variables
		this.cameraX = 0
		this.laneNo
		this.gold = []
		for (let i = 0; i<3; i++){
			this.gold.push([floor(random(width/2,3*(width/2))),floor(random(5))])
		}
		this.unit
		this.projectiles = []
		this.spells = []
		this.currentSpellCDs = [600,600]
		this.defaultSpellCDs = [600,600]
		this.particles = []
		this.topBar = ["general","spell1","spell2"]
	}

	display(){
		stroke(0)
		this.drawBackground()
		this.updateParticles()
		this.updateUnits()
		this.drawForeground()
	}

	update(){
		this.orderUnits()
		if(this.currentKnightHP<=0 || this.currentSamuraiHP<=0){
			gameComponents.shift(gameComponents.indexOf(this),1)
			gameComponents.push(new GameOverScreen(this.knightKills,this.samuraiKills))
		}
	}

	drawBackground(){
		//draws background
		for(let i = 0; i<5; i++){
		image(back[4],this.cameraX*0.3+(i*width),0,width,height)
		image(back[3],this.cameraX*0.5+(i*width),0,width,height)
		image(back[2],this.cameraX*0.8+(i*width),0,width,height)
		}
		//draws castle back
		image(knightCastle[1],this.cameraX,0,4*sqrWidth,height)
		image(samuraiCastle[1],this.cameraX+5*width-4*sqrWidth,0,4*sqrWidth,height)

		//draws 
		for(let i = 0; i<5; i++){
			image(back[1],this.cameraX+(i*width),0,width,height)
		}

		//draws mines
		for(let i = 0; i<3; i++){
			image(goldMine,(gameComponents[0].cameraX)+this.gold[i][0],(4*sqrHeight + sqrHeight*this.gold[i][1]),sqrWidth,sqrHeight)
			image(goldMine,(gameComponents[0].cameraX+(5*width-this.gold[i][0])),(4*sqrHeight + sqrHeight*this.gold[i][1]),sqrWidth,sqrHeight)
		}
	}

	updateParticles(){
		for (let p of this.particles){
			p.display()
			p.update()
		}
	}

	updateUnits(){
		for(let i = 0;i<5;i++){ 
			for(let j = 0;j<this.knights[i].length;j++){
				if(this.knights[i].length>0){
					this.knights[i][j].display()
					this.knights[i][j].update()
				}
			}
			for(let j = 0;j<this.samurai[i].length;j++){
				if(this.samurai[i].length>0){
					this.samurai[i][j].display()
					this.samurai[i][j].update()
				}
			}
		}
		for(let i = 0;i<this.projectiles.length;i++){
			if(this.projectiles.length>0){
				this.projectiles[i].display()
				this.projectiles[i].update()
			}
		}
		for(let sp of this.spells){
			sp.display()
			sp.update()
		}
		this.unit = currentKnightUnits[this.knightUnitNumber]
	}

	drawForeground(){
		//draws the bases and foreground
		image(knightCastle[0],this.cameraX,0,4*sqrWidth,height)
		image(samuraiCastle[0],this.cameraX+5*width-4*sqrWidth,0,4*sqrWidth,height)
		for(let i = 0; i<6; i++){
			image(back[0],this.cameraX*1.2+(i*width),0,width,height)
		}
	}

	orderUnits(){
	//sorts the knights and samurai in order of distance, with the most travelled unit at 0 and least at n
		for (let i = 0; i < 5 ; i++){
			if(this.knights.length>1){
				this.knights[i].sort(function(a,b){return (b.distance-a.distance)})
			}
			if(this.samurai.length>1){
				this.samurai[i].sort(function(a,b){return (a.distance-b.distance)})
			}
		}
	}

}

class ActiveStage extends Stage{
	constructor(){
		super()
		this.doOnce = true
		//push the base into the lanes
		for(let i = 0;i<5;i++){
			this.samurai[i].push(new Base(i,width*5-sqrWidth,1))
			this.knights[i].push(new Base(i,0,0))
		}
	}

	display(){
		super.display()
		this.drawBars()
		this.drawUI()
		this.drawOverlays()
	}
	
	update(){
		super.update()
		this.cameraControls()
		this.laneDetection()
		this.knightUnitDetection()
		this.checkSpawns()
		this.spawnEnemies()
		this.currentKnightCDs = cooldowns(this.defaultKnightCDs,this.currentKnightCDs)
		this.currentSamuraiCDs = cooldowns(this.defaultSamuraiCDs,this.currentSamuraiCDs)
		this.currentSpellCDs = cooldowns(this.defaultSpellCDs,this.currentSpellCDs)
	}

	drawBars(){
		image(knightBars[floor(map(this.currentKnightHP/this.maxKnightHP,1,0,0,9))],sqrWidth*3,0,sqrWidth*3,sqrHeight)
		image(knightBars[floor(map(this.currentKnightGold/this.maxKnightGold,0,1,17,9))],sqrWidth*3,0,sqrWidth*3,sqrHeight)
		image(samuraiBars[floor(map(this.currentSamuraiHP/this.maxSamuraiHP,1,0,0,9))],width-sqrWidth*6,0,sqrWidth*2,sqrHeight*2)
		image(samuraiBars[floor(map(this.currentSamuraiGold/this.maxSamuraiGold,0,1,17,9))],width-sqrWidth*6,0,sqrWidth*2,sqrHeight*2)
	}

	drawUI(){
		//draws each players UI inc. units and spells
		//knight units
		image(knightUI,0,0,6*sqrWidth,4*sqrHeight)
		//samurai units
		image(samuraiUI,width-6*sqrWidth,0,6*sqrWidth,4*sqrHeight)

		//spells
		//knight spell cds
		if (this.currentSpellCDs[1]==this.defaultSpellCDs[1] && 100<=this.currentKnightGold){
				fill(0,255,0,50)
			}
			else{
				fill(255,0,0,50)
			}
		rect((2)*sqrWidth,0,sqrWidth,sqrHeight*(this.currentSpellCDs[1]/this.defaultSpellCDs[1]))

		image(meteor,2*sqrWidth,0,sqrWidth,sqrHeight,0,32,32,32)

		for(let i = 0;i<currentKnightUnits.length;i++){
			if (this.currentKnightCDs[currentKnightUnits[i]]==this.defaultKnightCDs[currentKnightUnits[i]] && parseInt(knightUnitData[currentKnightUnits[i]][2],10)<=this.currentKnightGold){
				fill(0,255,0,50)
			}
			else{
				fill(255,0,0,50)
			}
			//knightCDs
			rect((i%3)*sqrWidth,sqrHeight*ceil((i+0.1)/3),sqrWidth,sqrHeight*(this.currentKnightCDs[currentKnightUnits[i]]/this.defaultKnightCDs[currentKnightUnits[i]]))

			//knightImages
			image(knightImages[currentKnightUnits[i]][0],(i%3)*sqrWidth,sqrHeight*ceil((i+0.1)/3),sqrWidth,sqrHeight)

			if (this.currentSamuraiCDs[currentSamuraiUnits[i]]==this.defaultSamuraiCDs[currentSamuraiUnits[i]] && parseInt(samuraiUnitData[currentSamuraiUnits[i]][2],10)<=this.currentSamuraiGold){
				fill(0,255,0,50)
			}
			else{
				fill(255,0,0,50)
			}

			//samuraiCDs
			rect((width-3*sqrWidth)+((i%3)*sqrWidth),sqrHeight*ceil((i+0.1)/3),sqrWidth,sqrHeight*(this.currentSamuraiCDs[currentSamuraiUnits[i]]/this.defaultSamuraiCDs[currentSamuraiUnits[i]]))
			//samuraiImages
			image(samuraiImages[currentSamuraiUnits[i]][0],(width-3*sqrWidth)+((i%3)*sqrWidth),sqrHeight*ceil((i+0.1)/3),sqrWidth,sqrHeight)
		}

	}

	drawOverlays(){
		//adds a selection box
		image(selectionBox,(this.knightUnitNumber%3)*sqrWidth,sqrHeight*ceil((this.knightUnitNumber+0.1)/3),sqrWidth,sqrHeight)

		stroke(255)
		strokeWeight(5)
		image(minimap,sqrWidth,height - 1.5*sqrHeight,width-2*sqrWidth,sqrHeight)
		//box showing selected area of the stage
		let y = map(gameComponents[0].cameraX,0,-4*width,sqrWidth, width-sqrWidth-width*1/5)
		fill(100,100,100,40)
		strokeWeight(1)
		image(minimapBox,y,height-1.5*sqrHeight,width*1/5,sqrHeight)
		//draw green boxes for friendly units, red boxes for enemies
		for (let i = 0;i<5;i++){ 
			for (let k of this.knights[i]){
			if(k.distance<5*width){
					let x = map(k.distance, 0, width*5, sqrWidth, width-sqrWidth)
					if(k.faction!==undefined){
						image(castleIcons[0],x,height-sqrHeight,sqrWidth*(5/32),sqrHeight/4)
					}
					else{
						image(castleIcons[2],x,height-sqrHeight,sqrWidth*(5/32),sqrHeight/4)
					}
				}
			}
		}
		for (let i = 0;i<5;i++){ 
			for (let s of this.samurai[i]){
			if(s.distance>0){
					let x = map(s.distance, width*5, 0, width-sqrWidth, sqrWidth)
					if(s.faction!==undefined){
						image(castleIcons[1],x,height-sqrHeight,sqrWidth*(5/32),sqrHeight/4)
					}
					else{
						image(castleIcons[3],x,height-sqrHeight,sqrWidth*(5/32),sqrHeight/4)
					}
				}
			}
		}
	}

	cameraControls(){
		if(mouseY>3*sqrHeight){
			if (mouseX<sqrWidth*1.5){
				let temp = map(mouseX,0,sqrWidth*1.5,width/30,width/240)
				if(this.cameraX+temp < 0){
					this.cameraX+=temp
				}
			}
			else if(mouseX > width-sqrWidth*1.5){
				let temp = map(mouseX,width-sqrWidth*1.5,width,width/240,width/30)
				 if(this.cameraX-temp> (-4*width)){
					 this.cameraX-=temp
				 }
			}
		}
	}

	laneDetection(){
	//maps the area the mouse is in to the lane its position corresponds to
		if (mouseY<sqrHeight*9 && mouseY>sqrHeight*4){
			this.laneNo = floor(map(mouseY, sqrHeight*4,sqrHeight*9,0,5))
		}
		else{
			this.laneNo = "NA"
		}
	}

	knightUnitDetection(){
	//detects which knight unit is selected again using map
		if(mouseX<sqrWidth*3 && mouseY<sqrHeight*3){
			if (mouseY<2*sqrHeight && mouseY>sqrHeight && mouseIsPressed == true){
				this.knightUnitNumber = floor(map(mouseX, 0,(sqrWidth*3),0,3))
			}
			else if (mouseY>2*sqrHeight && mouseIsPressed == true){
				this.knightUnitNumber = floor(map(mouseX, 0,(sqrWidth*3),3,6))
			}
			else if (mouseX<sqrWidth*3 && mouseY<sqrHeight && mouseIsPressed == true){
				this.knightUnitNumber = floor(map(mouseX,0,3*sqrWidth,0,3))
				this.knightUnitNumber = this.topBar[this.knightUnitNumber]
			}
		}
	}

	checkSpawns(){
		if(this.laneNo != "NA" && this.knightUnitNumber >=0 && this.knightUnitNumber<=6){
			if(knightUnitData[this.unit][2]<=this.currentKnightGold && (this.currentKnightCDs[this.unit] === this.defaultKnightCDs[this.unit]) && mouseIsPressed == true){
				this.knights[this.laneNo].push(new this.knightClasses[this.unit](this.laneNo,knightUnitData[this.unit],this.unit))
				this.currentKnightGold -= parseInt(knightUnitData[this.unit][2],10)
				this.currentKnightCDs[this.unit] = 0
				if(this.unit==0 || this.unit==5){
					peasantSounds[Math.round(random(0,6.5))].play(0,1,6.5)
				}
				else if(this.unit==6){
					wizardSounds[Math.round(random(0,3.5))].play(0,1,3.5)
				}
				else{
					insultSounds[Math.round(random(0,11))].play(0,1,1.8)
				}
			}
		}
		else if(this.laneNo != "NA" && this.knightUnitNumber == "spell2"){
			let targetY = Math.floor(map(mouseY,4*sqrHeight,9*sqrHeight,0,5))
			image(target,mouseX,sqrHeight*(4+targetY),sqrWidth,sqrHeight)
			if(this.currentKnightGold>=100 && ((this.currentSpellCDs[1] === this.defaultSpellCDs[1])) && mouseIsPressed){
				this.spells.push(new Catapult(-gameComponents[0].cameraX+mouseX,this.laneNo,0,1,2,0,10,75,0))
				this.currentKnightGold -= 100
				this.currentSpellCDs[1] = 0
			}
		}
	}

	spawnEnemies(){
		for(let i = 0; i<3; i++){
			if(gameComponents.includes(this)){
				if(gameComponents[0].samuraiGoldAssign[i]!==true){
					if(this.currentSamuraiCDs[0] == this.defaultSamuraiCDs[0]){
						//new farmer in the right lane
						this.samurai[this.gold[i][1]].push(new Farmer(this.gold[i][1],samuraiUnitData[0],0))
						this.currentSamuraiCDs[0]=0
					}	
				}
			}
		}
		//q up a random enemy to spawn.
		//when enough gold, spawn the enemy.
		//repeat
		if(this.nextEnemy === undefined){
			this.nextEnemy = Math.floor(random(0,6))
		}
		if(this.currentSamuraiGold>=samuraiUnitData[currentSamuraiUnits[this.nextEnemy]][2] && this.currentSamuraiCDs[currentSamuraiUnits[this.nextEnemy]] == this.defaultSamuraiCDs[currentSamuraiUnits[this.nextEnemy]]){
			let temp = Math.floor(random(0,5))
			this.samurai[temp].push(new this.samuraiClasses[currentSamuraiUnits[this.nextEnemy]](temp,samuraiUnitData[currentSamuraiUnits[this.nextEnemy]],currentSamuraiUnits[this.nextEnemy]))
			this.currentSamuraiGold -= parseInt(samuraiUnitData[currentSamuraiUnits[this.nextEnemy]][2],10)
			this.currentSamuraiCDs[currentSamuraiUnits[this.nextEnemy]] = 0
			this.nextEnemy = undefined
		}
	}	
}

class LoadingStage extends Stage{
	//UNITS ARE MOVING OFF THE STAGE PAST THE BASES
	//THIS IS CAUSING CRASHES :(
	//but i might have fixed it with killOffStage, testing takes ages
	//yeah its prolly fixed now
		constructor(){
		super()
		this.tempUnit
		this.tempLane
		this.cameraX = width*-2
	}

	display(){
		super.display()
	}
	
	update(){
		super.update()
		this.mayhem()
		this.killOffstage()
	}

	mayhem(){
		//spawn units
		if(frameCount%20===0 && frameCount%600<200){
		this.tempUnit = floor(random(0,currentKnightUnits.length))
		this.tempLane = floor(random(0,5))
		this.knights[this.tempLane].push(new this.knightClasses[this.tempUnit](this.tempLane,knightUnitData[this.tempUnit],this.tempUnit))
		this.tempUnit = floor(random(0,currentSamuraiUnits.length))
		this.tempLane = floor(random(0,5))
		this.samurai[this.tempLane].push(new this.samuraiClasses[this.tempUnit](this.tempLane,samuraiUnitData[this.tempUnit],this.tempUnit))
		}

		//spawn spells
		if(frameCount%120==0){
			this.spells.push(new Catapult(random(width*2,width*3),Math.floor(random(0,5)),0,1,2,0,10,75,0))
		}
	}

	killOffstage(){
		for(let i = 0;i<5;i++){
			for(let s of this.samurai[i]){
				if(s.distance<width){
					this.samurai[i].splice(this.samurai[i].indexOf(s),1)
				}
			}
			for(let k of this.knights[i]){
				if(k.distance>4*width){
					this.knights[i].splice(this.knights[i].indexOf(k),1)
				}
			}
		}
	}
}