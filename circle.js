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
