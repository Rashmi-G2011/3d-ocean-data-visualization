import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


// =====================================================
// SCENE
// =====================================================

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x061525);


// =====================================================
// CAMERA
// =====================================================

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / (window.innerHeight - 100),
    0.1,
    1000
);

camera.position.set(0, 2, 8);


// =====================================================
// RENDERER
// =====================================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight - 100
);

document
    .getElementById("ocean-container")
    .appendChild(renderer.domElement);


// =====================================================
// EARTH
// =====================================================

const geometry = new THREE.SphereGeometry(
    3,
    64,
    64
);

const textureLoader = new THREE.TextureLoader();

const earthTexture = textureLoader.load(
    'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'
);

const material = new THREE.MeshPhongMaterial({
    map: earthTexture,
    shininess: 10
});

const ocean = new THREE.Mesh(
    geometry,
    material
);

scene.add(ocean);


// =====================================================
// OBSERVATION DATA
// DEMONSTRATION / SAMPLE DATA
// =====================================================

const observationLocations = [

    { latitude: 12.5, longitude: 77.6, temperature: 24.5, modelTemperature: 24.1, salinity: 35.1, depth: 500 },
    { latitude: 15.2, longitude: 72.4, temperature: 22.8, salinity: 34.8, depth: 1000 },
    { latitude: 8.6, longitude: 76.9, temperature: 27.2, salinity: 35.4, depth: 200 },
    { latitude: 10.2, longitude: 80.1, temperature: 25.1, salinity: 35.0, depth: 750 },
    { latitude: 5.5, longitude: 85.3, temperature: 23.6, salinity: 34.7, depth: 1500 },

    { latitude: 20.0, longitude: 60.0, temperature: 25.8, salinity: 35.5, depth: 300 },
    { latitude: 10.0, longitude: 50.0, temperature: 26.4, salinity: 35.6, depth: 600 },
    { latitude: -5.0, longitude: 80.0, temperature: 27.0, salinity: 35.2, depth: 400 },
    { latitude: -15.0, longitude: 95.0, temperature: 24.2, salinity: 34.9, depth: 900 },
    { latitude: -25.0, longitude: 110.0, temperature: 21.5, salinity: 34.6, depth: 1200 },

    { latitude: 25.0, longitude: -70.0, temperature: 23.1, salinity: 35.3, depth: 500 },
    { latitude: 15.0, longitude: -50.0, temperature: 26.2, salinity: 35.4, depth: 250 },
    { latitude: 5.0, longitude: -30.0, temperature: 27.1, salinity: 35.1, depth: 700 },
    { latitude: -10.0, longitude: -20.0, temperature: 25.4, salinity: 35.0, depth: 1000 },
    { latitude: -25.0, longitude: -40.0, temperature: 22.6, salinity: 34.8, depth: 1400 },

    { latitude: 35.0, longitude: 20.0, temperature: 20.5, salinity: 37.0, depth: 300 },
    { latitude: 25.0, longitude: 30.0, temperature: 24.8, salinity: 36.2, depth: 500 },
    { latitude: 10.0, longitude: 20.0, temperature: 26.7, salinity: 35.3, depth: 800 },
    { latitude: -10.0, longitude: 10.0, temperature: 25.9, salinity: 35.1, depth: 1100 },
    { latitude: -30.0, longitude: 20.0, temperature: 20.8, salinity: 34.7, depth: 1600 },

    { latitude: 40.0, longitude: -30.0, temperature: 18.5, salinity: 35.8, depth: 400 },
    { latitude: 45.0, longitude: -10.0, temperature: 17.2, salinity: 35.6, depth: 900 },
    { latitude: 30.0, longitude: -10.0, temperature: 21.8, salinity: 36.0, depth: 600 },
    { latitude: -35.0, longitude: -60.0, temperature: 18.9, salinity: 34.5, depth: 1000 },
    { latitude: -45.0, longitude: -30.0, temperature: 14.5, salinity: 34.2, depth: 1500 },

    { latitude: 35.0, longitude: 140.0, temperature: 19.8, salinity: 34.9, depth: 400 },
    { latitude: 25.0, longitude: 150.0, temperature: 23.4, salinity: 35.2, depth: 700 },
    { latitude: 10.0, longitude: 160.0, temperature: 27.0, salinity: 35.0, depth: 500 },
    { latitude: -10.0, longitude: 150.0, temperature: 26.1, salinity: 35.0, depth: 900 },
    { latitude: -30.0, longitude: 150.0, temperature: 21.0, salinity: 34.6, depth: 1300 }

];


