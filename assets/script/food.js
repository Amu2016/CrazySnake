cc.Class({
    extends: cc.Component,

    properties: {
        radius:5,
    },

    onLoad () {
        this.Graph = this.getComponent(cc.Graphics);
        // var node = {x:Math.random()*this.width, y:Math.random()*this.height};
        this.Graph.circle(0, 0, 5);
        this.Graph.fillColor = cc.Color.RED;
        this.Graph.stroke();
        this.Graph.fill();
    },

    start () {

    },

    // update (dt) {},
});
