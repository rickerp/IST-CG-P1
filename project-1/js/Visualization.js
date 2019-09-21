import Robot from "./Robot.js"

export default class {

	renderer = null
	robot = null
	scene = null

	constructor() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: false
		})
		
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
	
		window.addEventListener("keydown", this.onKeyDown);
		window.addEventListener("resize", this.onResize);

		this.createScene()
		this.createCamera()
		this.createRobot()

		this.animate()
	}

	createRobot() {
		this.robot = new Robot()
		this.scene.add(this.robot.object)
	}

	createCamera() {
		this.camera = new THREE.PerspectiveCamera(70,
			window.innerWidth / window.innerHeight,
			1,
			1000);
		this.camera.position.x = 50;
		this.camera.position.y = 50;
		this.camera.position.z = 50;
		this.camera.lookAt(this.scene.position);
	}

	onResize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	onKeyDown(e) {
		console.log("Key down:", e.keyCode)
	}

	createScene() {
		this.scene = new THREE.Scene()
		this.scene.add(
			new THREE.AxisHelper(10)
		)
	}

	render() {
		this.renderer.render(this.scene, this.camera)
	}

	animate() {
		this.render()
		requestAnimationFrame(() => this.animate())
	}
}