// I'm manually including these globally atm
import AFRAME, { components } from 'aframe';
import 'aframe-physics-system';
// components

import './components/PlayerController';
import './components/SpaceParticles';


let scene;

window.onload = () => {
  scene = document.querySelector('a-scene');

};
