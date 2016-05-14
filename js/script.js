
        var colors = ["#87D370","#F7E062","#D0DB54","#DAD361","#F38636"];
		var canvas = document.querySelector('canvas');
		var cxt=canvas.getContext("2d");
		var balls = new Array();
		var window_width = document.body.clientWidth || document.documentElement.clientWidth;
        var window_height = document.body.clientHeight || document.documentElement.clientHeight;
        canvas.width = window_width;
        canvas.height = window_height;

        var wall = {
            r:90,
            Num:8,
            n:0,
            timer:null,
            s: document.getElementById('canvas'),
            createBall:function(){
                var that = this;
                var aball={
                    x:0,
                    y:window_height,
                    r:that.r,
                    vX:that.getRandom(0.8, 1.2),
                    vY:that.getRandom(0.8, 1.5),
                    color:colors[that.getRandom(0, colors.length-1)]
                }
                if(++(that.n) <= that.Num){
                    balls.push(aball);
                    setTimeout(function(){
                        that.createBall();
                    }, 1000);
                }
                // console.log(balls.length);
            },
            drawBall:function(){
                var that = this;
                cxt.clearRect(0,0,window_width,window_height);
                cxt.fillStyle = "#6F964E";
                cxt.fillRect(0,0,window_width,window_height);
                for (var i=0;i<balls.length;i++){
                    balls[i].x += balls[i].vX;
                    balls[i].y += balls[i].vY;
                                        
                    if(balls[i].x >= window_width-that.r){
                        balls[i].x = window_width-that.r;
                        balls[i].vX *= -1;
                    }
                    if(balls[i].x <= that.r){
                        balls[i].x = that.r;
                        balls[i].vX *= -1;
                    }           
                    if(balls[i].y >= canvas.height-that.r){
                        balls[i].y = canvas.height-that.r;
                        balls[i].vY *= -1;
                    }
                    if(balls[i].y <= that.r){
                        balls[i].y = that.r;
                        balls[i].vY *= -1;
                    }

                    for(var j=0; j<balls.length; j++){
                        if(j!==i){
                            var bx = balls[i].x-balls[j].x;
                            var by = balls[i].y-balls[j].y;
                            var dist = Math.sqrt(bx*bx + by*by);
                            if( dist < (that.r*2)) {
                                var tempX=balls[i].vX;
                                var tempY=balls[i].vY;
                                balls[i].vX=balls[j].vX;
                                balls[j].vX=tempX;
                                balls[i].vY=balls[j].vY;
                                balls[j].vY=tempY;
                            }
                        }
                    }
                    cxt.beginPath();
                    cxt.arc(balls[i].x,balls[i].y,balls[i].r,0,Math.PI*2,true);
                    cxt.closePath();

                    var g = cxt.createRadialGradient(balls[i].x-70,balls[i].y-36,0,balls[i].x,balls[i].y,that.r+10);
                    g.addColorStop(0,"transparent"); 
                    g.addColorStop(1,balls[i].color);
                    cxt.fillStyle = g;

                    cxt.globalAlpha = 0.6;
                    cxt.fill(); 
                    cxt.strokeStyle = balls[i].color;
                    cxt.lineWidth = 1;
                    cxt.stroke();
                }
                setTimeout(function(){
                    that.drawBall();
                },10);
            },
            screen:function(){
                var that = this;
                that.s.style.display = 'block';
            },
            hide:function(){
                var that = this;
                that.s.style.display = 'none';
            }, 
            getRandom:function(min, max){
                return (Math.floor(Math.random() * (max - min + 1)) + min);
            },

        };
        document.onmousemove = function(){
                wall.hide();
                clearTimeout(wall.timer);
                wall.timer = setTimeout(function(){
                    wall.createBall();
                    wall.drawBall();
                    wall.screen();
                },3000)
        };
        wall.hide();
