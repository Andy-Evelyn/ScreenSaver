var ScreenSaver = function(){
    this.colors = ["#87D370","#F7E062","#D0DB54","#DAD361","#F38636"];
    this.canvas = document.querySelector('canvas');
    this.cxt=canvas.getContext("2d");
    this.balls = new Array();
    this.window_width = document.documentElement.clientWidth;
    this.window_height = document.documentElement.clientHeight;
    this.r = 80;
    this.Num = 8;
    this.n = 0;
    this.timer = null;
    this.init();
}

ScreenSaver.prototype = {
    init:function(){
        this.initCanvas();
        this.screenHide();
        var that = this;
        document.onmousemove = function(){
            that.event();
        };
        document.onkeydown = function(){
            that.event();
        };
    },
    initCanvas:function(){
        this.canvas.width = this.window_width;
        this.canvas.height = this.window_height;
    },
    createBall:function(){
        var that = this;
        var aball={
                    x:0,
                    y:that.window_height,
                    r:that.r,
                    vX:that.getRandom(0.8, 1.2),
                    vY:that.getRandom(1.2, 1.5),
                    color:that.colors[that.getRandom(0, that.colors.length-1)]
        }
        if(++(that.n) <= that.Num){
            that.balls.push(aball);
            setTimeout(function(){
                that.createBall();
            }, 1000);
        }
    },
    drawBall:function(){
                var that = this;
                this.cxt.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.cxt.fillStyle = "#6F964E";
                this.cxt.fillRect(0,0,this.canvas.width,this.canvas.height);
                for (var i=0,len=this.balls.length;i<len;i++){
                    this.balls[i].x += this.balls[i].vX;
                    this.balls[i].y += this.balls[i].vY;
                                        
                    if(this.balls[i].x >= this.window_width-this.r){
                        this.balls[i].x = this.window_width-that.r;
                        this.balls[i].vX *= -1;
                    };
                    if(this.balls[i].x <= this.r){
                       this.balls[i].x = this.r;
                        this.balls[i].vX *= -1;
                    };         
                    if(this.balls[i].y >= this.window_height-this.r){
                        this.balls[i].y = this.window_height-this.r;
                        this.balls[i].vY *= -1;
                    };
                    if(this.balls[i].y <= this.r){
                        this.balls[i].y = this.r;
                        this.balls[i].vY *= -1;
                    };

                    for(var j=0; j<this.balls.length; j++){
                        if(j!==i){
                            var bx = this.balls[i].x-this.balls[j].x;
                            var by = this.balls[i].y-this.balls[j].y;
                            var dist = Math.sqrt(bx*bx + by*by);
                            if( dist <= (this.r*2)) {
                                var tempX=this.balls[i].vX;
                                var tempY=this.balls[i].vY;
                                this.balls[i].vX=this.balls[j].vX;
                                this.balls[j].vX=tempX;
                                this.balls[i].vY=this.balls[j].vY;
                                this.balls[j].vY=tempY;
                            }
                        }
                    }
                    this.cxt.beginPath();
                    this.cxt.arc(this.balls[i].x,this.balls[i].y,this.balls[i].r,0,Math.PI*2,true);
                    this.cxt.closePath();

                    var g = this.cxt.createRadialGradient(this.balls[i].x-70,this.balls[i].y-36,0,this.balls[i].x,this.balls[i].y,this.r+10);
                    g.addColorStop(0,"transparent"); 
                    g.addColorStop(1,this.balls[i].color);
                    this.cxt.fillStyle = g;

                    this.cxt.globalAlpha = 0.6;
                    this.cxt.fill(); 
                    this.cxt.strokeStyle = this.balls[i].color;
                    this.cxt.lineWidth = 1;
                    this.cxt.stroke();
                };
                setTimeout(function(){
                    that.drawBall();
                },10);
            },
            screenShow:function(){
                this.canvas.style.display = 'block';
            },
            screenHide:function(){
                this.canvas.style.display = 'none';
            }, 
            getRandom:function(min, max){
                return (Math.floor(Math.random() * (max - min + 1)) + min);
            },
            event:function(){
                var that = this;
                this.screenHide();
                this.balls.length = 0;
                this.n = 0;
                clearTimeout(this.timer);
                this.timer = setTimeout(function(){
                    that.createBall();
                    that.drawBall();
                    that.screenShow();
                },3000);
            },
};

var screenSaver = new ScreenSaver();

