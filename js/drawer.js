//credit https://codepen.io/bladnman/pen/LEWYYN

var drawer = {};
drawer.elem = document.querySelector('#bottom-drawer');
drawer.hammer = new Hammer(drawer.elem);
drawer.pan = new Hammer.Pan();
drawer.swipe = new Hammer.Swipe();

drawer.hammer.add(drawer.pan);
drawer.hammer.add(drawer.swipe);

drawer.hammer.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
drawer.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

drawer.lastPosY = 0;
drawer.isDragging = false;
drawer.isUp = false;

drawer.hammer.on("pan", function(ev) {

	var elem = ev.target;
	var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	if ( ! drawer.isDragging ) {
		drawer.isDragging = true;
		drawer.lastPosY = elem.offsetTop;
		drawer.elem.classList.remove('slide');
	}
  
	var posY = ev.deltaY + drawer.lastPosY;

	if((posY>=0) &&(posY<=(h-64)))
		drawer.elem.style.top = posY + "px";
  
	if (ev.isFinal) {
		drawer.isDragging = false;
		drawer.elem.classList.add('slide');

    	if ((posY < (h*0.9-64) ) && !drawer.isUp){		//swipe drawer UP
    		drawer.elem.style.top = "0px";
    		drawer.isUp = true;
    	} else if (!drawer.isUp){						//Drawer swipe cancelled
			drawer.elem.style.top = (h-64) + 'px';		
    	} else if ((posY > h*0.1) && drawer.isUp) {		//Drawer swipe down
			drawer.elem.style.top = (h-64) + 'px';
			drawer.isUp = false;
    	} else if(drawer.isUp) {						//Drawer swipe down cancelled
    		drawer.elem.style.top = "0px";
    	}
	}
});


drawer.hammer.on("swipe", function(ev) {
	console.log("Swipe!");
});

