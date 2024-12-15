import { BrowserRouter } from "react-router-dom";

import {
	About,
	Contact,
	Experience,
	Hero,
	Navbar,
	Tech,
	Works,
	StarsCanvas,
} from "./components";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
	return (
		<BrowserRouter>
			<div className="relative z-0" style={{ backgroundColor: 'rgb(20, 10, 10)' }}>
				<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
				<GoogleOAuthProvider clientId="262631439908-s0937993d5a3r4svulmrnh7gbqvs6b01.apps.googleusercontent.com">
					<Navbar />
				</GoogleOAuthProvider>
					<Hero />
				</div>
				<About />
				<Experience />
				<Tech />
				<Works />
				<div className="relative z-0">
					<Contact />
					<StarsCanvas />
				</div>
			</div>
		</BrowserRouter>
	);
};

export default App;
