define(['random', 'preloader', 'objs/happy', 'objs/background', 'objs/cursor', 'ui'], function(r, preloader, objs, backgrounds, cursors, ui) {
	
	// TODO: Implement game loop
	// http://www.html5rocks.com/en/tutorials/canvas/notearsgame/
	// TODO: Use requestAnimationFrame instead to iterate render
	// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
	// TODO: Use translate to move objects around?
	// http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
	
	var happyFaceAmount = 10;

	var update = function() {
		var i, sprite, allDead = true;
		
		for(i = 0; i < sprites.length; i++) {
			sprite = sprites[i];
			sprite.update();
			allDead &= sprite.isDead;
		}

		if (allDead) {
			gameUi.isGameOver = true;
		}

	};
	
	var render = function(ctx) {
		var i, sprite;

		/* Draw map */
		bg.render(ctx);

		for (i = 0; i < sprites.length; i++) {
			sprite = sprites[i];
			if (sprite.isDead) sprite.render(ctx);
		}
		for (i = 0; i < sprites.length; i++) {
			sprite = sprites[i];
			if (!sprite.isDead) sprite.render(ctx);
		}

		cursor.render(ctx);

		gameUi.render(ctx);
	};
	
	var sprites = [];
	var bg;
	var cursor;
	var gameUi;

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
		
		// Create background
		bg = backgrounds.create(imgs[0]);
		// Create sprites
		for (i = 0; i < happyFaceAmount; i++) {
			var s = new objs.Happy(imgs[0]);
			sprites.push(s);
		};
		// Create cursor
		cursor = cursors.create(imgs[0]);
		// Create UI
		gameUi = ui.create(imgs[0]);
		
		// Set up user events
		var canvas = document.getElementById('game');
		canvas.addEventListener('click', function(evt) {
			var x = evt.offsetX;
			var y = evt.offsetY;
			var sprite;
			
			var i;
			for (i = 0; i < sprites.length; i++) {
				sprite = sprites[i];
				if (!sprite.isDead) {
					sprite.hit(x, y);
					if (sprite.isDead) {
						ui.incrScore();
					}
				}
			}

			if (gameUi.isGameOver) {
				for(i = 0; i < sprites.length; i++) {
					sprite = sprites[i];
					sprite.isDead = false;
				}
				gameUi.isGameOver = false;
			}
		});

		canvas.addEventListener('mouseout', function(evt) {
			cursor.isVisible = false;
		});

		canvas.addEventListener('mouseover', function(evt) {
			cursor.isVisible = true;
		});

		document.addEventListener('mousemove', function(evt) {
			var x = evt.offsetX;
			var y = evt.offsetY;

			cursor.x = x;
			cursor.y = y;
		});
	});
		
});