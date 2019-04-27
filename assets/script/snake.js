var config = require("config");
cc.Class({
    // extends: cc.Node,
    extends: cc.Component,

    properties: {
        mainCamera:{
            default:    null,
            type:       cc.Node,
        },

        quality:12,//蛇的质量（每3点质量增加一个节点    少于3不算）

        headNode:null,
        nodeArr:[],//所有路径点
        length:0,//节点数量
        // angle:45,//方向
        radius:10,//节点半径
        cir_dis:10,//每个节点之间的间距
        cir_gap:4,//每个节点之间的路径点数量
        speed:2,//速度（每一帧前进距离）
    },

    onLoad () {
        this.Graph = this.getComponent(cc.Graphics);

        this.Graph.circle(0,0,this.radius);
        // //添加颜色及透明度
        this.Graph.a = 100;//添加透明度
        this.Graph.lineWidth = 1;
        this.Graph.fillColor = cc.Color.RED;
        // //填充
        this.Graph.stroke();
        this.Graph.fill();

        this.length = this.quality/3;

        this.angle = config.angle;

        this.dir_sin = Math.sin(this.angle*Math.PI/180);
        this.dir_cos = Math.cos(this.angle*Math.PI/180);

        this.cir_gap = this.cir_dis/this.speed - 1;

        for(var i = 0; i < this.length; i++){
            cc.log("===============")
            var pos = this.getPos((i)*this.cir_dis);
            cc.log("===============")
            this.Graph.circle(pos.x, pos.y, this.radius);
            this.Graph.fillColor = cc.Color.BLUE;
            //填充
            this.Graph.fill();

            //初始化路径点
            this.nodeArr.push(pos);

            for(var k = 1; k < this.cir_gap + 1; k++){
                var _p = this.getPos(k*this.speed);
                this.nodeArr.push({x: pos.x + _p.x, y:  pos.y + _p.y});
            }
        }
    },


    start () {
    },

    update (dt) {

        this.Graph.clear();

        this.angle = config.angle;

        // this.node.x ++;
        // cc.log("==========" + this.angle)

        this.dir_sin = Math.sin(this.angle*Math.PI/180);
        this.dir_cos = Math.cos(this.angle*Math.PI/180);
        // cc.log("========  " + this.dir_sin + "  " + this.dir_cos);

        var nextPos = {x: this.nodeArr[0].x + this.speed*this.dir_sin, y:this.nodeArr[0].y + this.speed*this.dir_cos};

        this.mainCamera.x = nextPos.x;
        this.mainCamera.y = nextPos.y;
        cc.log("===============" +  this.mainCamera.x + "  " +  this.mainCamera.y)

        this.nodeArr.unshift(nextPos);
        this.nodeArr.pop();

        this.length = this.quality/3;

        // for(var i = 0; i < this.length; i++){
        //     this.Graph.fillColor = cc.Color.BLUE;
        //     this.Graph.strokeColor = cc.Color.BLACK;
        //     var pos = this.nodeArr[i*(this.cir_gap+1)];
        //     this.Graph.circle(pos.x, pos.y, this.radius);
        //     this.Graph.fill();
        //     this.Graph.stroke();
        // }
        //从最后一个开始绘制
        for(var i = this.length - 1; i >= 0; i--){
            this.Graph.fillColor = cc.Color.BLUE;
            this.Graph.strokeColor = cc.Color.BLACK;
            var pos = this.nodeArr[i*(this.cir_gap+1)];
            this.Graph.circle(pos.x, pos.y, this.radius);
            this.Graph.fill();
            this.Graph.stroke();
        }

    },

    getPos:function(len){
        var _x = -len*this.dir_sin;
        var _y = -len*this.dir_cos;
        // cc.log("========  " + len + "  " + this.dir_sin + "  " + _x + "   " + _y);

        return {x: _x, y: _y};
    },

});