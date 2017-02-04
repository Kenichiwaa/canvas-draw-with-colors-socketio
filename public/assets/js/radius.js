var setRadius = function(newRadius) {
  if(newRadius<minRadius)
      newRadius = minRadius;
  else if(newRadius>maxRadius)
      newRadius = maxRadius;
  radius = newRadius;
  context.lineWidth = radius*2;

  radSpan.innerHTML = radius;
};

var minRadius = 0.5;
var maxRadius = 100;
var defaultRad = 20;
var interval = 5;
var radSpan = document.getElementById('radval');
var decrad = document.getElementById('decrad');
var incrad = document.getElementById('incrad');

decRad.addEventListener('click', function() {
  setRadius(radius-interval);
});

incRad.addEventListener('click', function() {
  setRadius(radius+interval);
});

setRadius(defaultRad);
