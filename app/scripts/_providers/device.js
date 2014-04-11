'use strict';
// device provider
app.provider('Device',[function(){
    var touchDevice = false;

    var setTouchDevice = function(flag){
        if(appUtil.isBoolean(flag)){
            touchDevice = flag;
        }
    };

    var isTouchDevice = function(flag){
        return touchDevice;
    };

    this.$get = function(){
        return {
            setTouchDevice: setTouchDevice,
            isTouchDevice: isTouchDevice
        };
    };

    this.setTouchDevice = setTouchDevice;
    this.isTouchDevice = isTouchDevice;
}]);
