//the stage resizes upon the fancy font loading in, need to stop this from happening

//knight global variables
var knightData
var knightUnitData
var knightProjectileData
var currentKnightUnits = [0,1,2,3,4,5]
var knightImages = []
var knightProjectiles = []
var knightSkins = []

//knightAnims

//samurai global variables
var samuraiData
var samuraiUnitData
var samuraiProjectileData
var currentSamuraiUnits = [0,1,2,3,4,7]
var samuraiImages = []
var samuraiProjectiles = []

//samuraiAnims

//game global variables
var gameComponents = []
var sqrHeight
var sqrWidth
var buffImages = []
var stabSounds = []
var insultSounds = []
var deathSounds = []
var laughSounds = []
var luteSounds = []
var spellImages = []
var peasantSounds = []
var wizardSounds = []

function preload(){
	//text files
	knightData = loadStrings("GameComponents/knightData.txt")
	samuraiData = loadStrings("GameComponents/samuraiData.txt")

	//images
	back = loadImage("Images/Background.png")
	peasant = loadImage("Images/Peasant.png")
	knight = loadImage("Images/Knight.png")
	farmer = loadImage("Images/Farmer.png")
	shogun = loadImage("Images/Shogun.png")
	bard = loadImage("Images/Bard.png")
	horse = loadImage("Images/Cavalry.png")
	knightUI = loadImage("Images/KnightUI.png")
	player1 = loadImage("Images/P1Portrait.png")
	oni = loadImage("Images/Monk.png")
	spear = loadImage("Images/Spear.png")
	bardBuff = loadImage("Images/BardBuff.png")
	knightGold = loadImage("Images/KnightGold.png")
	goldMine = loadImage("Images/Mine.png")
	archer = loadImage("Images/Archer.png")
	samuraiUI = loadImage("Images/SamuraiUI.png")
	stormKing = loadImage("Images/StormKing.png")
	lightning = loadImage("Images/Lightning.png")
	arrow = loadImage("Images/Arrow.png")
	mainMenu = loadImage("Images/MainMenu.png")
	cursorSprite = loadImage("Images/Cursor.png")
	shuriken = loadImage("Images/Shuriken.png")
	ninja = loadImage("Images/Ninja.png")
	healer = loadImage("Images/Healer.png")
	selectionBox = loadImage("Images/SelectionBox.png")
	knightBars = loadImage("Images/KnightFire.png")
	samuraiBars = loadImage("Images/SamuraiFire.png")
	knightCastle = loadImage("Images/KnightCastle.png")
	samuraiCastle = loadImage("Images/SamuraiCastle.png")
	kappa = loadImage("Images/Kappa.png")
	slavNinja = loadImage("Images/SlavNinja.png")
	holyLance = loadImage("Images/HolyLance.png")
	healBuff = loadImage("Images/HealBuff.png")
	minimap = loadImage("Images/Minimap.png")
	minimapBox = loadImage("Images/MinimapBox.png")
	castleIcons = loadImage("Images/CastleIcon.png")
	meteor = loadImage("Images/Meteor.png")
	knightGeneral = loadImage("Images/IceKnight.png")
	close = loadImage("Images/X.png")
	shop = loadImage("Images/Shop.png")
	smallSelectionBox = loadImage("Images/SmallSelectionBox.png")
	wizard = loadImage("Images/ImproperWizard.png")
	fireball = loadImage("Images/Fireball.png")
	engineer = loadImage("Images/Engineer.png")
	barricade = loadImage("Images/Barricade.png")
	login = loadImage("Images/LoginPage.png")
	net = loadImage("Images/Net.png")
	target = loadImage("Images/Target.png")
	boom = loadImage("Images/Boom.png")
	bunny = loadImage("Images/Bunny.png")
	end = loadImage("Images/EndBackground.png")

	stab1 = loadSound("Sounds/Stab1.wav")
	stab2 = loadSound("Sounds/Stab2.wav")
	stab3 = loadSound("Sounds/Stab3.wav")
	stab4 = loadSound("Sounds/Stab4.wav")
	stab5 = loadSound("Sounds/Stab5.wav")
	stab6 = loadSound("Sounds/Stab6.wav")
	stab7 = loadSound("Sounds/Stab7.wav")
	lute1 = loadSound("Sounds/Lute1.wav")
	lute2 = loadSound("Sounds/Lute2.wav")
	laugh1 = loadSound("Sounds/Laugh1.wav")
	laugh2 = loadSound("Sounds/Laugh2.wav")
	laugh3 = loadSound("Sounds/Laugh3.wav")
	lance1 = loadSound("Sounds/Lance1.wav")
	insult1 = loadSound("Sounds/Insult1.wav")
	insult2 = loadSound("Sounds/Insult2.wav")
	insult3 = loadSound("Sounds/Insult3.wav")
	insult4 = loadSound("Sounds/Insult4.wav")
	insult5 = loadSound("Sounds/Insult5.wav")
	insult6 = loadSound("Sounds/Insult6.wav")
	insult7 = loadSound("Sounds/Insult7.wav")
	insult8 = loadSound("Sounds/Insult8.wav")
	insult9 = loadSound("Sounds/Insult9.wav")
	insult10 = loadSound("Sounds/Insult10.wav")
	insult11 = loadSound("Sounds/Insult11.wav")
	insult12 = loadSound("Sounds/Insult12.wav")
	insult13 = loadSound("Sounds/Insult13.wav")
	insult14 = loadSound("Sounds/Insult14.wav")
	insult15 = loadSound("Sounds/Insult15.wav")
	insult16 = loadSound("Sounds/Insult16.wav")
	insult17 = loadSound("Sounds/Insult17.wav")
	insult18 = loadSound("Sounds/Insult18.wav")
	insult19 = loadSound("Sounds/Insult19.wav")
	horn1 = loadSound("Sounds/Horn.wav")
	death1 = loadSound("Sounds/Death1.wav")
	death2 = loadSound("Sounds/Death2.wav")
	death3 = loadSound("Sounds/Death3.wav")
	death4 = loadSound("Sounds/Death4.wav")
	death5 = loadSound("Sounds/Death5.wav")
	death6 = loadSound("Sounds/Death6.wav")
	charge1 = loadSound("Sounds/Charge1.wav")
	charge2 = loadSound("Sounds/Charge2.wav")
	baseInjured = loadSound("Sounds/BaseInjured.wav")
	music1 = loadSound("Sounds/Music1.mp3")
	projectile1=loadSound("Sounds/Projectile1.wav")
	projectile2=loadSound("Sounds/Projectile2.wav")
	mine1 = loadSound("Sounds/Mine1.wav")
	wizardInsult1 = loadSound("Sounds/WizardInsult1.wav")
	wizardInsult2 = loadSound("Sounds/WizardInsult2.wav")
	wizardInsult3 = loadSound("Sounds/WizardInsult3.wav")
	wizardInsult4 = loadSound("Sounds/WizardInsult4.wav")
	bass = loadSound("Sounds/RussianHardbass.mp3")
	rockExplode = loadSound("Sounds/RockExplode.wav")
	
}
function setup(){
	//canvas

	let ratio = displayHeight/displayWidth
	
	createCanvas(windowWidth,windowWidth*ratio)
	background(255,0,0)
	fill(0,255,0)
	text("a house cabbage will start rotting faster than a food cabbage",250,250)
	frameRate(60)
	noSmooth()
	noCursor()
	noStroke()
	sqrHeight = height/9
	sqrWidth = width/16

	//Sounds
	stabSounds.push(stab1,stab2,stab3,stab4,stab5,stab7)
	//stab 6 too loud
	insultSounds.push(insult1,insult2,insult3,insult4,insult5,insult6,insult7,insult8,insult16,insult17,insult18,insult19)
	peasantSounds.push(insult9,insult10,insult11,insult12,insult13,insult14,insult15)
	//16 to 19 good volume
	//9 to 15 too quiet
	deathSounds.push(death1,death2,death3,death4,death5,death6)
	laughSounds.push(laugh1,laugh2,laugh3)
	luteSounds.push(lute1,lute2)
	wizardSounds.push(wizardInsult1,wizardInsult2,wizardInsult3,wizardInsult4)

	music1.loop(0,1,0.2)

	//spritesheets
	mainMenu = splitImage(mainMenu,2,3,6)
	peasant = splitImage(peasant,3,3,8)
	knight = splitImage(knight,2,2,4)
	horse = splitImage(horse,2,2,4)
	bard = splitImage(bard,2,3,6)
	spear = splitImage(spear,2,2,4)
	archer = splitImage(archer,2,2,4)
	farmer = splitImage(farmer,3,3,8)
	shogun = splitImage(shogun,2,2,4)
	oni = splitImage(oni,1,2,2)
	stormKing = splitImage(stormKing,2,2,4)
	ninja = splitImage(ninja,2,2,4)
	healer = splitImage(healer,2,2,4)
	kappa = splitImage(kappa,1,1,1)
	knightBars = splitImage(knightBars,2,9,18)
	samuraiBars = splitImage(samuraiBars,2,9,18)
	knightCastle = splitImage(knightCastle,2,1,2)
	samuraiCastle = splitImage(samuraiCastle,2,1,2)
	back = splitImage(back,2,3,5)
	slavNinja = splitImage(slavNinja,3,3,8)
	bardBuff = splitImage(bardBuff,5,2,10)
	holyLance = splitImage(holyLance,2,2,4)
	healBuff = splitImage(healBuff,3,2,6)
	castleIcons = splitImage(castleIcons,2,2,4)
	knightGeneral = splitImage(knightGeneral,1,1,1)
	wizard = splitImage(wizard,2,2,4)
	engineer = splitImage(engineer,2,2,4)
	barricade = splitImage(barricade,2,2,3)
	net = splitImage(net,1,1,1)
	bunny = splitImage(bunny,2,2,4)
	boom = splitImage(boom,3,2,5)

	//images
	knightImages.push(peasant,knight,horse,bard,spear,archer,wizard,engineer)
	knightSkins.push(bunny)
	samuraiImages.push(farmer,shogun,oni,stormKing,ninja,healer,kappa,slavNinja)
	knightProjectiles.push(arrow,fireball)
	samuraiProjectiles.push(shuriken,lightning)
	buffImages.push(bardBuff,holyLance,healBuff,net)
	spellImages.push(meteor,kappa)

	//text files
	knightData = splitTextData(knightData,"projectiles","units")
	samuraiData = splitTextData(samuraiData,"projectiles","units")
	knightUnitData = knightData[0]
	knightProjectileData = knightData[1]
	samuraiUnitData = samuraiData[0]
	samuraiProjectileData = samuraiData[1]

	//create a "loading" stage and a main menu
	gameComponents.push(new LoadingStage)
	//gameComponents.push(new ActiveStage)
	gameComponents.push(new MainMenu)
}

