define(['random', 'preloader', 'objs/happy', 'objs/background'], function(r, preloader, objs, backgrounds) {
	
	// TODO: Implement game loop
	// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
	// TODO: Use requestAnimationFrame instead to iterate render
	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	// TODO: Use translate to move objects around?
	// http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
	
	var update = function() {
		var i, sprite, allDead = true;
		
		for(i = 0; i < sprites.length; i++) {
			sprite = sprites[i];
			sprite.update();
			allDead &= sprite.isDead;
		}

		if (allDead) {
			for(i = 0; i < sprites.length; i++) {
				sprite = sprites[i];
				sprite.isDead = false;
			}
		}

	};
	
	var render = function(ctx) {
		var i;

		/* Draw map */
		bg.render(ctx);

		for (i = 0; i < sprites.length; i++) {
			sprites[i].render(ctx);
		}
	};
	
	var sprites = [];
	var bg;
	
	preloader.loadImages(['/img/sheet.png'], function(imgs) {
		var FPS = 30;
		var interval = 1000/FPS;
		var canvas = document.getElementById('game');
		var ctx;
		if (!canvas.getContext) {
			return; 
		}
		
		ctx = canvas.getContext('2d');

		window.setInterval(function() {
			update();
			render(ctx);
		}, interval);
		
		bg = backgrounds.create(imgs[0]);

		for (i = 0; i < 5; i++) {
			var s = new objs.Happy(imgs[0]);
			sprites.push(s);
		};
		
		var canvas = document.getElementById('game');
		canvas.addEventListener('click', function(evt) {
			var x = evt.offsetX - canvas.offsetLeft + 8;
			var y = evt.offsetY - canvas.offsetTop - 8;
			
			var i;
			for (i = 0; i < sprites.length; i++) {
				sprites[i].hit(x, y);
			}
		});
	});
		
});