var timeline = anime.timeline({
  loop: true
});

var reactiflux = document.querySelector('.reactiflux');

var react = document.querySelector('.react');

timeline.add({
  targets: reactiflux,
  rotate: '1turn',
  transformOrigin: '29.1px',
  scale: 2.7,
  duration: 1800,
  opacity: 0,
  easing: 'easeInOutBack'
}).add({
  targets: react,
  rotate: '1turn',
  scale: 3.09,
  opacity: [0, 1],
  marginLeft: '1px',
  duration: 1800,
  offset: '-=1800',
  easing: 'easeInOutBack'
}).add({
  targets: react,
  rotate: '2turn',
  marginLeft: '1px',
  scale: 3.09,
  opacity: 0,
  duration: 1800,
  easing: 'easeInOutBack'
}).add({
  targets: reactiflux,
  transformOrigin: '29.1px',
  rotate: '2turn',
  scale: 2.7,
  duration: 1800,
  offset: '-=1800',
  opacity: [0, 1],
  easing: 'easeInOutBack'
});