// =====================================================
// LATITUDE / LONGITUDE → 3D POSITION
// =====================================================

function latLonToVector3(
    latitude,
    longitude,
    radius
) {

    const phi =
        (90 - latitude) *
        Math.PI / 180;

    const theta =
        (longitude + 180) *
        Math.PI / 180;

    const x =
        -radius *
        Math.sin(phi) *
        Math.cos(theta);

    const y =
        radius *
        Math.cos(phi);

    const z =
        radius *
        Math.sin(phi) *
        Math.sin(theta);

    return new THREE.Vector3(
        x,
        y,
        z
    );
}


// =====================================================
// TEMPERATURE COLORS
// =====================================================

function getTemperatureColor(temperature) {

    if (temperature < 18) {
        return 0x0066ff;
    }

    if (temperature < 22) {
        return 0x00ccff;
    }

    if (temperature < 25) {
        return 0xffff00;
    }

    if (temperature < 27) {
        return 0xff8800;
    }

    return 0xff0000;
}


// =====================================================
// OBSERVATION POINTS
// =====================================================

const observationGeometry =
    new THREE.SphereGeometry(
        0.10,
        12,
        12
    );

const observationPoints = [];


observationLocations.forEach(
    location => {

        const pointMaterial =
            new THREE.MeshBasicMaterial({
                color:
                    getTemperatureColor(
                        location.temperature
                    )
            });


        const point =
            new THREE.Mesh(
                observationGeometry,
                pointMaterial
            );


        const position =
            latLonToVector3(
                location.latitude,
                location.longitude,
                3.03
            );


        point.position.copy(position);


        // DEMO MODEL VALUE
        location.modelTemperature =
            Number(
                (
                    location.temperature +
                    (Math.random() * 1.0 - 0.5)
                ).toFixed(1)
            );


        point.userData.observation =
            location;


        ocean.add(point);

        observationPoints.push(point);

    }
);


// =====================================================
// LIGHTING
// =====================================================

const light =
    new THREE.DirectionalLight(
        0xffffff,
        2
    );

light.position.set(
    5,
    5,
    5
);

scene.add(light);


const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.5
    );

scene.add(ambientLight);


// =====================================================
// ORBIT CONTROLS
// =====================================================

const controls =
    new OrbitControls(
        camera,
        renderer.domElement
    );

controls.enableDamping = true;


// =====================================================
// DEPTH SLIDER
// =====================================================

const depthSlider =
    document.getElementById("depth");

const depthValue =
    document.getElementById("depthValue");


depthSlider.addEventListener(
    "input",
    () => {

        const selectedDepth =
            Number(depthSlider.value);

        depthValue.textContent =
            selectedDepth;


        observationPoints.forEach(
            point => {

                const observation =
                    point.userData.observation;

                const depthDifference =
                    Math.abs(
                        observation.depth -
                        selectedDepth
                    );

                point.visible =
                    depthDifference <= 300;

            }
        );

    }
);


// =====================================================
// PARAMETER TABLE UPDATE
// =====================================================

function updateParameterTable(data) {

    document.getElementById(
        "tableTemperature"
    ).textContent =
        data.temperature;


    document.getElementById(
        "tableModelTemperature"
    ).textContent =
        data.modelTemperature;


    document.getElementById(
        "tableDifference"
    ).textContent =
        (
            data.temperature -
            data.modelTemperature
        ).toFixed(1);


    document.getElementById(
        "tableSalinity"
    ).textContent =
        data.salinity;


    document.getElementById(
        "tableDepth"
    ).textContent =
        data.depth;


    document.getElementById(
        "tableLatitude"
    ).textContent =
        data.latitude;


    document.getElementById(
        "tableLongitude"
    ).textContent =
        data.longitude;

}


// =====================================================
// CLICK OBSERVATION POINT
// =====================================================

const raycaster =
    new THREE.Raycaster();

const mouse =
    new THREE.Vector2();


