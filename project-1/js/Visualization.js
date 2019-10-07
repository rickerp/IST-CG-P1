import Robot from "./Robot.js";
import Target from "./Target.js";

export default class {
    // per second
    rotationSpeed = 1.5;
    movingSpeed = 25;
    renderer = null;
    robot = null;
    target = null;
    scene = null;

    armRotation = 0;
    upperArmRotation = 0;
    sideRotation = 0;

    keys = {};
    cameras = [];

    lastTimestamp = 0;

    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: false
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.createScene();
        this.createCamera(0, 0, 50);
        this.createCamera(0, 50, 0);
        this.createCamera(50, 0, 0);
        this.camera = this.cameras[0];
        this.createRobot();
        this.createTarget();

        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

        window.addEventListener("resize", this.onResize.bind(this));

        this.animate(this.lastTimestamp);
    }

    createRobot() {
        this.robot = new Robot();
        this.scene.add(this.robot.object);
    }

    createTarget() {
        this.target = new Target();
        this.scene.add(this.target.object);
        this.target.object.position.set(30, 0, 0);
    }

    createCamera(x, y, z) {
        var camera = new THREE.OrthographicCamera(
            window.innerWidth / -18,
            window.innerWidth / 18,
            window.innerHeight / 18,
            window.innerHeight / -18,
            -200,
            500
        );

        camera.position.set(x, y, z);
        camera.lookAt(this.scene.position);
        this.cameras.push(camera);
    }

    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.left = -window.innerWidth / 18;
        this.camera.right = window.innerWidth / 18;
        this.camera.top = window.innerHeight / 18;
        this.camera.bottom = -window.innerHeight / 18;
        this.camera.updateProjectionMatrix();
    }

    onKeyUp(e) {
        this.keys[e.keyCode] = false; // keys left, up, right and down handled here
        switch (e.keyCode) {
            case 81:
            case 87:
                if (!this.keys[81] && !this.keys[87]) this.sideRotation = 0;
                break;
            case 90:
            case 88:
                if (!this.keys[90] && !this.keys[88]) this.upperArmRotation = 0;
                break;
            case 65:
            case 83:
                if (!this.keys[65] && !this.keys[83]) this.armRotation = 0;
                break;
        }
    }

    onKeyDown(e) {
        this.keys[e.keyCode] = true; // keys left, up, right and down handled here
        switch (e.keyCode) {
            case 81: // q left side rotation
                this.sideRotation = -this.rotationSpeed;
                break;
            case 87: // w right side rotation
                this.sideRotation = this.rotationSpeed;
                break;
            case 90: // q rotate upper arm left
                this.upperArmRotation = this.rotationSpeed;
                break;
            case 88: // w rotate upper arm right
                this.upperArmRotation = -this.rotationSpeed;
                break;
            case 65: // a rotate total arm left
                this.armRotation = this.rotationSpeed;
                break;
            case 83: // s rotate total arm right
                this.armRotation = -this.rotationSpeed;
                break;
            case 49: // 1 upper_camer
                this.camera = this.cameras[1];
                break;
            case 50: // 2 side_camera
                this.camera = this.cameras[0];
                break;
            case 51: // 3 front_camera
                this.camera = this.cameras[2];
                break;
            case 52: // 4 wireframe on/off
                this.toggleWireframe();
                break;
        }
    }

    setCameraPosition(x, y, z) {
        this.camera.position.set(x, y, z);
        this.camera.lookAt(this.scene.position);
    }

    toggleWireframe() {
        this.robot.material.wireframe = !this.robot.material.wireframe;
        this.target.material.wireframe = !this.target.material.wireframe;
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AxisHelper(10));
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    updateRobot(distance) {
        // keys: {left:37, up:38, right:39, down:40}
        if (
            !(
                (this.keys[37] && this.keys[39]) ||
                (this.keys[38] && this.keys[40])
            )
        ) {
            var nAxis = 0;
            for (var k = 37; k <= 40; k++) {
                nAxis += this.keys[k];
            }
            if (nAxis >= 2) {
                distance = distance * Math.cos(Math.PI / 4);
            }

            if (this.keys[37]) {
                this.robot.object.position.x -= distance;
            }
            if (this.keys[38]) {
                this.robot.object.position.z -= distance;
            }
            if (this.keys[39]) {
                this.robot.object.position.x += distance;
            }
            if (this.keys[40]) {
                this.robot.object.position.z += distance;
            }
        }
    }

    update(delta) {
        this.robot.rotateArm(
            delta * this.armRotation,
            delta * this.sideRotation
        );
        this.robot.rotateUpperArm(delta * this.upperArmRotation);

        this.updateRobot(delta * this.movingSpeed);
    }

    animate(ts) {
        let delta = (ts - this.lastTimestamp) / 1000;
        this.lastTimestamp = ts;

        this.update(delta);
        this.render();

        requestAnimationFrame(this.animate.bind(this));
    }
}
