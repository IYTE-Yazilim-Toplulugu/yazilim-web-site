// 11x8 pixel-art space invader
export default function PixelIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg viewBox="0 0 11 8" className={className} fill="currentColor" shapeRendering="crispEdges" aria-hidden="true">
            <path d="M2 0h1v1H2zM8 0h1v1H8zM3 1h1v1H3zM7 1h1v1H7zM2 2h7v1H2zM1 3h2v1H1zM4 3h3v1H4zM8 3h2v1H8zM0 4h11v1H0zM0 5h1v1H0zM2 5h7v1H2zM10 5h1v1h-1zM0 6h1v1H0zM2 6h1v1H2zM8 6h1v1H8zM10 6h1v1h-1zM3 7h2v1H3zM6 7h2v1H6z" />
        </svg>
    )
}
