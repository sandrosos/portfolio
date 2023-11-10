window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (!mobileCheck()) {

  (function() {

      var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

      // Main
      initHeader();
      initAnimation();
      addListeners();

      function initHeader() {
          width = window.innerWidth;
          height = window.innerHeight;
          target = {x: width, y: height/2};

          largeHeader = document.querySelector('.projects');
          largeHeader.style.height = height+'px';

          canvas = document.getElementById('demo-canvas');
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');

          // create points
          points = [];
          for(var x = 0; x < width; x = x + width/20) {
              for(var y = 0; y < height; y = y + height/20) {
                  var px = x + Math.random()*width/20;
                  var py = y + Math.random()*height/20;
                  var p = {x: px, originX: px, y: py, originY: py };
                  points.push(p);
              }
          }

          // for each point find the 5 closest points
          for(var i = 0; i < points.length; i++) {
              var closest = [];
              var p1 = points[i];
              for(var j = 0; j < points.length; j++) {
                  var p2 = points[j]
                  if(!(p1 == p2)) {
                      var placed = false;
                      for(var k = 0; k < 5; k++) {
                          if(!placed) {
                              if(closest[k] == undefined) {
                                  closest[k] = p2;
                                  placed = true;
                              }
                          }
                      }

                      for(var k = 0; k < 5; k++) {
                          if(!placed) {
                              if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                  closest[k] = p2;
                                  placed = true;
                              }
                          }
                      }
                  }
              }
              p1.closest = closest;
          }

          // assign a circle to each point
          for(var i in points) {
              var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
              points[i].circle = c;
          }
      }

      // Event handling
      function addListeners() {
          if(!('ontouchstart' in window)) {
              window.addEventListener('mousemove', mouseMove);
          }
          window.addEventListener('scroll', scrollCheck);
          window.addEventListener('resize', resize);
      }

      function mouseMove(e) {
          var posx = posy = 0;
          if (e.pageX || e.pageY) {
              posx = e.pageX;
              posy = e.pageY;
          }
          else if (e.clientX || e.clientY)    {
              posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
              posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }
          target.x = posx;
          target.y = posy;
      }

      function scrollCheck() {
          if(document.body.scrollTop > height) animateHeader = false;
          else animateHeader = true;
      }

      function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          largeHeader.style.height = height+'px';
          canvas.width = width;
          canvas.height = height;
      }

      // animation
      function initAnimation() {
          animate();
          for(var i in points) {
              shiftPoint(points[i]);
          }
      }

      function animate() {
          if(animateHeader) {
              ctx.clearRect(0,0,width,height);
              for(var i in points) {
                  // detect points in range
                  if(Math.abs(getDistance(target, points[i])) < 4000) {
                      points[i].active = 0.3;
                      points[i].circle.active = 0.6;
                  } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                      points[i].active = 0.1;
                      points[i].circle.active = 0.3;
                  } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                      points[i].active = 0.02;
                      points[i].circle.active = 0.1;
                  } else {
                      points[i].active = 0;
                      points[i].circle.active = 0;
                  }

                  drawLines(points[i]);
                  points[i].circle.draw();
              }
          }
          requestAnimationFrame(animate);
      }

      function shiftPoint(p) {
          TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
              y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
              onComplete: function() {
                  shiftPoint(p);
              }});
      }

      // Canvas manipulation
      function drawLines(p) {
          if(!p.active) return;
          for(var i in p.closest) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.closest[i].x, p.closest[i].y);
              ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
              ctx.stroke();
          }
      }

      function Circle(pos,rad,color) {
          var _this = this;

          // constructor
          (function() {
              _this.pos = pos || null;
              _this.radius = rad || null;
              _this.color = color || null;
          })();

          this.draw = function() {
              if(!_this.active) return;
              ctx.beginPath();
              ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
              ctx.fillStyle = 'rgba(234,156,249,'+ _this.active+')';
              ctx.fill();
          };
      }

      // Util
      function getDistance(p1, p2) {
          return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
      window.addEventListener('resize', resize, false);
      
  })();


  window.human = false;

  var canvasEl = document.querySelector('#demo-canvas2');
  var ctx = canvasEl.getContext('2d');
  var numberOfParticules = 30;
  var pointerX = 0;
  var pointerY = 0;
  var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
  var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

  function setCanvasSize(shift) {
    if (shift) {
      canvasEl.width = window.innerWidth * 2;
      canvasEl.height = window.innerHeight * 2;
      canvasEl.style.width = window.innerWidth + 'px';
      canvasEl.style.height = window.innerHeight + 'px';
      canvasEl.getContext('2d').scale(2, 2);
    } else {
      canvasEl.width = window.innerWidth * 0;
      canvasEl.height = window.innerHeight * 0;
    }
    
  }

  function updateCoords(e) {
    pointerX = e.clientX || e.touches[0].clientX;
    pointerY = e.clientY || e.touches[0].clientY;
  }

  function setParticuleDirection(p) {
    var angle = anime.random(0, 360) * Math.PI / 180;
    var value = anime.random(50, 180);
    var radius = [-1, 1][anime.random(0, 1)] * value;
    return {
      x: p.x + radius * Math.cos(angle),
      y: p.y + radius * Math.sin(angle)
    }
  }

  function createParticule(x,y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = colors[anime.random(0, colors.length - 1)];
    p.radius = anime.random(16, 32);
    p.endPos = setParticuleDirection(p);
    p.draw = function() {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
    return p;
  }

  function createCircle(x,y) {
    var p = {};
    p.x = x;
    p.y = y;
    p.color = '#FFF';
    p.radius = 0.1;
    p.alpha = .5;
    p.lineWidth = 6;
    p.draw = function() {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
      ctx.lineWidth = p.lineWidth;
      ctx.strokeStyle = p.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    return p;
  }

  function renderParticule(anim) {
    for (var i = 0; i < anim.animatables.length; i++) {
      anim.animatables[i].target.draw();
      anim.animatables[i].target.draw();
    }
  }

  function animateParticules(x, y) {
    var circle = createCircle(x, y);
    var particules = [];
    for (var i = 0; i < numberOfParticules; i++) {
    // particules.push(createParticule(x, y));
    }
    anime.timeline().add({
      targets: particules,
      x: function(p) { return p.endPos.x; },
      y: function(p) { return p.endPos.y; },
      radius: 0.1,
      duration: anime.random(1200, 1800),
      easing: 'easeOutExpo',
      update: renderParticule
    })
      .add({
      targets: circle,
      radius: anime.random(700, 700),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: anime.random(600, 800),  
      },
      duration: 18000,
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0
    })
    .add({
      targets: circle,
      radius: anime.random(700, 700),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: anime.random(600, 800),  
      },
      duration: 12000,
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0
    })
    .add({
      targets: circle,
      radius: anime.random(700, 700),
      lineWidth: 0,
      alpha: {
        value: 0,
        easing: 'linear',
        duration: anime.random(600, 800),  
      },
      duration: 9000,
      easing: 'easeOutExpo',
      update: renderParticule,
      offset: 0
    });
  }

  var render = anime({
    duration: Infinity,
    update: function() {
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }
  });

  document.addEventListener(tap, function(e) {
    window.human = true;
    render.play();
    updateCoords(e);
    animateParticules(pointerX, pointerY);
  }, false);

  var centerX = window.innerWidth / 2;
  var centerY = window.innerHeight / 2;


  setCanvasSize(true);
  window.addEventListener('resize', setCanvasSize, false);
}

const homeMenu = document.querySelector('#home-menu');
const projectsMenu = document.querySelector('#projects-menu');
const skillsMenu = document.querySelector('#skills-menu');
const contactMenu = document.querySelector('#contact-menu');

const visibility = (element) => {
  document.querySelector('.visible').classList.add('hidden');
  document.querySelector('.visible').classList.remove('visible');
  document.querySelector(element).classList.remove('hidden');
  document.querySelector(element).classList.add('visible');
}

const active = (menuItem) => {
  document.querySelector('.active').classList.toggle('active');
  menuItem.classList.toggle('active');
}

homeMenu.addEventListener('click', ()=> {
  visibility(".home");  
  active(homeMenu);
});

projectsMenu.addEventListener('click', ()=> {
  visibility(".projects");  
  active(projectsMenu);
});

skillsMenu.addEventListener('click', ()=> {
  visibility(".skills");  
  active(skillsMenu);
});

contactMenu.addEventListener('click', ()=> {
  visibility(".contact-form");
  active(contactMenu);
});

