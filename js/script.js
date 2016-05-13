
        var colors = ["#87D370","#F7E062","#D0DB54","#DAD361","#F38636"];
		var canvas = document.querySelector('canvas');
		var cxt=canvas.getContext("2d");
		var r = 90;
		var Num=8;
		var n = 0;
        var timer;
		var balls = new Array();
		var window_width = document.body.clientWidth || document.documentElement.clientWidth;
        var window_height = document.body.clientHeight || document.documentElement.clientHeight;
        canvas.width = window_width;
        canvas.height = window_height;

        var wall = {
            s: document.getElementById('canvas'),
            createBall:function(){
                var aball={
                    x:0,
                    y:window_height,
                    r:r,
                    vX:getRandom(0.8, 1.2),
                    vY:getRandom(0.8, 1.5),
                    color:colors[getRandom(0, colors.length-1)]
                }
                if(++n <= Num){
                    balls.push(aball);
                    setTimeout(wall.createBall, 1000);
                }
            },
            drawBall:function(){
                // var = this;
                cxt.clearRect(0,0,window_width,window_height);
                cxt.fillStyle = "#6F964E";
                cxt.fillRect(0,0,window_width,window_height);
                for (var i=0;i<balls.length;i++){
                    balls[i].x += balls[i].vX;
                    balls[i].y += balls[i].vY;
                                        
                    if(balls[i].x >= window_width-r){
                        balls[i].x = window_width-r;
                        balls[i].vX *= -1;
                    }
                    if(balls[i].x <= r){
                        balls[i].x = r;
                        balls[i].vX *= -1;
                    }           
                    if(balls[i].y >= canvas.height-r){
                        balls[i].y = canvas.height-r;
                        balls[i].vY *= -1;
                    }
                    if(balls[i].y <= r){
                        balls[i].y = r;
                        balls[i].vY *= -1;
                    }

                    for(var j=0; j<balls.length; j++){
                        if(j!==i){
                            var bx = balls[i].x-balls[j].x;
                            var by = balls[i].y-balls[j].y;
                            var dist = Math.sqrt(bx*bx + by*by);
                            if( dist < (r*2)) {
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

                    var g = cxt.createRadialGradient(balls[i].x-70,balls[i].y-36,0,balls[i].x,balls[i].y,r+10);
                    g.addColorStop(0,"transparent"); 
                    g.addColorStop(1,balls[i].color);
                    cxt.fillStyle = g;

                    // cxt.globalAlpha = 0.6;
                    cxt.fill(); 
                    cxt.strokeStyle = balls[i].color;
                    cxt.lineWidth = 1;
                    cxt.stroke();
                }
                setTimeout(wall.drawBall,10);
            },
            screen:function(){
                this.s.style.display = 'block';
            },
            hide:function(){
                this.s.style.display = 'none';
            },
        };
        function getRandom(min, max) {
            return (Math.floor(Math.random() * (max - min + 1)) + min);
        };
        document.onmousemove = function(){
                wall.hide();
                clearTimeout(timer);
                timer = setTimeout(function(){
                    wall.screen();
                    wall.createBall();
                    wall.drawBall();
                },3000)
            },
        wall.hide();
