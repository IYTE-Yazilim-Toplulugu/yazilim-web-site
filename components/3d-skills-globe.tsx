"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Loader2, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsClient } from "@/hooks/use-is-client"

// Skills data for the globe
const skills = [
  // Machine Learning & AI
  { name: "Deep Learning", category: "AI", level: 90 },
  { name: "NLP", category: "AI", level: 85 },
  { name: "Computer Vision", category: "AI", level: 85 },
  { name: "Reinforcement Learning", category: "AI", level: 80 },
  { name: "GANs", category: "AI", level: 90 },
  { name: "Transformers", category: "AI", level: 85 },
  { name: "Object Detection", category: "AI", level: 80 },
  // More skills...
]

// Category colors
const categoryColors: Record<string, string> = {
  Programming: "#3b82f6", // blue
  AI: "#8b5cf6", // purple
  Audio: "#ec4899", // pink
  Frameworks: "#10b981", // green
  Data: "#06b6d4", // cyan
  Network: "#f59e0b", // amber
  Cloud: "#0ea5e9", // sky
  Chatbots: "#22c55e", // green
  Security: "#ef4444", // red
  Tools: "#f97316", // orange
  Mathematics: "#14b8a6", // teal
  "Soft Skills": "#8b5cf6", // purple
}

export default function SkillsGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isGlobeInitialized, setIsGlobeInitialized] = useState(false)
  const [isError, setIsError] = useState(false)
  const isClient = useIsClient()

  // Get unique categories
  const categories = Array.from(new Set(skills.map((skill) => skill.category)))

  // Filter skills by category
  const filteredSkills = selectedCategory ? skills.filter((skill) => skill.category === selectedCategory) : skills

  useEffect(() => {
    // Only run in browser environment
    if (!isClient) return

    let animationFrameId: number
    let scene: any,
      camera: any,
      renderer: any,
      globe: any,
      raycaster: any,
      mouse: any,
      skillNodes: any[] = []

    const init = async () => {
      try {
        // Dynamically import Three.js
        const THREE = await import("three").catch((err) => {
          console.error("Failed to load Three.js:", err)
          setIsError(true)
          setIsLoading(false)
          return null
        })

        if (!THREE) return

        const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls").catch((err) => {
          console.error("Failed to load OrbitControls:", err)
          setIsError(true)
          setIsLoading(false)
          return { OrbitControls: null }
        })

        if (!OrbitControls) return

        if (!canvasRef.current || !containerRef.current) return

        // Get container dimensions
        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight

        // Initialize scene
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
        camera.position.z = 200

        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true,
          antialias: true,
        })
        renderer.setSize(width, height)
        renderer.setPixelRatio(window.devicePixelRatio)

        // Add orbit controls
        const controls = new OrbitControls(camera, renderer.domElement)
        controls.enableDamping = true
        controls.dampingFactor = 0.05
        controls.rotateSpeed = 0.5
        controls.enableZoom = false

        // Create globe geometry
        const globeGeometry = new THREE.SphereGeometry(80, 64, 64)
        const globeMaterial = new THREE.MeshBasicMaterial({
          color: 0x111111,
          transparent: true,
          opacity: 0.1,
          wireframe: true,
        })
        globe = new THREE.Mesh(globeGeometry, globeMaterial)
        scene.add(globe)

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        scene.add(ambientLight)

        // Add point light
        const pointLight = new THREE.PointLight(0xffffff, 1)
        pointLight.position.set(100, 100, 100)
        scene.add(pointLight)

        // Setup for raycasting (detecting mouse hover)
        raycaster = new THREE.Raycaster()
        mouse = new THREE.Vector2()

        // Create skill nodes
        skillNodes = []
        filteredSkills.forEach((skill, index) => {
          // Calculate position on sphere
          const phi = Math.acos(-1 + (2 * index) / filteredSkills.length)
          const theta = Math.sqrt(filteredSkills.length * Math.PI) * phi

          const x = Math.sin(phi) * Math.cos(theta) * 80
          const y = Math.sin(phi) * Math.sin(theta) * 80
          const z = Math.cos(phi) * 80

          // Create node geometry
          const size = (skill.level / 100) * 5 + 2
          const nodeGeometry = new THREE.SphereGeometry(size, 16, 16)

          // Get color from category
          const color = categoryColors[skill.category] || "#ffffff"
          const nodeMaterial = new THREE.MeshPhongMaterial({
            color: new THREE.Color(color),
            emissive: new THREE.Color(color),
            emissiveIntensity: 0.3,
            transparent: true,
            opacity: 0.8,
          })

          const node = new THREE.Mesh(nodeGeometry, nodeMaterial)
          node.position.set(x, y, z)
          node.userData = { skill: skill.name, category: skill.category, level: skill.level }

          scene.add(node)
          skillNodes.push(node)
        })

        // Handle window resize
        const handleResize = () => {
          if (!containerRef.current) return
          const width = containerRef.current.clientWidth
          const height = containerRef.current.clientHeight

          camera.aspect = width / height
          camera.updateProjectionMatrix()
          renderer.setSize(width, height)
        }

        window.addEventListener("resize", handleResize)

        // Handle mouse move for raycasting
        const handleMouseMove = (event: MouseEvent) => {
          if (!containerRef.current || !canvasRef.current) return

          const rect = canvasRef.current.getBoundingClientRect()
          mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
          mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

          raycaster.setFromCamera(mouse, camera)
          const intersects = raycaster.intersectObjects(skillNodes)

          if (intersects.length > 0) {
            const intersectedObject = intersects[0].object
            setHoveredSkill(intersectedObject.userData.skill)
            document.body.style.cursor = "pointer"
          } else {
            setHoveredSkill(null)
            document.body.style.cursor = "default"
          }
        }

        containerRef.current.addEventListener("mousemove", handleMouseMove)

        // Animation loop
        const animate = () => {
          animationFrameId = requestAnimationFrame(animate)

          try {
            // Rotate globe slowly
            globe.rotation.y += 0.001

            // Update skill nodes
            skillNodes.forEach((node) => {
              // Make hovered skill pulse
              if (node.userData.skill === hoveredSkill) {
                node.scale.x = 1.2 + Math.sin(Date.now() * 0.01) * 0.1
                node.scale.y = 1.2 + Math.sin(Date.now() * 0.01) * 0.1
                node.scale.z = 1.2 + Math.sin(Date.now() * 0.01) * 0.1

                // Increase emissive intensity
                if (node.material) {
                  const material = node.material as THREE.MeshPhongMaterial
                  material.emissiveIntensity = 0.8
                }
              } else {
                node.scale.set(1, 1, 1)
                if (node.material) {
                  const material = node.material as THREE.MeshPhongMaterial
                  material.emissiveIntensity = 0.3
                }
              }
            })

            controls.update()
            renderer.render(scene, camera)
          } catch (error) {
            console.error("Error in animation loop:", error)
            cancelAnimationFrame(animationFrameId)
            setIsLoading(false)
            setIsError(true)
          }
        }

        animate()
        setIsLoading(false)
        setIsGlobeInitialized(true)

        // Cleanup function
        return () => {
          window.removeEventListener("resize", handleResize)
          if (containerRef.current) {
            containerRef.current.removeEventListener("mousemove", handleMouseMove)
          }
          cancelAnimationFrame(animationFrameId)

          // Dispose of resources
          skillNodes.forEach((node) => {
            node.geometry.dispose()
            node.material.dispose()
            scene.remove(node)
          })

          globe.geometry.dispose()
          globe.material.dispose()
          scene.remove(globe)

          renderer.dispose()
        }
      } catch (error) {
        console.error("Error initializing 3D globe:", error)
        setIsLoading(false)
        setIsError(true)
      }
    }

    // Only initialize if component is mounted
    if (isClient) {
      init()
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [hoveredSkill, selectedCategory, isClient])

  // If not client-side yet, show a simple loading state
  if (!isClient) {
    return (
      <div className="w-full">
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-muted">Loading...</button>
        </div>
        <Card className="relative w-full aspect-square max-w-xl mx-auto bg-card/50 border-none overflow-hidden backdrop-blur-sm">
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </Card>
      </div>
    )
  }

  // Show a fallback grid view if 3D globe fails
  if (isError) {
    return (
      <div className="w-full">
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {["All Skills", ...categories].map((category, index) => (
            <button
              key={index}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                selectedCategory === (index === 0 ? null : category)
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted hover:bg-muted/80",
              )}
              onClick={() => setSelectedCategory(index === 0 ? null : category)}
            >
              {category}
            </button>
          ))}
        </div>

        <Card className="relative w-full max-w-xl mx-auto bg-card/50 border-none overflow-hidden backdrop-blur-sm p-6">
          <div className="flex flex-col items-center justify-center mb-6">
            <AlertTriangle className="h-8 w-8 text-amber-500 mb-2" />
            <h3 className="text-lg font-semibold mb-1">3D Visualization Unavailable</h3>
            <p className="text-muted-foreground text-center mb-4">
              The 3D skills globe couldn't be loaded. Here's a simplified view of my skills instead.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredSkills.map((skill, index) => (
              <div key={index} className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="font-medium">{skill.name}</div>
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>{skill.category}</span>
                  <span>{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <motion.button
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            selectedCategory === null ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted hover:bg-muted/80",
          )}
          onClick={() => setSelectedCategory(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          All Skills
        </motion.button>

        {categories.map((category) => (
          <motion.button
            key={category}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              selectedCategory === category
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-muted hover:bg-muted/80",
            )}
            onClick={() => setSelectedCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: selectedCategory === category ? categoryColors[category] : undefined,
            }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <Card className="relative w-full aspect-square max-w-xl mx-auto bg-card/50 border-none overflow-hidden backdrop-blur-sm">
        <div ref={containerRef} className="w-full h-full relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading 3D Skills Globe...</span>
            </div>
          )}

          <canvas
            ref={canvasRef}
            className={cn(
              "w-full h-full transition-opacity duration-500",
              isGlobeInitialized ? "opacity-100" : "opacity-0",
            )}
          />

          {hoveredSkill && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border shadow-lg">
              <div className="font-medium">{hoveredSkill}</div>
              <div className="text-xs text-muted-foreground">
                {skills.find((s) => s.name === hoveredSkill)?.category} • Level:{" "}
                {skills.find((s) => s.name === hoveredSkill)?.level}%
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="max-w-xl mx-auto mt-4 text-center text-sm text-muted-foreground">
        {isGlobeInitialized ? (
          <>
            Hover over nodes to see skill details. Click categories to filter skills.
            <br />
            <span className="text-xs">Drag to rotate the globe and explore all skills.</span>
          </>
        ) : (
          <>View skills by category using the filters above.</>
        )}
      </div>
    </div>
  )
}
