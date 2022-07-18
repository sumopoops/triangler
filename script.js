//---------------------------------------------------------------------------- GLOBALS

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
let triangles = [];
const image = new Image();
image.src = "angle.svg";
let moveSpeed = 0.8;
let maxTriangles = (window.innerHeight/1440) * 220;



//---------------------------------------------------------------------------- FUNCTIONS

function ClearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function Move() {
	for (let i=0; i<triangles.length; i++) {
		let t = triangles[i];
		t.x += t.speed;
		t.y += t.speed;
	}
}

function CheckAndKill() {
	for (let i=0; i<triangles.length; i++) {

		// Remove dead triangles from array
		if (triangles[i].x > canvas.width+100 || triangles[i].y > canvas.height+100) {
			triangles.splice(i, 1);
		}
		
	}
}

function Spawn() {
	if (triangles.length < maxTriangles) {
		let size = (Math.ceil(Math.random() * 2) * 100)
		let speedRan = (Math.ceil(Math.random() * 2) * moveSpeed)
		let xPos = RN(-(canvas.width*1.5) , canvas.width);
		let yPos = RN(-(canvas.height*1.5), -200);
		triangles.push({x: xPos, y: yPos, w: size, h: size, speed: speedRan});
	}
}

function Draw() {
	for (let i=0; i<triangles.length; i++) {
		if (triangles[i].x > -300 || triangles[i].y > -300) {
			triangles[i].x = Math.round(triangles[i].x);
			triangles[i].y = Math.round(triangles[i].y);
			triangles[i].w = Math.round(triangles[i].w);
			triangles[i].h = Math.round(triangles[i].h);
			ctx.drawImage(image, triangles[i].x, triangles[i].y, triangles[i].w, triangles[i].h);
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
	CheckAndKill();
	Spawn();
	Draw();

	requestAnimationFrame(loop);
}

function main() {

	// Scale canvas to screen size
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// Populate
	for (i=0; i<1200; i++) {
		Move();
		Spawn();
	}
	
	requestAnimationFrame(loop);

}

main();