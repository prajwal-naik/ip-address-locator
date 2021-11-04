import './App.css';
import MapSection from './components/MapSection'
import Illustration from './components/Illustration';
import MainApp from "./components/MainApp"
import { useState } from 'react';


function App() {

	const [location, setlocation] = useState([51.505, -0.09])

	

	// const location = [51.505, -0.09];;

	return (
		<div className="app">
			<Illustration />
			<MapSection location = {location} />
			<MainApp setlocation = {setlocation}/>
		</div>
	);
}

export default App;
