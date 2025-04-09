// src/components/sections/home/map-component.tsx
"use client";

import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGhleGFuZGVyc2F2YWdlIiwiYSI6ImNtOTlrdTU0YTA0emEybHNrOHc0ZHVpYjQifQ.yXYl80ILdCTnqp3d09Chxg";

export function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Correct coordinates for 10111 Richmond Ave, Houston
  const OFFICE_COORDINATES: [number, number] = [-95.5569, 29.7329];

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map centered on office location
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: OFFICE_COORDINATES,
      zoom: 14,
      pitch: 45,
      bearing: 0,
      attributionControl: false,
      antialias: true,
    });

    // Add navigation controls
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true,
      showCompass: true,
    });
    map.current.addControl(nav, "bottom-right");

    // Add this after initializing the map (around line 40)
    map.current.on("moveend", () => {
      // Check if the map has moved away from the pin and recenter if needed
      if (map.current && mapLoaded) {
        const currentCenter = map.current.getCenter();
        const pinLocation = OFFICE_COORDINATES;

        // If the map has drifted from the pin location, recenter it
        if (
          Math.abs(currentCenter.lng - pinLocation[0]) > 0.0001 ||
          Math.abs(currentCenter.lat - pinLocation[1]) > 0.0001
        ) {
          map.current.easeTo({
            center: pinLocation,
            duration: 1000, // Smooth transition
          });
        }
      }
    });

    // Create a custom animated pin element
    const createAnimatedPin = () => {
      // Create the main container
      const pinContainer = document.createElement("div");
      pinContainer.className = "pin-container";

      // Create the pin element
      const pin = document.createElement("div");
      pin.className = "map-pin";

      // Create the pulse animation element
      const pinPulse = document.createElement("div");
      pinPulse.className = "pin-pulse";

      // Assemble the pin components
      pinContainer.appendChild(pin);
      pinContainer.appendChild(pinPulse);

      return pinContainer;
    };

    // Add styles for the animated pin and popup
    const addStyles = () => {
      const styleElement = document.createElement("style");
      styleElement.textContent = `
        .pin-container {
          position: relative;
          width: 30px;
          height: 30px;
          margin-top: -30px; /* Offset to position the bottom of the pin at the exact coordinates */
        }
        
        .map-pin {
          background-color: #3B82F6;
          width: 20px;
          height: 20px;
          border-radius: 50% 50% 50% 0;
          position: absolute;
          transform: rotate(-45deg);
          left: 50%;
          top: 50%;
          margin: -15px 0 0 -10px;
          animation: bounce 1s ease-in-out infinite alternate;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .map-pin::after {
          content: '';
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: white;
          position: absolute;
          left: 50%;
          top: 50%;
          margin: -5px 0 0 -5px;
        }
        
        .pin-pulse {
          background: rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          height: 30px;
          width: 30px;
          position: absolute;
          left: 0;
          top: 0;
          margin: 0;
          animation: pulse 2s ease-out infinite;
        }
        
        @keyframes bounce {
          from {
            transform: rotate(-45deg) translateY(0);
          }
          to {
            transform: rotate(-45deg) translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(0.1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .office-popup {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', sans-serif;
          color: #333;
        }
        
        .office-popup h3 {
          background: #3B82F6;
          color: white;
          margin: 0;
          padding: 12px 16px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 8px 8px 0 0;
        }
        
        .popup-content {
          padding: 12px 16px;
        }
        
        .popup-content p {
          margin: 0 0 12px 0;
          font-size: 14px;
          line-height: 1.4;
        }
        
        .popup-content a {
          display: inline-block;
          background: #3B82F6;
          color: white;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .popup-content a:hover {
          background: #2563EB;
        }
        
        .mapboxgl-popup-content {
          padding: 0 !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          max-width: 200px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
        }
        
        .mapboxgl-popup-close-button {
          color: white !important;
          font-size: 18px !important;
          padding: 5px !important;
          right: 5px !important;
          top: 7px !important;
          background: transparent !important;
        }
      `;
      document.head.appendChild(styleElement);
    };

    // Add the styles
    addStyles();

    map.current.on("load", () => {
      setMapLoaded(true);

      if (!map.current) return;

      // Style water features
      if (map.current.getLayer("water")) {
        map.current.setPaintProperty("water", "fill-color", "#E0F2FE");
      }

      // Add terrain
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      map.current.setTerrain({
        source: "mapbox-dem",
        exaggeration: 1.1,
      });

      // Add fog effect
      map.current.setFog({
        color: "rgb(255, 255, 255)",
        "horizon-blend": 0.1,
        range: [5, 15],
        "star-intensity": 0,
      });

      // Add buildings
      const layers = map.current.getStyle().layers;
      let firstSymbolId;
      if (layers) {
        for (const layer of layers) {
          if (layer.type === "symbol") {
            firstSymbolId = layer.id;
            break;
          }
        }
      }

      map.current.addLayer(
        {
          id: "building-extrusions",
          source: "composite",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 13,
          paint: {
            "fill-extrusion-color": [
              "interpolate",
              ["linear"],
              ["get", "height"],
              0,
              "#F1F5F9",
              50,
              "#E2E8F0",
              100,
              "#CBD5E1",
              200,
              "#94A3B8",
            ],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.85,
            "fill-extrusion-translate": [0, 0],
            "fill-extrusion-translate-anchor": "viewport",
            "fill-extrusion-vertical-gradient": true,
          },
        },
        firstSymbolId
      );

      // Add service area with gradient effect
      map.current.addSource("service-area", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-95.6, 29.9],
                [-95.2, 29.9],
                [-95.2, 29.6],
                [-95.6, 29.6],
                [-95.6, 29.9],
              ],
            ],
          },
          properties: {},
        },
      });

      // Add service area fill
      map.current.addLayer({
        id: "service-area-fill",
        type: "fill",
        source: "service-area",
        layout: {},
        paint: {
          "fill-color": "#3B82F6",
          "fill-opacity": 0.08,
          "fill-pattern": "hatch-pattern",
        },
      });

      // Add service area outline
      map.current.addLayer({
        id: "service-area-outline",
        type: "line",
        source: "service-area",
        layout: {},
        paint: {
          "line-color": "#3B82F6",
          "line-width": 2,
          "line-dasharray": [3, 3],
          "line-opacity": 0.8,
        },
      });

      // Create a simple popup content
      const popupContent = `
        <div class="office-popup">
          <h3>Zukus Industries HQ</h3>
          <div class="popup-content">
            <p>10111 Richmond Ave, Suite 500<br>Houston, TX 77042</p>
            <a href="https://maps.google.com/?q=10111+Richmond+Ave+Suite+500+Houston+TX+77042" target="_blank">Get Directions</a>
          </div>
        </div>
      `;

      // Create the popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        maxWidth: "200px",
        closeOnClick: false,
      }).setHTML(popupContent);

      // Create the animated pin
      const pinElement = createAnimatedPin();

      // Add marker with animated pin at the correct location
      new mapboxgl.Marker({
        element: pinElement,
        anchor: "bottom", // This ensures the bottom of the pin is at the exact coordinates
      })
        .setLngLat(OFFICE_COORDINATES)
        .setPopup(popup)
        .addTo(map.current);

      // Ensure we're centered on the pin
      map.current.flyTo({
        center: OFFICE_COORDINATES,
        essential: true,
        zoom: 14,
        duration: 0,
      });
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
      const styleElement = document.querySelector("style");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <>
      <div ref={mapContainer} className="absolute inset-0 w-full h-full" />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 z-10">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-blue-200 opacity-25"></div>
              <div className="absolute top-0 w-16 h-16 rounded-full border-4 border-t-blue-500 animate-spin"></div>
            </div>
            <p className="text-blue-600 font-medium">
              Loading your experience...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
