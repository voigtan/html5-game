define(['sprite'], function(s) {

	var exports = {};

	var UI = function(atlas) {
		this.atlas = atlas;
		this.isGameOver = false;
	};

	var toIndexArr = function(str) {
		var i, c, a = [];

		for (i = 0; i < str.length; i++) {
			c = str.charCodeAt(i);
			a.push([c%16,Math.floor(c/16)]);
		};

		return a;
	};

	var score = 0;

	UI.prototype.writeText = function(ctx, str, x, y) {
		textIdxs = toIndexArr(str);
		for (i = 0; i < textIdxs.length; i++) {
			charIdx = textIdxs[i];
			ctx.drawImage(this.atlas,
				charIdx[0]*16, (16+charIdx[1])*16,
				16,16,
				x+(i*16),y,
				16,16);
		};
	};

	UI.prototype.render = function(ctx) {

		var i, charIdx, text, w, h, beginx, beginy;

		if (!this.isGameOver) {
			this.writeText(ctx, 'Score: ' + score, 10, 10);
		}
		else {
			w = ctx.canvas.width;
			h = ctx.canvas.height;
			ctx.save();
			ctx.fillStyle = "rgba(0,0,0,0.4)";
			ctx.fillRect(0, 0, w, h);
			text = 'Game Over';
			beginx = (w/2)-((text.length-1)*8);
			beginy = h/2-16;
			this.writeText(ctx, text, beginx, beginy);

			/*
			textIdxs = toIndexArr('Game Over');
			beginx = (w/2)-((textIdxs.length-1)*8);
			beginy = h/2-16;
			for (i = 0; i < textIdxs.length; i++) {
				charIdx = textIdxs[i];
				ctx.drawImage(this.atlas,
					charIdx[0]*16, (16+charIdx[1])*16,
					16, 16,
					beginx+(i*16),beginy,
					16, 16);
			};*/


			ctx.restore();
		}

	};

	exports.setScore = function(s) {
		score = s;
	};

	exports.incrScore = function() {
		score++;
	};

	exports.create = function(atlas) {
		return new UI(atlas);
	};
 
	return exports;

});