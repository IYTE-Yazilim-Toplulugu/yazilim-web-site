"use client"

import dynamic from "next/dynamic"

// Dynamically import the diagnostic tool with no SSR
const DiagnosticTool = dynamic(() => import("@/components/diagnostic-tool").then((mod) => mod.DiagnosticTool), {
  ssr: false,
})

export default function ClientDiagnosticWrapper() {
  return <DiagnosticTool />
}
