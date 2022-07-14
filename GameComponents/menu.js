class Menu{
	constructor(){
		this.selected = 0
	}
	display(){
		noCursor()
	}
	update(){

	}
}

class MainMenu extends Menu{
	constructor(selected){
		super(selected)
	}
	display(){
		super.display()
		image(mainMenu[this.selected],0,0,width,height)
	}
	update(){
			if(mouseX>6.1875*sqrWidth && mouseX<9.90625*sqrWidth &&mouseY>3*sqrHeight && mouseY<7*sqrHeight &&(mouseY-3*sqrHeight)%(sqrHeight*1.5)<sqrHeight){
				this.selected = Math.round(map(mouseY,3*sqrHeight,7*sqrHeight,1,3))
			}
			else if(mouseY>7.25*sqrHeight && mouseY<7.75*sqrHeight && mouseX>5.875*sqrWidth && mouseX<10.125*sqrWidth && (mouseX-5.875*sqrWidth)%(sqrWidth*3.15625)<sqrWidth*1.125){
				this.selected = Math.round(map(mouseX,5.875*sqrWidth,10.125*sqrWidth,4,5))
			}
			else{
				this.selected = 0
			}
		//if mouse in the boxes do the thingies :(
			if(mouseIsPressed && this.selected >0){
			switch(this.selected){
				case 1:
					gameComponents = []
					gameComponents.push(new ActiveStage)
					horn1.play(0,1,0.4)
				break
				case 2:
					gameComponents.splice(gameComponents.indexOf(this),1)
					gameComponents.push(new Shop)
					gameComponents.push(new CloseButton)
				break
				case 3:
					gameComponents.splice(gameComponents.indexOf(this),1)
					gameComponents.push(new Achievements)
					gameComponents.push(new CloseButton)
				break
				case 4:
					gameComponents.splice(gameComponents.indexOf(this),1)
					gameComponents.push(new Options)
					gameComponents.push(new CloseButton)
				break
				case 5:
					window.close
				break
				//kill this and the loadingStage and push in an activeStage
			}
		}
	}
}

class Shop extends Menu{
	constructor(){
		super()
		this.currentX
		this.currentY
		this.current
		this.reset = false
		this.swap
	}

	display(){
		image(shop,0,0,width,height)
		fill(255,0,0,0.5)
		//draw green box
		if(this.current!==undefined){
			fill(0,255,0)
			if(this.swap == true){
				console.log(this.current)
				rect(((this.current%3)+1)*sqrWidth,(Math.ceil((this.current+0.1)/3))*sqrHeight,sqrWidth,sqrHeight)
			}
			else{
				rect(((this.current%3)+1)*sqrWidth,(Math.ceil((this.current+0.1)/3)+3)*sqrHeight,sqrWidth,sqrHeight)
			}
		}
		//draw currently selected menu
		for(let i = 0;i<6;i++){
			image(selectionBox,sqrWidth*(i%3+1),sqrHeight*ceil((i+0.1)/3),sqrWidth,sqrHeight)
			image(selectionBox,width-sqrWidth*(4-i%3),sqrHeight*ceil((i+0.1)/3),sqrWidth,sqrHeight)
			image(knightImages[currentKnightUnits[i]][0],(i%3+1)*sqrWidth,sqrHeight*ceil((i+0.1)/3),sqrWidth,sqrHeight)
			image(samuraiImages[currentSamuraiUnits[i]][0],width-(4-i%3)*sqrWidth,sqrHeight*ceil((i+0.1)/3),sqrWidth,sqrHeight)
		}

		//draw lower menu
		for(let i = 0;i<12;i++){
			image(selectionBox,sqrWidth*(i%3+1),sqrHeight*(3+ceil((i+0.1)/3)),sqrWidth,sqrHeight)
			image(selectionBox,sqrWidth*(i%3+5),sqrHeight*(3+ceil((i+0.1)/3)),sqrWidth,sqrHeight)
			image(selectionBox,sqrWidth*(i%3+8),sqrHeight*(3+ceil((i+0.1)/3)),sqrWidth,sqrHeight)
			image(selectionBox,sqrWidth*(i%3+12),sqrHeight*(3+ceil((i+0.1)/3)),sqrWidth,sqrHeight)
			if(i<knightImages.length){
				image(knightImages[i][0],sqrWidth*(i%3+1),sqrHeight*(3+ceil((i+0.1)/3)),sqrWidth,sqrHeight)
			}	
			if(i<samuraiImages.length){
				image(samuraiImages[i][0],sqrWidth*(i%3+12),sqrHeight*(3+ceil((i+0.1)/3)),sqrWidth,sqrHeight)
			}
		}

		//draw skins
		for(let i = 0;i<6;i++){
			if(i<knightSkins.length){
				image(knightSkins[i][0],sqrWidth*(5+i),sqrHeight*4,sqrWidth,sqrHeight)
			}
		}

	}