renderer.domElement.addEventListener(
    "click",
    function(event) {

        const rect =
            renderer.domElement
                .getBoundingClientRect();


        mouse.x =
            (
                (event.clientX - rect.left) /
                rect.width
            ) * 2 - 1;


        mouse.y =
            -(
                (event.clientY - rect.top) /
                rect.height
            ) * 2 + 1;


        raycaster.setFromCamera(
            mouse,
            camera
        );


        const intersections =
            raycaster.intersectObjects(
                observationPoints,
                true
            );


        if (
            intersections.length === 0
        ) {
            return;
        }


        const clickedPoint =
            intersections[0].object;


        const data =
            clickedPoint
                .userData
                .observation;


        // UPDATE TABLE
        updateParameterTable(data);


        // UPDATE OBSERVATION CARD

        document.getElementById(
            "data-card"
        ).innerHTML = `

            <h3>Selected Observation</h3>

            <p>
                <strong>Temperature:</strong>
                ${data.temperature} °C
            </p>

            <p>
                <strong>Model:</strong>
                ${data.modelTemperature} °C
            </p>

            <p>
                <strong>Difference:</strong>
                ${(data.temperature -
                    data.modelTemperature).toFixed(1)} °C
            </p>

            <p>
                <strong>Location:</strong>
                ${data.latitude}°,
                ${data.longitude}°
            </p>

        `;

    }
);


// =====================================================
// MISSION MODE
// =====================================================

const missionButton =
    document.getElementById(
        "missionMode"
    );

const missionResult =
    document.getElementById(
        "missionResult"
    );


missionButton.addEventListener(
    "click",
    () => {

        let highestRisk = null;


        observationLocations.forEach(
            data => {

                const deviation =
                    Math.abs(
                        data.temperature -
                        data.modelTemperature
                    );


                /*
                 DEMO PRIORITY SCORE

                 This is NOT a real hazard
                 prediction model.

                 It demonstrates how a future
                 decision-support layer could
                 prioritize observations.
                */

                let score = 0;


                // Temperature anomaly
                score += deviation * 40;


                // High temperature
                if (
                    data.temperature > 27
                ) {
                    score += 30;
                }


                // Shallow water
                if (
                    data.depth < 500
                ) {
                    score += 10;
                }


                // High salinity
                if (
                    data.salinity > 35.5
                ) {
                    score += 10;
                }


                data.missionScore =
                    score;


                if (
                    highestRisk === null ||
                    score >
                    highestRisk.missionScore
                ) {

                    highestRisk =
                        data;

                }

            }
        );


        if (!highestRisk) {
            return;
        }


        // FIND CORRESPONDING POINT

        const targetPoint =
            observationPoints.find(
                point =>
                    point.userData.observation ===
                    highestRisk
            );


        // UPDATE PARAMETER TABLE

        updateParameterTable(
            highestRisk
        );


        // UPDATE MISSION PANEL

        const deviation =
            Math.abs(
                highestRisk.temperature -
                highestRisk.modelTemperature
            );


        let priority =
            "LOW";


        if (
            highestRisk.missionScore > 45
        ) {
            priority = "HIGH";
        }
        else if (
            highestRisk.missionScore > 25
        ) {
            priority = "MEDIUM";
        }


        missionResult.innerHTML = `

            <strong>🚨 Mission Scan Complete</strong>

            <p>
                Priority:
                <b>${priority}</b>
            </p>

            <p>
                Location:
                ${highestRisk.latitude}°,
                ${highestRisk.longitude}°
            </p>

            <p>
                Temperature:
                ${highestRisk.temperature} °C
            </p>

            <p>
                Model:
                ${highestRisk.modelTemperature} °C
            </p>

            <p>
                Deviation:
                ${deviation.toFixed(1)} °C
            </p>

            <p>
                Depth:
                ${highestRisk.depth} m
            </p>

            <p>
                <small>
                Demo anomaly-prioritization score
                using sample observations.
                </small>
            </p>

        `;


        // HIGHLIGHT TARGET

        observationPoints.forEach(
            point => {

                point.scale.set(
                    1,
                    1,
                    1
                );

                point.material.color.set(
                    getTemperatureColor(
                        point.userData.observation
                            .temperature
                    )
                );

            }
        );


        if (targetPoint) {

            targetPoint.scale.set(
                2.5,
                2.5,
                2.5
            );


            targetPoint.material.color.set(
                0xffffff
            );


            /*
             Move camera toward
             selected region.
            */

            const worldPosition =
                new THREE.Vector3();


            targetPoint.getWorldPosition(
                worldPosition
            );


            camera.position.lerp(
                worldPosition
                    .clone()
                    .normalize()
                    .multiplyScalar(7),
                0.5
            );

        }

    }
);


// =====================================================
// ANIMATION
// =====================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    ocean.rotation.y += 0.002;


    controls.update();


    renderer.render(
        scene,
        camera
    );

}


animate();


// =====================================================
// WINDOW RESIZE
// =====================================================

window.addEventListener(
    "resize",
    () => {

        const height =
            window.innerHeight - 100;


        camera.aspect =
            window.innerWidth /
            height;


        camera.updateProjectionMatrix();


        renderer.setSize(
            window.innerWidth,
            height
        );

    }
);

