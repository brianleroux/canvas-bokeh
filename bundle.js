(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var random = require('random-number-in-range')

/**
* returns a randomly generated array of bokeh circles
*/
function bokeh(canvas, count) {
  var circles = []

  while (count--) {
    circles.push({
      x:random(0, canvas.width), 
      y:random(0, canvas.height),
      radius:random(1,120),
      hue:random(0, 360),
      saturation:random(10, 50),
      lightness:random(1, 50),
      alpha:random(5,30)/100
    })
  }
  return circles
}

/**
* renders any circle object to the canvas
*/
function render(canvas, options) {

  var ctx = canvas.getContext('2d')    
    , radius = options.radius
    , x = options.x
    , y = options.y
    , hue = options.hue
    , saturation = options.saturation
    , lightness = options.lightness
    , alpha = options.alpha
    , shadowBlur = radius/2
    , lineWidth = radius/40
    , fillColor = 'hsla('+hue+','+saturation+'%,'+lightness+'%,'+alpha+')'
    , strokeColor = 'hsla('+hue+','+saturation+'%,'+lightness+'%,'+alpha+')'
    , shadowColor = 'hsla('+hue+','+saturation*2+'%,'+lightness*2+'%,'+alpha*2.5+')'

  ctx.fillStyle = fillColor
  ctx.shadowColor = shadowColor
  ctx.shadowBlur = shadowBlur
  ctx.strokeStyle = strokeColor
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI*2, false)
  ctx.closePath()
  ctx.fill()

  ctx.beginPath()
  ctx.arc(x, y, radius-lineWidth/2, 0, Math.PI*2, false)
  ctx.closePath()
  ctx.stroke()

  return canvas
}

module.exports = { collection:bokeh, render:render}

},{"random-number-in-range":4}],2:[function(require,module,exports){
var Canvas  = require('canvas-browserify')
  , random  = require('random-number-in-range')
  , stage   = new Canvas(window.innerWidth, window.innerHeight)
  , circle  = require('./circle')
  , circles = circle.collection(stage, 178)


circles.forEach(function(c) {
  circle.render(stage, c)
 })

document.body.appendChild(stage)

},{"./circle":1,"canvas-browserify":3,"random-number-in-range":4}],3:[function(require,module,exports){

var Canvas = module.exports = function Canvas (w, h) {
  var canvas = document.createElement('canvas')
  canvas.width = w || 300
  canvas.height = h || 150
  return canvas
}

Canvas.Image = function () {
  var img = document.createElement('img')
  return img
}




},{}],4:[function(require,module,exports){
"use strict";

var random = function (min, max) {
  if (min === undefined) min = 0;
  if (max === undefined) max = 100;
  return Math.floor(Math.random() * (max - min)) + min;
};

exports["default"] = random;

module.exports = exports.default
},{}]},{},[2]);
