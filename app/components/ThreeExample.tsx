"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export const ThreeExample = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Escena
    const scene = new THREE.Scene();

    // Cámara
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4;

    // Render
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // fondo transparente
    mountRef.current.appendChild(renderer.domElement);

    // ==== GRUPO PRINCIPAL (ORB CYBERPUNK) ====
    const group = new THREE.Group();
    scene.add(group);

    // Geometría central: icosaedro low-poly
    const coreGeometry = new THREE.IcosahedronGeometry(1, 1);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: "#22c55e",          // emerald
      metalness: 0.8,
      roughness: 0.2,
      flatShading: true,
      emissive: "#22c55e",
      emissiveIntensity: 1.4,    // efecto neon
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Wireframe del núcleo
    const coreEdges = new THREE.EdgesGeometry(coreGeometry);
    const coreLineMaterial = new THREE.LineBasicMaterial({
      color: "#4ade80", // verde más claro
      linewidth: 1,
    });
    const coreWireframe = new THREE.LineSegments(
      coreEdges,
      coreLineMaterial
    );
    coreMesh.add(coreWireframe);

    // Anillo exterior tipo neon (torus)
    const ringGeometry = new THREE.TorusGeometry(1.6, 0.03, 32, 128);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#38bdf8", // cyan
      transparent: true,
      opacity: 0.9,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.5;
    group.add(ring);

    // Segundo anillo más tenue
    const ringGeometry2 = new THREE.TorusGeometry(2.1, 0.02, 32, 128);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: "#a855f7", // morado
      transparent: true,
      opacity: 0.6,
    });
    const ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ring2.rotation.y = Math.PI / 3;
    group.add(ring2);

    // ==== PARTÍCULAS ALREDEDOR ====
    const particlesCount = 250;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 3 + Math.random() * 3;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3;

      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = y;
      positions[i + 2] = Math.sin(angle) * radius;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: "#22d3ee",
      size: 0.04,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // ==== LUCES CYBERPUNK ====
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight("#22d3ee", 1.2, 10);
    cyanLight.position.set(3, 2, 2);
    scene.add(cyanLight);

    const magentaLight = new THREE.PointLight("#e879f9", 1.2, 10);
    magentaLight.position.set(-3, -2, 2);
    scene.add(magentaLight);

    const backLight = new THREE.PointLight("#22c55e", 0.8, 12);
    backLight.position.set(0, 0, -4);
    scene.add(backLight);

    // ==== INTERACCIÓN MOUSE (PARALLAX) ====
    const mouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = mountRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      mouse.x = x;
      mouse.y = y;
    };

    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();

    // Animación
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Rotación base lenta
      group.rotation.y += 0.0025;
      group.rotation.x += 0.0015;

      // Oscilación de anillos
      ring.rotation.z = Math.sin(elapsed * 0.8) * 0.4;
      ring2.rotation.x = Math.cos(elapsed * 0.6) * 0.3;

      // "Latido" del núcleo
      const scale = 1 + 0.06 * Math.sin(elapsed * 2.2);
      coreMesh.scale.set(scale, scale, scale);

      // Color HSL animado (verde → teal → cyan)
      const hue = 0.38 + 0.07 * Math.sin(elapsed * 1.5);
      coreMaterial.color.setHSL(hue, 0.9, 0.5);
      coreMaterial.emissive.setHSL(hue, 0.9, 0.5);

      // Parallax suave con el mouse
      const targetRotX = mouse.y * 0.9;
      const targetRotY = mouse.x * 0.9;

      group.rotation.x += (targetRotX - group.rotation.x) * 0.06;
      group.rotation.y += (targetRotY - group.rotation.y) * 0.06;

      // Partículas girando despacio
      particles.rotation.y += 0.0008;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Resize
    const handleResize = () => {
      if (!mountRef.current) return;

      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;

      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);

      coreGeometry.dispose();
      coreMaterial.dispose();
      coreEdges.dispose();
      coreLineMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();

      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[500px] hidden md:block sticky top-20"
    />
  );
};
