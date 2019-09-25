import Arm from "./Arm.js"

export default class  {

	object = null
	material = null
	arm = null

	constructor() {
		this.object = new THREE.Object3D()
		this.material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true
		})

		this.createBoard(0, 5, 0)

		this.createWheel(-18, 2, -8)
		this.createWheel(-18, 2, 8)
		this.createWheel(18, 2, 8)
		this.createWheel(18, 2, -8)

		this.createLowerArticulation(0,6,0)

		this.createArm()

		this.rotateUpperArm(-Math.PI / 2)
	}

	rotateUpperArm(angle) {
		// let rotationZ = new THREE.Quaternion()
		// rotationZ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle)
		// this.arm.upperArm.applyQuaternion(rotationZ)
	
		this.arm.upperArm.rotateZ(angle)
	}

	rotateArm(angle, theta) {
		// let rotationZ = new THREE.Quaternion()
		// rotationZ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle)
		// this.arm.object.applyQuaternion(rotationZ)

		// let rotationY = new THREE.Quaternion()
		// rotationY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), theta)
		// this.arm.object.applyQuaternion(rotationY)

		this.arm.object.rotateZ(angle)
		this.arm.object.rotateY(theta)
	}	
	
	createArm() {
		this.arm = new Arm(this.material)
		this.arm.object.position.y = 8
		this.object.add(this.arm.object)
	}

	createBoard(x, y, z) {
		let geometry = new THREE.CubeGeometry(40, 2, 20)
		let mesh = new THREE.Mesh(geometry, this.material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}
	
	createWheel(x, y, z) {
		let geometry = new THREE.SphereGeometry(2, 8, 8)
		let mesh = new THREE.Mesh(geometry, this.material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}

	createLowerArticulation(x, y, z) {
		let geometry = new THREE.SphereGeometry(4, 8, 8, 0, Math.PI*2, 0, Math.PI/2)
		let mesh = new THREE.Mesh(geometry, this.material)
		mesh.position.set(x, y, z)
		this.object.add(mesh)
	}
	
}