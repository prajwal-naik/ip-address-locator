import { React, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "../styles/MapContainer.css"


function MapSection({location}) {
	

	function simulateMouseClick(element){
		element.dispatchEvent(
			new MouseEvent("click", {
					view: window,
					bubbles: false,
					cancelable: true,
					buttons: 1
			})
		)
	}


	useEffect(() => {
		// Update the document title using the browser API
		// console.log("Using effect");
		var element = document.querySelector('div[id="mapidinner"]');
		// console.log("Element found. Clicking.", element)
		simulateMouseClick(element)

	}, [location]);


	function LocationMarker() {
		const [position, setPosition] = useState(null)
		const map = useMapEvents({
			click() {
				// map.locate()
				// map.setCenter(location)
				setPosition(location)
				map.flyTo(location, map.getZoom(), 1)
			},
			// locationfound(e) {
			//   setPosition(e.latlng)
			//   map.flyTo(e.latlng, map.getZoom())
			// },
		})
	
		return position === null ? null : (
			<Marker position={position}>
				<Popup>IP was tracked here</Popup>
			</Marker>
		)
	}
	return (
		<div id="mapid">
			<MapContainer id = "mapidinner" className = "mapContainer" center={location} zoom={13} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{/* <Marker position={location}>
					<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker> */}
				<LocationMarker />
			</MapContainer>
		</div>
	);
}

export default MapSection
