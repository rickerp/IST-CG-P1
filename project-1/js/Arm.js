export default class Arm {
    
    material = null
    object = null
    upperArm = null

    constructor(material) {
        this.object = new THREE.Object3D()
        this.material = material

        this.createLowerArm()
        this.createLowerJoint()

        this.createUpperArm()
    }

    createUpperArm() {
        this.upperArm = new THREE.Object3D()

        this.createTopArm()
        this.createTopJoint()
        this.createHand()

        this.object.add(this.upperArm)
        this.upperArm.position.y = 15
    }

    createLowerArm() {
        let geometry = new THREE.CubeGeometry(1, 14, 1)
        let mesh = new THREE.Mesh(geometry, this.material)
        mesh.position.y = 6.5
		this.object.add(mesh)
    }

    createLowerJoint() {
		let geometry = new THREE.SphereGeometry(2, 8, 8)
        let mesh = new THREE.Mesh(geometry, this.material)
        mesh.position.y = 15
		this.object.add(mesh)
    }

    createTopArm() {
        let geometry = new THREE.CubeGeometry(1, 14, 1)
        let mesh = new THREE.Mesh(geometry, this.material)
        mesh.position.y = 9
		this.upperArm.add(mesh)
    }

    createTopJoint() {
		let geometry = new THREE.SphereGeometry(2, 8, 8)
        let mesh = new THREE.Mesh(geometry, this.material)
        mesh.position.y = 17
		this.upperArm.add(mesh)
    }

    createHand() {
        let hand = new THREE.Object3D()
        hand.position.y = 19.5

        let geometry = new THREE.CubeGeometry(5, 1, 5)
        let mesh = new THREE.Mesh(geometry, this.material)
        
        hand.add(mesh)

        hand.add(this.createFinger(-1.5))
        hand.add(this.createFinger(1.5))

        this.upperArm.add(hand)
    }
    
    createFinger(x) {
        let finger = new THREE.Object3D()
        let geometry = new THREE.CubeGeometry(1, 3, 1)
        let mesh = new THREE.Mesh(geometry, this.material)
        mesh.position.x = x
        mesh.position.y = 2
        finger.add(mesh)
        return finger
    }

}