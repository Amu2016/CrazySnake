var QuadTree = cc.Class({
    // extends: cc.Component,

    name : "QuadTree",
/* 
  四叉树节点包含：
  - objects: 用于存储物体对象
  - nodes: 存储四个子节点
  - level: 该节点的深度，根节点的默认深度为0
  - bounds: 该节点对应的象限在屏幕上的范围，bounds是一个矩形
  常量：
  - Max_Obj: 每个节点（象限）所能包含物体的最大数量
  - Max_level: 四叉树的最大深度
*/

    ctor:function(){
        this.objects = [];
        this.nodes = [];
        this.Max_Obj = 10,
        this.Max_level = 5
    },

    init:function(bounds, level){
        this.level = typeof level === 'undefined' ? 0 : level;
        this.bounds = bounds;
    },

    // properties: {
    //     Max_Obj:10,
    //     Max_level:5,
    // },
 
    getIndex:function(rect){
        var bounds = this.bounds;
        var onTop = rect.y + rect.h <= bounds.y;
        var onBottom = rect.y >= bounds.y;
        var onLeft = rect.x + rect.w <= bounds.x;
        var onRight = rect.x >= bounds.x;

        if(onTop){
            if(onRight){
                return 0;
            }
            else if(onLeft){
                return 1;
            }
        }
        else if(onBottom){
            if(onLeft){
                return 2;
            }
            else if(onRight){
                return 3;
            }
        }
        return -1;
    },

    split:function(){
        var level = this.level;
        var bounds = this.bounds;
        var x = bounds.x;
        var y = bounds.y;
        var sWidth = bounds.w/2;
        var sHeight = bounds.h/2;

        this.nodes.push(new QuadTree(new cc.Rect(bounds.x, y, sWidth, sHeight), level + 1),
        new QuadTree(new cc.Rect(x, y, sWidth, sHeight), level + 1),
        new QuadTree(new cc.Rect(x, bounds.y, sWidth, sHeight), level + 1),
        new QuadTree(new cc.Rect(bounds.x, bounds.y, sWidth, sHeight), level + 1),
        );
    },

    insert:function(rect){
        var objs = this.objects;
        var i, index;

        if(this.nodes.length){
            index = this.getIndex(rect);
            if(index !== -1){
                this.node[index].insert(rect);
                return;
            }
        }

        objs.push(rect);

        if(!this.nodes.length &&
            this.objects.length > this.Max_Obj &&
            this.level < this.Max_level){
                this.split();
                for(i = objs.length - 1; i >= 0; i--){
                    index = this.getIndex(objs[i]);
                    if(index !== -1){
                        this.nodes[index].insert(objs.split(i, 1)[0]);
                    }
                }
            }
    },

    retrieve:function(rect){
        var result = [];
        var index;

        if(this.nodes.length){
            index = this.getIndex(rect);
            if(index !== -1){
                result = result.concat(this.nodes[index].retrieve(rect));
            }
        }

        result = result.concat(this.objects);
        return result;
    },

    isInner(rect, bounds){
        return rect.x >= bounds.x &&
        rect.x + rect.w <= bounds.x + bounds.w &&
        rect.y >= bounds.y &&
        rect.y + rect.h <= bounds.y + bounds.h;
    },
});

// module.exports = QuadTree;