	update(){
		//interactions with currently equipped
		if(mouseX>sqrWidth && mouseY>sqrHeight && mouseX<4*sqrWidth && mouseY<3*sqrHeight){
			this.currentX = Math.floor(map(mouseX,sqrWidth,4*sqrWidth,0,3))
			this.currentY = Math.floor(map(mouseY,sqrHeight,3*sqrHeight,0,2))
			this.selected = this.currentX+(this.currentY*3)
			fill(0,126,0,0.5)
			image(smallSelectionBox,((this.selected%3)+1)*sqrWidth,(Math.ceil((this.selected+0.1)/3))*sqrHeight,sqrWidth,sqrHeight)
			if(mouseIsPressed && this.current==undefined && this.reset == false){
				this.current = this.selected
				this.swap = true
			}
			else if(mouseIsPressed && this.current!==undefined && this.current!== this.selected && this.swap == true){
				currentKnightUnits[this.selected] = [currentKnightUnits[this.current], currentKnightUnits[this.current] = currentKnightUnits[this.selected]][0]
				this.current = undefined
				this.reset = true
			}
			else if(mouseIsPressed && this.current!==undefined && this.swap == false){
				currentKnightUnits[this.selected] = this.current
			}
		}
		//interactions with all units
		else if(mouseX>sqrWidth && mouseY>4*sqrHeight && mouseX<4*sqrWidth && mouseY<8*sqrHeight){
			this.currentX = Math.floor(map(mouseX,sqrWidth,4*sqrWidth,0,3))
			this.currentY = Math.floor(map(mouseY,sqrHeight*4,8*sqrHeight,0,4))
			this.selected = this.currentX+(this.currentY*3)
			fill(0,126,0,0.5)
			image(smallSelectionBox,((this.selected%3)+1)*sqrWidth,(Math.ceil((this.selected+0.1)/3)+3)*sqrHeight,sqrWidth,sqrHeight)
			if(mouseIsPressed && this.reset == false && this.current===undefined && this.selected<knightImages.length){
				this.current = this.selected
				this.swap = false
				console.log(this.current)
				this.reset = true
			}
			else if(mouseIsPressed && this.reset == false){
				this.current=undefined
				this.reset = true
			}
		}
		else{
			this.currentX = undefined
			this.currentY = undefined
		}

		//swap skins
		if(mouseX>5*sqrWidth && mouseX<11*sqrWidth && mouseY>4*sqrHeight && mouseY<5*sqrHeight){
			let skinNo = Math.floor(map(mouseX,sqrWidth*5,sqrWidth*11,0,6))
			if(mouseIsPressed && this.reset == false){
					if(skinNo<knightSkins.length){
						knightImages[skinNo+1]=[knightSkins[skinNo], knightSkins[skinNo] = knightImages[skinNo+1]][0]
					}
				this.reset = true
			}
		}

		//reset flag
		if(!mouseIsPressed){
			this.reset = false
		}
	}
}

class Achievements extends Menu{
	constructor(){
		super()
	}

	display(){

	}

	update(){

	}
}

class Options extends Menu{
	constructor(){
		super()
	}

	display(){

	}

	update(){
		
	}
}

class CloseButton extends Menu{
	constructor(){
		super()
	}

	display(){
		image(close,width-sqrWidth/2,0,sqrWidth/2,sqrHeight/2)
	}

	update(){
		if(mouseX>(width-sqrWidth/2) && mouseY<(sqrWidth/2) && mouseIsPressed){
			gameComponents.splice(gameComponents.indexOf(this),1)
			gameComponents.splice(gameComponents.indexOf(this-1),1)
			gameComponents.push(new MainMenu)
		}
	}
}

class GameOverScreen extends Menu{
		constructor(knightKills,samuraiKills){
		super()
		this.knightKills = knightKills
		this.samuraiKills = samuraiKills
	}

	display(){
		image(login,0,0,width,height)
		textSize(30)
		text("knight kills: "+this.knightKills,5*sqrWidth,4*sqrHeight)
		text("samurai kills: "+this.samuraiKills,5*sqrWidth,5*sqrHeight)
	}

	update(){
		if(mouseX>5*sqrWidth && mouseX<11*sqrWidth && mouseY>5*sqrHeight && mouseY<6*sqrHeight){
			fill(0,255,0,180)
			rect(5*sqrWidth,5*sqrHeight,6*sqrWidth,sqrHeight)
			if(mouseIsPressed){
				gameComponents.splice(gameComponents.indexOf(this),1)
				gameComponents.push(new LoadingStage())
				gameComponents.push(new MainMenu())
			}
		}
	}
}
