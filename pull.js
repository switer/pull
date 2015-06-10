var scrollHandlers,
    evtId = 0;

function onPullup (event) {
    pullHandler.call(this, event, 'up');
}
function onPulldown (evnet) {
    pullHandler.call(this, event, 'down');
}

function pullHandler (event, type) {
    var $el  = event.target,
        startTouches = event.touches[0],
        pageY = startTouches.pageY;

    function onMove (e) {
        var endTouches = e.touches[0],
            endPageY = endTouches.pageY;

        if (type == 'up' && document.body.scrollHeight - window.scrollY - window.innerHeight < 36 && 
            Math.abs(endPageY - pageY) >= 36) {

            scrollHandler && scrollHandler(event);
            pageY = endPageY;
        }
        if (type == 'down' && window.scrollY < 36 && 
            Math.abs(endPageY - pageY) >= 36) {

            scrollHandler && scrollHandler(event);
            pageY = endPageY;
        }
    }
    function onEnd (e) {
        $el.removeEventListener('touchmove', onMove);
        $el.removeEventListener('touchend', onEnd);
    }
    $el.addEventListener('touchmove', onMove);
    $el.addEventListener('touchend', onEnd);
};

function addPull (el, handler) {
    scrollHandler = handler;
    el.addEventListener('touchstart', handler);
    return removePull(handler)
};
function removePull (el, handler) {
    el.removeEventListener('touchstart', handler);
};

var pull = {
    up: function (el, handler) {
        addPull();
    },
    down: function () {
        
    }
};

module.exports = pull;
