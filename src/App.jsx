import { useEffect, useState } from 'react';
import Transition from './components/Transition';
import record from './recorder';

function App() {
	let [duration, setDuration] = useState(3);
	let [angle, setAngle] = useState('rtl');
	let [reverse, setReverse] = useState(false);
	let [playState, setPlayState] = useState(true);

	useEffect(() => {
		document.onkeydown = e => {
			switch (e.key) {
				case 'ArrowUp': { updateDuration(duration - 1); break; }
				case 'ArrowDown': { updateDuration(duration + 1); break; }
				case 'q': { updateReverse(!reverse); break; }
				case 'e': { updateAngle(angle == 'rtl' ? 'ltr' : 'rtl'); break; }
				case ' ': { updatePlayState(!playState); break; }
				case 'r': { record(duration); break; }
			}
		}
	}, [duration, angle, reverse, playState]);

	function updateTransition(setState, state, callback) {
		document.querySelectorAll('.transition, .transition *').forEach(callback);
		setState(state);
	}

	const updateDuration = (dur) => {
		if (dur < duration && dur <= 0) dur = duration / 2;
		if (dur > duration && duration < 1) dur = duration * 2;
		updateTransition(setDuration, dur, i =>
			i.style.animationDuration = `${dur}s`	
		);
	}

	const updateReverse = (reverse) => 
		updateTransition(setReverse, reverse, i =>
			i.style.animationDirection = reverse ? 'reverse' : 'normal'	
		);

	const updateAngle = (ang) =>
		updateTransition(setAngle, ang, i => {
			i.classList.remove(angle);
			i.classList.add(ang);	
		});

	const updatePlayState = (playState) => 
		updateTransition(setPlayState, playState, i =>
			i.style.animationPlayState = playState ? 'running' : 'paused'	
		);

	return (
		<Transition img1='/img1.png' img2='/img2.png' />
	);
}

export default App;