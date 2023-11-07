import { useEffect, useState } from 'react';
import Transition from './components/Transition';

function App() {
	let [duration, setDuration] = useState(3);
	let [direction, setDirection] = useState('rtl');
	let [reverse, setReverse] = useState(false);
	let [playState, setPlayState] = useState(true);

	useEffect(() => {
		document.onkeydown = e => {
			switch (e.key) {
				case 'ArrowUp': { updateDuration(duration - 1); break; }
				case 'ArrowDown': { updateDuration(duration + 1); break; }
				case 'r': { updateReverse(!reverse); break; }
				case 'e': { updateDirection(direction == 'rtl' ? 'ltr' : 'rtl'); break; }
				case ' ': { updatePlayState(!playState); break; }
			}
		}
	}, [duration, direction, reverse, playState]);

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

	const updateDirection = (dir) =>
		updateTransition(setDirection, dir, i => {
			i.classList.remove(direction);
			i.classList.add(dir);	
		});

	const updatePlayState = (playState) => 
		updateTransition(setPlayState, playState, i =>
			i.style.animationPlayState = playState ? 'running' : 'paused'	
		);

	return (<Transition img1='/img1.png' img2='/img2.png' />);
}

export default App;