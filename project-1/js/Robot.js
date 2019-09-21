export default class  {

	object = null
	material = null
	position = null
	top = null

	constructor() {
		this.object = new THREE.Object3D()
		this.position = { x: 0, y: 0, z: 0}
		
		let material = new THREE.MeshBasicMaterial({
			color: 0x00ff00,
			wireframe: true
		})

		let geometry = new THREE.CubeGeometry(60, 2, 20)
		let mesh = new THREE.Mesh(geometry, material)
		mesh.position.set(
			this.position.x,
			this.position.y,
			this.position.z
		)

		this.object.add(mesh)
	}
}