function draw(){
	//add in a gameover background or something
	background(end)
	fill(0)

	for(g of gameComponents){
		g.display()
		g.update()
	}
	
	//adds a mouse (do this last)
	image(cursorSprite,mouseX,mouseY,sqrWidth,sqrHeight)
}

function splitTextData(array,keyword,keyword2){
	//splits the data from the text files into unit data and projectile data
	let temp = array.slice(array.indexOf(keyword))
	temp.splice(0,2)
	let temp2 = array.slice(array.indexOf(keyword2),array.indexOf(keyword))
	temp2.splice(0,2)
	temp = splitTextCommas(temp)
	temp2 = splitTextCommas(temp2)
	return([temp2,temp])
}

function splitTextCommas(array){
	for(let i = 0;i<array.length;i++){
		array[i] = array[i].split(",")
	}
	return(array)
}

function collide(position1,size1,speed1,position2,size2,speed2){
		if (position2-speed2 <= position1+speed1+(size1*sqrWidth) && position2-speed2 > position1){
			return true
		}
		else{
			return false
		}
}

function cooldowns(defaultCDs,currentCDs){
	for(let i = 0; i<defaultCDs.length;i++){
		if (currentCDs[i]<defaultCDs[i]){
			currentCDs[i]+=1
		}
	}
	return (currentCDs)
}

function splitImage(img,cols,rows,numberOfFrames){
	//divides a spritesheet up into individual frames
	let fwidth = img.width / cols
  let fheight = img.height / rows
	let frames = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (numberOfFrames > 0) {
        frames.push(img.get(c * fwidth, r * fheight, fwidth, fheight))
      }
      numberOfFrames--
    }
  }
  frames.frameWidth = fwidth
  frames.frameHeight = fheight

  return frames
}