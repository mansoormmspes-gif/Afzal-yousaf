"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "next-themes";

function ParticleField() {
    const pointsRef = useRef<THREE.Points>(null);
    const { theme, resolvedTheme } = useTheme();

    // Create random points in a sphere or wide box
    const [positions, initialPositions] = useMemo(() => {
        const count = 2000;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            // Spread particles across a wider area to ensure they fill the screen
            pos[i] = (Math.random() - 0.5) * 30;
        }
        return [pos, new Float32Array(pos)];
    }, []);

    const baseRotationRef = useRef({ x: 0, y: 0 });

    useFrame((state, delta) => {
        if (pointsRef.current) {
            // Update time-based rotation
            baseRotationRef.current.x -= delta / 20;
            baseRotationRef.current.y -= delta / 30;

            // Get scroll position safely
            const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;

            // Combine time-based and scroll-based rotation
            pointsRef.current.rotation.x = baseRotationRef.current.x + scrollY * 0.001;
            pointsRef.current.rotation.y = baseRotationRef.current.y + scrollY * 0.0005;

            // Gentle wave motion for particles
            const time = state.clock.getElapsedTime();
            const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

            for (let i = 0; i < positionsArray.length; i += 3) {
                // Apply slight wobble
                positionsArray[i] = initialPositions[i] + Math.sin(time + initialPositions[i + 1]) * 0.1;
                positionsArray[i + 1] = initialPositions[i + 1] + Math.cos(time + initialPositions[i]) * 0.1;
            }
            pointsRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    // Determine color based on theme (use resolvedTheme for system preference fallback)
    const isDark = resolvedTheme === "dark";
    const particleColor = isDark ? "#d4af37" : "#111111"; // Gold for dark, sleek dark grey/black for light

    return (
        <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color={particleColor}
                size={0.06}
                sizeAttenuation={true}
                depthWrite={false}
                opacity={isDark ? 0.6 : 0.4}
            />
        </Points>
    );
}

export default function Background3D() {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -10, pointerEvents: 'none' }} aria-hidden="true">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ParticleField />
            </Canvas>
        </div>
    );
}
