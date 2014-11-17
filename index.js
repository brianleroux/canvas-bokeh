var Canvas  = require('canvas-browserify')
  , random  = require('random-number-in-range')
  , stage   = new Canvas(window.innerWidth, window.innerHeight)
  , circle  = require('./circle')
  , circles = circle.collection(stage, 178)


circles.forEach(function(c) {
  circle.render(stage, c)
 })

document.body.appendChild(stage)
