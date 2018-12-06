import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';

const Logo = () => {
	return (
		<div className ='ma4 mt0'>
		<Tilt className="Tilt br shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
			<div className="Tilt-inner pa3"><img alt='Hunjee' src='https://pbs.twimg.com/profile_images/777344527321403392/liW9mbhb_400x400.jpg'></img></div>
		</Tilt>
		</div>
			);
}

export default Logo;