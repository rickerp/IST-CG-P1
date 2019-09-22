import Robot from "./Robot.js"
import Target from "./Target.js"

export default class {

	// per second
	rotationSpeed = 1.2
	movingSpeed = 10

	renderer = null
	robot = null
	target = null
	scene = null
	
	armRotation = 0
	upperArmRotation = 0
	sideRotation = 0

	moveVector = new THREE.Vector3(0, 0, 0)

	keys = {}

	lastTimestamp = 0

	constructor() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: false
		})
		
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
	
		this.createScene()
		this.createCamera()
		this.createRobot()
		this.createTarget()

		window.addEventListener("keydown", this.onKeyDown.bind(this))
		window.addEventListener("keyup", this.onKeyUp.bind(this))

		window.addEventListener("resize", this.onResize.bind(this))
	
		this.animate(this.lastTimestamp)
	}

	createRobot() {
		this.robot = new Robot()
		this.scene.add(this.robot.object)
	}

	createTarget() {
		this.target = new Target()
		this.scene.add(this.target.object)
	}

	createCamera() {
		this.camera = new THREE.OrthographicCamera(
			window.innerWidth / -18,
			window.innerWidth / 18,
			window.innerHeight / 18,
			window.innerHeight / -18,
			-200,
			500);
		this.camera.position.x = 0;
		this.camera.position.y = 0;
		this.camera.position.z = 50;
		this.camera.lookAt(this.scene.position);
	}

	onResize() {
		this.renderer.setSize(window.innerWidth, window.innerHeight)
		this.camera.left = - window.innerWidth / 18
		this.camera.right = window.innerWidth / 18
		this.camera.top = window.innerHeight / 18
		this.camera.bottom = - window.innerHeight / 18
		this.camera.updateProjectionMatrix();
	}

	onKeyUp(e) {
		this.keys[e.keyCode] = false
		switch (e.keyCode) {
			case 81:
			case 87:
				if (!this.keys[81] && !this.keys[87])
					this.sideRotation = 0
				break
			case 90:
			case 88:
				if (!this.keys[90] && !this.keys[88])
					this.upperArmRotation = 0
				break
			case 65:
			case 83:
				if (!this.keys[65] && !this.keys[83])
					this.armRotation = 0
				break
			case 37:
			case 39:
				if (!this.keys[37] && !this.keys[39])
					this.moveVector.x = 0
				break
			case 38:
			case 40:
				if (!this.keys[40] && !this.keys[38])
					this.moveVector.z = 0
				break
		}
	}

	onKeyDown(e) {
		console.log(e.keyCode)
		this.keys[e.keyCode] = true
		switch (e.keyCode) {
			case 81: // q left side rotation
				this.sideRotation = -this.rotationSpeed
				break
			case 87: // w right side rotation
				this.sideRotation = this.rotationSpeed
				break
			case 37: // left arrow
				this.moveVector.x = -1
				break
			case 38: // up arrow
				this.moveVector.z = -1
				break
			case 39: // right arrow
				this.moveVector.x = 1
				break
			case 40: // bottom arrow
				this.moveVector.z = 1
				break
			case 90: // q rotate upper arm left
				this.upperArmRotation = this.rotationSpeed
				break
			case 88: // w rotate upper arm right
				this.upperArmRotation = -this.rotationSpeed
				break
			case 65: // a rotate total arm left
				this.armRotation = this.rotationSpeed 
				break
			case 83: // s rotate total arm right
				this.armRotation = -this.rotationSpeed
				break
			case 49: // 1 upper_camer
				this.setCameraPosition(0, 50, 0)
				break
			case 50: // 2 side_camera
				this.setCameraPosition(0, 0 ,50)
				break
			case 51: // 3 front_camera	
				this.setCameraPosition(50, 0, 0)
				break
			case 52: // 4 wireframe on/off
				this.toggleWireframe()
				break
		}
	}
	
	setCameraPosition(x, y, z){	
		this.camera.position.x = x
		this.camera.position.y = y
		this.camera.position.z = z
		this.camera.lookAt(this.scene.position)
	}

	toggleWireframe(){
		this.robot.material.wireframe = !this.robot.material.wireframe
		this.target.material.wireframe = !this.target.material.wireframe
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

	update(delta) {
		this.robot.rotateArm(delta * this.armRotation, delta * this.sideRotation)
		this.robot.rotateUpperArm(delta * this.upperArmRotation)

		this.robot.object.translateOnAxis(this.moveVector, delta * this.movingSpeed)
	}

	animate(ts) {
		let delta = (ts - this.lastTimestamp) / 1000
		this.lastTimestamp = ts

		this.update(delta)
		this.render()

		requestAnimationFrame(this.animate.bind(this))
	}
}