class Particles{
	constructor(x,y,height,width,faction,colours){
		this.x = x
		this.y = y
		this.height = height
		this.width = width
		this.faction = faction
		this.xVel=2*faction
		this.yVel=2
		this.time = 0
		this.transparency = 255
		this.contents = []
		this.xDistance = []
		this.image
		this.imageNo = 0
		if(colours.length!==3){
			console.log(colours[3])
			this.image = colours[3]
			rockExplode.play(0,1,0.4)
		}
		this.red = colours[0]
		this.green = colours[1]
		this.blue = colours[2]
		for(let i = 0;i<20;i++){
			this.contents.push([random(this.x+gameComponents[0].cameraX,this.x+gameComponents[0].cameraX+width),random(this.y,this.y+height),random(-1,1)])
			this.xDistance.push(this.x)
		}
	}

	display(){
		noStroke()
		fill(this.red,this.green,this.blue,this.transparency)
		for(let i = 0;i<20;i++){
			rect(this.contents[i][0],this.contents[i][1],4,4)
		}
		if(this.image!==undefined && this.transparency>=200){
			console.log(this.x)
			image(this.image[this.imageNo],this.x-(sqrWidth*this.faction)+gameComponents[0].cameraX,this.y-sqrHeight,sqrWidth,sqrHeight*2)
		}
	}

	update(){
		for(let i = 0;i<20;i++){
		this.contents[i][0] = gameComponents[0].cameraX+this.xDistance[i]
			if(this.contents[i][1]<(this.y+this.height)){
				this.xDistance[i]+=(this.xVel+this.contents[i][2])
				this.contents[i][1]-=((this.yVel+this.contents[i][2])-1*this.time)
			}
		}
		this.time+=0.1
		this.transparency-=0.2
		if(this.transparency<=0){
			gameComponents[0].particles.splice(gameComponents[0].particles.indexOf(this),1)
		}
		if(this.imageNo<4 && (Math.round(this.time*100000)/100000)%1==0){
			this.imageNo++
		}
	}
}