(function desktopEasterEgg() {
  const paperElem = document.getElementById("drag-me");

  makeDraggable(paperElem);

  addEventListener('resize', () => makeDraggable(paperElem));

  function makeDraggable(elem) {
    if (!shouldBeDraggable()) {
      unbindDrag();
      unbindRenderCursor(elem);
      return;
    }

    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    if (document.getElementById(elem.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elem.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elem.onmousedown = dragMouseDown;
      elem.onmouseover = renderCursor;
    }

    function shouldBeDraggable() {
      const paperRect = paperElem.getBoundingClientRect();

      if (window.innerWidth <= 1600 || window.innerHeight <= paperRect.height) {
        return false;
      }

      return true;
    }

    function dragMouseDown(e) {  
      if (e.target !== paperElem || !shouldBeDraggable()) {
          return;
      }

      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = unbindDrag;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();

      const paperRect = paperElem.getBoundingClientRect()

      let hitBound = false;
      
      if (paperRect.left + paperRect.width >= window.innerWidth - 20) {
          elem.style.left = (window.innerWidth - paperRect.width - 30) + "px";
          hitBound = true;
      }

      if (paperRect.top + paperRect.height >= window.innerHeight - 10) {
          elem.style.top = (window.innerHeight - paperRect.height - 30) + "px";
          hitBound = true;
      }

      if (hitBound) {
        return;
      }

      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:

      elem.style.top = (elem.offsetTop - pos2) + "px";
      elem.style.left = (elem.offsetLeft - pos1) + "px";
    }

    function unbindDrag() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function renderCursor(e) {
      if (e.target !== paperElem) {
          e.target.style.cursor = "initial";
          return;
      }

      e.target.style.cursor = "move";
    }

    function unbindRenderCursor(elem) {
      elem.style.cursor = "initial";
      elem.onmouseover = null;
    }

    addEventListener('resize', () => {
      unbindDrag();
      paperElem.style.top = "initial";
      paperElem.style.left = "initial";

      if (!shouldBeDraggable) {
        unbindRenderCursor(elem);
      }
    });
  }

  const img = new Image();
  img.src = 'wood-texture.jpeg';
  document.body.style.backgroundImage = `url('${img.src}')`;
})();