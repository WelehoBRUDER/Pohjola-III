"use strict";
var dragProperties = {
    dragging: false,
    startX: 0,
    startY: 0,
    heldDownTimer: 0,
    positions: {},
    click: false
};
function calcElementArea(element) {
    var _a = element.getBoundingClientRect(), width = _a.width, height = _a.height, x = _a.x, y = _a.y;
    return {
        xMin: x,
        xMax: x + width,
        yMin: y,
        yMax: y + height
    };
}
function dragElem(elem, snapContainers, onclick, callback, onclick_args, onclick_params, callback_args, callback_params) {
    elem.onmousedown = function (e) {
        dragProperties.click = true;
        clearTimeout(dragProperties.heldDownTimer);
        dragProperties.heldDownTimer = setTimeout(function () { return dragMouseDown(e); }, 200);
    };
    elem.onmouseup = function (e) {
        clearTimeout(dragProperties.heldDownTimer);
        if (dragProperties.click && onclick) {
            if (onclick_params) {
                onclick(onclick_args, { x: e.clientX, y: e.clientY });
            }
            else {
                onclick(onclick_args);
            }
        }
    };
    function dragMouseDown(e) {
        e = e || window.event;
        dragProperties.click = false;
        e.preventDefault();
        hideHover();
        dragProperties.positions.pos1 = elem.offsetLeft;
        dragProperties.positions.pos2 = elem.offsetTop;
        dragProperties.positions.pos3 = e.x;
        dragProperties.positions.pos4 = e.y;
        elem.style.position = "absolute";
        elem.style.boxShadow = "inset 0 0 8px 4px gold, 0 0 8px 6px gold";
        elem.style.zIndex = "99";
        hideHover();
        document.onmouseup = closeDragElem;
        document.onmousemove = function (e) { return elemDrag(e); };
    }
    function elemDrag(e) {
        dragProperties.dragging = true;
        e = e || window.event;
        e.preventDefault();
        elem.style.left = dragProperties.positions.pos1 + e.x - dragProperties.positions.pos3 + "px";
        elem.style.top = dragProperties.positions.pos2 + e.y - dragProperties.positions.pos4 + "px";
    }
    function closeDragElem(e) {
        document.onmouseup = null;
        document.onmousemove = null;
        var snapped = false;
        for (var _i = 0, snapContainers_1 = snapContainers; _i < snapContainers_1.length; _i++) {
            var container = snapContainers_1[_i];
            Array.from(container.childNodes).some(function (_area, index) {
                var area = calcElementArea(_area);
                if (e.x >= area.xMin &&
                    e.x <= area.xMax &&
                    e.y >= area.yMin &&
                    e.y <= area.yMax) {
                    snapped = true;
                    elem.style.position = "absolute";
                    elem.style.boxShadow = "";
                    if (callback && callback_args && callback_params) {
                        resetElemPosition(callback(callback_args, _area));
                    }
                    return true;
                }
            });
        }
        if (!snapped) {
            elem.style.left = dragProperties.startX + "px";
            elem.style.top = dragProperties.startY + "px";
            elem.style.zIndex = "inherit";
            elem.style.boxShadow = "";
            elem.style.position = "relative";
            resetElemPosition();
        }
    }
}
function resetElemPosition(callback) {
    if (callback)
        callback();
    hideHover();
}
//# sourceMappingURL=drag.js.map