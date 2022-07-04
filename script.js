//---------------------------------------------------------------------------- GLOBALS

let canvas = document.getElementById("c");
let ctx = canvas.getContext("2d");
let things = [];
let amount = 100;
let image = new Image();
let moveSpeed = 1.2;
image.src = "angle.svg";



//---------------------------------------------------------------------------- FUNCTIONS

function ClearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Populate() {
	for (let i=0; i<amount*2; i++) {
		let size = (Math.ceil(Math.random() * 2) * 100)
		let speedRan = (Math.ceil(Math.random() * 2) * moveSpeed)
		let xPos = RN(0, ((canvas.width*2) + 600) - (canvas.width + 300));
		let yPos = RN(0, ((canvas.height*2) + 600) - (canvas.height + 300));
		things[i] = {x: xPos, y: yPos, w: size, h: size, speed: speedRan};
	}
}

function Move() {
	for (let i=0; i<things.length; i++) {
		let t = things[i];
		t.x += t.speed;
		t.y += t.speed;
	}
}

function CheckKillAndRespawn() {
	for (let i=0; i<things.length; i++) {
		let thingKilled = false;
		if (things[i].x > canvas.width+300) {
			things.splice(i, 1); thingKilled = true; 
		} else if (things[i].y > canvas.height+300) {
			things.splice(i, 1); thingKilled = true;
		}
		let size = (Math.ceil(Math.random() * 2) * 100)
		let speedRan = (Math.ceil(Math.random() * 2) * moveSpeed)
		if (thingKilled) {
			if (things.length < amount) {
				// Spawn New Thing
				let xPos = RN((-canvas.width+300), canvas.width);
				let yPos = RN((-canvas.height+300), -300);
				things.push({x: xPos, y: yPos, w: size, h: size, speed: speedRan});
			}
		}
	}
}

function Draw() {
	for (let i=0; i<things.length; i++) {
		if (things[i].x > -300 || things[i].y > -300) {
			ctx.drawImage(image, things[i].x, things[i].y, things[i].w, things[i].h);
		}
	}
}

function RN(min, max) {
	return (Math.floor(Math.random() * (max-min)) + min);
}



//---------------------------------------------------------------------------- MAIN / LOOP

function loop() {

	ClearCanvas();
	Move();
	CheckKillAndRespawn();
	Draw();

	// Debug
	//console.log("THINGS: " + things.length);

	requestAnimationFrame(loop);
}

function main() {

	// Scale canvas to screen size
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Stuff
	Populate();

	// Debug
	
	
	requestAnimationFrame(loop);

}

main();
