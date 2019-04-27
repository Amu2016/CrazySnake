var config = require("config");
cc.Class({
    extends: cc.Component,

    properties: {
        map:{
            default:    null,
            type:       cc.Node,
        },

        Key_A:0,
        Key_W:0,
        Key_S:0,
        Key_D:0,
    },

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {

    },

    update (dt) {
        cc.log("angle is", config.angle);
        // config.angle++;

        var increment = 0;

        if(this.Key_W){//0
            if(config.angle != 0 && config.angle != 360){
                if(config.angle >= 180){
                    increment++;
                }
                else{
                    increment--;
                }
            }
        }
        else if(this.Key_D){//90
            if(config.angle != 90){
                if(config.angle > 90 && config.angle <= 270){
                    increment--;
                }
                else{
                    increment++;
                }
            }
        }
        else if(this.Key_S){//180
            if(config.angle != 180){
                if(config.angle >= 0 && config.angle < 180){
                    increment++;
                }
                else{
                    increment--;
                }
            }
            
        }
        else if(this.Key_A){//270
            if(config.angle != 270){
                if(config.angle >= 90 && config.angle < 270){
                    increment++;
                }
                else{
                    increment--;
                }
            }
        }
        config.angle += increment;
        if(config.angle > 360){
            config.angle -= 360;
        }
        else if(config.angle < 0){
            config.angle += 360;
        }
    },

    onKeyDown:function(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
            this.Key_A = 1;
            break;
            case cc.macro.KEY.w:
            this.Key_W = 1;
            break;
            case cc.macro.KEY.s:
            this.Key_S = 1;
            break;
            case cc.macro.KEY.d:
            this.Key_D = 1;
            break;
        }
    },

    onKeyUp:function(event){
        switch(event.keyCode){
            case cc.macro.KEY.a:
            this.Key_A = 0;
            break;
            case cc.macro.KEY.w:
            this.Key_W = 0;
            break;
            case cc.macro.KEY.s:
            this.Key_S = 0;
            break;
            case cc.macro.KEY.d:
            this.Key_D = 0;
            break;
        }
    }
});
