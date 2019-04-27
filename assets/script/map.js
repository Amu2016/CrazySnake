var QuadTree = require("quadtree");

cc.Class({
    extends: cc.Component,

    properties: {
        food:{
            default:    null,
            type:       cc.Node,
        },
        width:1000,
        height:1000,
    },

    onLoad () {
        this.Graph = this.getComponent(cc.Graphics);
        this.Graph.rect (0, 0, this.width, this.height);

        // //添加颜色及透明度
        this.Graph.a = 100;//添加透明度
        this.Graph.fillColor = cc.Color.WHITE;
        // //填充
        this.Graph.stroke();
        this.Graph.fill();

        this.Graph.fillColor = cc.Color.GRAY;
        this.Graph.lineWidth = 1;

        var bt = 40;

        for(var i = 0; i < this.height/bt; i++){
            this.Graph.moveTo(i*bt, 0);
            this.Graph.lineTo(i*bt, this.height);
 
            this.Graph.moveTo(0, i*bt);
            this.Graph.lineTo(this.width, i*bt);
        }

        this.Graph.stroke();

        this.quadTree = new QuadTree();
        this.quadTree.init(new cc.Rect(0, 0, this.width, this.height));
        this.quadTree.split();

        for(var i = 0; i < 100; i++){
            var node = {x:Math.random()*this.width, y:Math.random()*this.height};
            var food = cc.instantiate(this.food);
            food.setPosition(node.x, node.y);
            // food.parent = this.node;
            this.node.addChild(food);
        }
    },

    start () {
    },

    // update (dt) {},
});
