"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DepthScene({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const meshGroupRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if WebGL is supported
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      42,
      container.offsetWidth / container.offsetHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);
    cameraRef.current = camera;

    // Subtle Architectural Geometric Sculpture (Matte / Museum-like)
    const group = new THREE.Group();
    meshGroupRef.current = group;
    scene.add(group);

    // Architectural Matte Arch / Torus Section
    const archGeo = new THREE.TorusGeometry(3.2, 0.08, 32, 100, Math.PI * 1.6);
    const matteMaterial = new THREE.MeshBasicMaterial({
      color: 0x111110,
      transparent: true,
      opacity: 0.18,
      wireframe: false,
    });
    const archMesh = new THREE.Mesh(archGeo, matteMaterial);
    archMesh.rotation.z = Math.PI * 0.2;
    group.add(archMesh);

    // Secondary Delicate Ring
    const innerRingGeo = new THREE.RingGeometry(2.4, 2.43, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x111110,
      transparent: true,
      opacity: 0.09,
      side: THREE.DoubleSide,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, ringMat);
    group.add(innerRing);

    // Subtle floating plane elements
    const planeGeo = new THREE.PlaneGeometry(1.6, 2.4);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x111110,
      transparent: true,
      opacity: 0.04,
      side: THREE.DoubleSide,
    });
    const plane1 = new THREE.Mesh(planeGeo, planeMat);
    plane1.position.set(2.8, -0.6, -1);
    plane1.rotation.y = -0.4;
    group.add(plane1);

    const plane2 = new THREE.Mesh(planeGeo, planeMat);
    plane2.position.set(-2.8, 0.8, -1.5);
    plane2.rotation.y = 0.4;
    group.add(plane2);

    // Mouse Tracking with smooth Lerp
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / container.offsetWidth) * 2 - 1;
      const y = -(((e.clientY - rect.top) / container.offsetHeight) * 2 - 1);
      mouseRef.current.targetX = x * 0.4;
      mouseRef.current.targetY = y * 0.3;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (camera) {
        camera.position.x = mouseRef.current.x * 0.8;
        camera.position.y = mouseRef.current.y * 0.6;
        camera.lookAt(0, 0, 0);
      }

      if (group) {
        group.rotation.y = time * 0.05 + mouseRef.current.x * 0.2;
        group.rotation.x = Math.sin(time * 0.04) * 0.08 + mouseRef.current.y * 0.15;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
