$(function() {
    var _drag = {};
    _drag.top = 0; //拖动过的位置距离上边
    _drag.left = 0; //拖动过的位置距离左边
    _drag.maxLeft; //距离左边最大的距离
    _drag.maxTop; //距离上边最大的距离
    _drag.dragging = false; //是否拖动标志
    //拖动函数
    function bindDrag(el) {
        var winWidth = $(window).width(),
        winHeight = $(window).height(),
        objWidth = $(el).outerWidth(),
        objHeight = $(el).outerHeight();
        _drag.maxLeft = winWidth - objWidth,
        _drag.maxTop = winHeight - objHeight;
        var els = el.style,
        x = 0,
        y = 0;
        var objTop = $(el).offset().top,
        objLeft = $(el).offset().left;
        $(el).mousedown(function(e) {
            _drag.dragging = true;
            _drag.isDragged = true;
            x = e.clientX - el.offsetLeft;
            y = e.clientY - el.offsetTop;
            el.setCapture && el.setCapture();
            $(document).bind('mousemove', mouseMove).bind('mouseup', mouseUp);
            return false;
        });
        function mouseMove(e) {
            e = e || window.event;
            if (_drag.dragging) {
                _drag.top = e.clientY - y;
                _drag.left = e.clientX - x;
                _drag.top = _drag.top > _drag.maxTop ? _drag.maxTop: _drag.top;
                _drag.left = _drag.left > _drag.maxLeft ? _drag.maxLeft: _drag.left;
                _drag.top = _drag.top < 0 ? 0 : _drag.top;
                _drag.left = _drag.left < 0 ? 0 : _drag.left;
                els.top = _drag.top + 'px';
                els.left = _drag.left + 'px';
                return false;
            }
        }
        function mouseUp(e) {
            _drag.dragging = false;
            el.releaseCapture && el.releaseCapture();
            e.cancelBubble = true;
            $(document).unbind('mousemove', mouseMove).unbind('mouseup', mouseUp);
        }
        $(window).resize(function() {
            var winWidth = $(window).width(),
            winHeight = $(window).height(),
            el = $(el),
            elWidth = el.outerWidth(),
            elHeight = el.outerHeight(),
            elLeft = parseFloat(el.css('left')),
            elTop = parseFloat(el.css('top'));
            _drag.maxLeft = winWidth - elWidth;
            _drag.maxTop = winHeight - elHeight;
            _drag.top = _drag.maxTop < elTop ? _drag.maxTop: elTop;
            _drag.left = _drag.maxLeft < elLeft ? _drag.maxLeft: elLeft;
            el.css({
                top: _drag.top,
                left: _drag.left
            })
        })
    }
    bindDrag(document.getElementById('child'));
});