import React, { useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import styles from "../app/page.module.css";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/psx-walkie/psx-style_walkie-talkie.glb");
  const pivotRef = useRef();

  const [isDragging, setIsDragging] = useState(false);
  const [rotationDelta, setRotationDelta] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y = Math.PI / 2; // Rotate 90 degrees to face forward
    }
  }, []);

  // Smooth rotation for the object
  useFrame(() => {
    if (pivotRef.current) {
      // Add slight default rotation if not dragging
      if (!isDragging) {
        pivotRef.current.rotation.y += 0.009; // Slow continuous horizontal rotation
      }

      pivotRef.current.rotation.y += rotationDelta.x * 0.009; // Horizontal rotation
      pivotRef.current.rotation.x += rotationDelta.y * 0.009; // Vertical rotation
    }
  });

  // Handle mouse events
  const handlePointerDown = () => setIsDragging(true);

  const handlePointerUp = () => {
    setIsDragging(false);
    setRotationDelta({ x: 2, y: 1 }); // Reset deltas after releasing the mouse
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      setRotationDelta({
        x: event.movementX, // Horizontal drag
        y: -event.movementY, // Vertical drag (inverted for intuitive rotation)
      });
    }
  };

  return (
    <group
      ref={pivotRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <primitive object={gltf.scene} position={[0, 0, 0]} scale={[3, 3, 3]} />
    </group>
  );
};

const ThreeScene = () => {
  return (
    <Canvas
      className={styles.canvas}
      style={{ height: "100vh", width: "100vw" }}
      camera={{ position: [0, 4, 8], fov: 45 }}
    >
      <Model />
    </Canvas>
  );
};

export default ThreeScene;
