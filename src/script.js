import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


/**
 * Base
 */
// Debug





// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/8.png')

/**
 * Fonts
 */
const fontLoader = new THREE.FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        fontLoader.load(
            '/fonts/helvetiker_regular.typeface.json',
            (font) =>
            {
                // Material
                const material = new THREE.MeshToonMaterial({ color: new THREE.Color(0x990000) });

            // Ou use a string com o nome da cor
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);



                // Text
                const textGeometry = new THREE.TextBufferGeometry(
                    'Tete, Te Amo !',
                    {
                        font: font,
                        size: 0.5,
                        height: 0.2,
                        curveSegments: 12,
                        bevelEnabled: true,
                        bevelThickness: 0.03,
                        bevelSize: 0.02,
                        bevelOffset: 0,
                        bevelSegments: 5
                    }
                )
                textGeometry.center()

                const text = new THREE.Mesh(textGeometry, material)
                scene.add(text)

                //hearts

                const loader = new GLTFLoader();

                for (let i = 0; i < 150; i++) {
                    // Gera posições aleatórias
                    const posX = (Math.random() - 0.5) * 12;
                    const posY = (Math.random() - 0.5) * 12;
                    const posZ = (Math.random() - 0.5) * 12;
                
                    // Carrega o modelo 3D do coração
                    loader.load('models/heart.glb', (gltf) => {
                        const heart3D = gltf.scene
                        heart3D.name = "Heart";

                        heart3D.traverse((child) => {
                            if (child.isMesh) {
                                child.material.color.set(0x990000); // Substitua 0x990000 pelo código hexadecimal da cor desejada
                            }
                        });
                
                        // Define escala aleatória para cada coração
                        const scale = Math.random() * 0.6 + 0.5; // Escala entre 0.5 e 1
                        heart3D.scale.set(scale, scale, scale);
                
                        // Define posições aleatórias para cada coração
                        heart3D.position.set(posX, posY, posZ);
                
                        // Define rotações aleatórias para cada coração
                        heart3D.rotation.x = Math.random() * Math.PI;
                        heart3D.rotation.y = Math.random() * Math.PI;
                        console.log("coracao",heart3D)
                        // Adiciona o coração à cena
                        scene.add(heart3D);


                    });
                }

                


                
            }
        )
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()