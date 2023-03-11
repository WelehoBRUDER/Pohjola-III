const dragProperties: any = {
  dragging: false,
  startX: 0,
  startY: 0,
  heldDownTimer: 0,
  positions: {},
  click: false,
};

function calcElementArea(element: HTMLElement) {
  const { width, height, x, y } = element.getBoundingClientRect();
  return {
    xMin: x,
    xMax: x + width,
    yMin: y,
    yMax: y + height,
  };
}

function dragElem(
  elem: HTMLElement,
  snapContainers?: Array<any>,
  onclick?: Function,
  callback?: Function,
  onclick_args?: any,
  onclick_params?: boolean,
  callback_args?: any,
  callback_params?: boolean
) {
  const dragTimeout = snapContainers ? 200 : 0;
  elem.onmousedown = (e: MouseEvent) => {
    dragProperties.click = true;
    clearTimeout(dragProperties.heldDownTimer);
    dragProperties.heldDownTimer = setTimeout(() => dragMouseDown(e), dragTimeout);
  };
  elem.onmouseup = (e: any) => {
    clearTimeout(dragProperties.heldDownTimer);
    if (dragProperties.click && onclick) {
      if (onclick_params) {
        onclick(onclick_args, { x: e.clientX, y: e.clientY });
      } else {
        onclick(onclick_args);
      }
    }
  };

  function dragMouseDown(e: MouseEvent) {
    e = e || (window.event as MouseEvent);
    dragProperties.click = false;
    e.preventDefault();
    hideHover();
    dragProperties.positions.pos1 = elem.offsetLeft;
    dragProperties.positions.pos2 = elem.offsetTop;
    dragProperties.positions.pos3 = e.x;
    dragProperties.positions.pos4 = e.y;
    elem.style.position = "absolute";
    elem.style.zIndex = "99";
    if (snapContainers) elem.style.boxShadow = "inset 0 0 8px 4px gold, 0 0 8px 6px gold";
    hideHover();
    document.onmouseup = closeDragElem;
    document.onmousemove = (e) => elemDrag(e);
  }

  function elemDrag(e: MouseEvent) {
    dragProperties.dragging = true;
    e = e || (window.event as MouseEvent);
    e.preventDefault();
    elem.style.left = `${dragProperties.positions.pos1 + e.x - dragProperties.positions.pos3}px`;
    elem.style.top = `${dragProperties.positions.pos2 + e.y - dragProperties.positions.pos4}px`;
  }

  function closeDragElem(e: MouseEvent) {
    document.onmouseup = null;
    document.onmousemove = null;
    let snapped = false;
    if (!snapContainers) return;
    for (const container of snapContainers) {
      Array.from(container.childNodes).some((_area: any, index: number) => {
        let area = calcElementArea(_area);
        if (e.x >= area.xMin && e.x <= area.xMax && e.y >= area.yMin && e.y <= area.yMax) {
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

function resetElemPosition(callback?: Function) {
  if (callback) callback();
  hideHover();
}
