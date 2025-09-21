"use client";


interface MapProps {
    location: [number, number]; // Correct type for coordinates
}

const Map = ({ location }: MapProps) => {

    return (
        <div className="relative h-[336px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
            <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${location[1] - 0.01}%2C${location[0] - 0.01}%2C${location[1] + 0.01}%2C${location[0] + 0.01}&layer=mapnik&marker=${location[0]}%2C${location[1]}`}
                style={{ border: "none" }}
                title="Event location map"
            />
        </div>
    );
};

export default Map;

