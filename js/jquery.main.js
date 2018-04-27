jQuery(function() {
	var audio = new Audio();
	audio.src = 'mp3/start.mp3';
	audio.autoplay = true;
	audio.volume=0.3;

	playerRan();
	playerBullet();
	compBullet();
});
// движения игрока 
function playerRan() {
	$('.pole').mousemove(function(e){
		$('.player').css({'left': e.pageX, 'transition': 'all 0.5s linear'});
	});

	var c = 1;
	setInterval(function() {
		if(c <= 11){
			$('.comp_block').append('<div class="comp'+c+'">');
			c++;
			$('.life_block_comp').append('<div class="life_comp">');
		}else{
			c = 1;
			$('.comp_block').append('<div class="comp'+c+'">');
			$('.life_block_comp').append('<div class="life_comp">');
		}
		
	},5000)
}
// выстрел игрока
function playerBullet() {
	bulletNum = true;
	$('body').keyup(function(e) {
		
		if (e.originalEvent.keyCode === 32) { 
			if (bulletNum) {
				var audio = new Audio();
				audio.src = 'mp3/shot.mp3';
				audio.autoplay = true;

				var positionPlayer = parseInt($('.player').css('left'), 10);
				var positionPlayerBottom = parseInt($('.player').css('bottom'), 10);
				var bullet = document.createElement('span');
				bullet.style.left = positionPlayer + 'px';

				bullet.classList.add('bullet');
				$('.pole').append(bullet);

				var bulletRan = setInterval(function() {
					positionPlayerBottom = positionPlayerBottom + 20;
					bullet.style.bottom = positionPlayerBottom + 'px';
				}, 30);

				setTimeout(function() {
					bullet.remove();
				}, 1500);

				bulletNum = false;
				// интервал выстрела   
				setTimeout(function() {
					bulletNum = true;
				}, 400);

				// проверка попадания
				var bulletCoordinat = setInterval(function() {
					var bulletCoordinatTop = bullet.getBoundingClientRect().top;
					var bulletCoordinatLeft = bullet.getBoundingClientRect().left;

					var compAll = $('.comp_block>div');
					for (var i = 0; i < compAll.length; i++) {
						var ballCoordinatTop = compAll[i].getBoundingClientRect().top;
						var ballCoordinatBottom = ballCoordinatTop + 30;
						var ballCoordinatLeft = compAll[i].getBoundingClientRect().left;
						var ballCoordinatRight = ballCoordinatLeft + 40;

						if(bulletCoordinatTop >= ballCoordinatTop && bulletCoordinatTop <= ballCoordinatBottom && ballCoordinatLeft <= bulletCoordinatLeft && ballCoordinatRight >= bulletCoordinatLeft){
							compAll[i].remove();
							bullet.remove();
							var lifeComp = $('.life_comp');
							
							lifeComp[0].remove();
							if (lifeComp.length <= 1) {
								$('.pole').append('<h2>victory</h2>');
							}

							var audio = new Audio();
							audio.src = 'mp3/burst.mp3';
							audio.autoplay = true;
						}
					}
				}, 30);

				setTimeout(function() {
					clearInterval(bulletCoordinat);
				}, 1500);
			}
		}
	})
}
// выстрел противника
function compBullet() {
	setInterval(function() {
		var comp = $('.comp_block div');
		if (comp.length > 0) {
			var audio = new Audio();
			audio.src = 'mp3/shot.mp3';
			audio.autoplay = true;
			audio.volume=0.1;

			var rand = 0 - 0.5 + Math.random() * ((comp.length - 1) - 0 + 1)
			rand = Math.round(rand);
			var leftBullet = comp[rand].getBoundingClientRect().left;
			var topBullet = comp[rand].getBoundingClientRect().top;

			var bulletComp = document.createElement('span');
			bulletComp.classList.add('bullet-Comp');
			bulletComp.style.left = leftBullet + 'px';
			bulletComp.style.top = topBullet + 'px';
			$('.pole').append(bulletComp);
			var bulletCompTop = topBullet;

			var bulletCompRan = setInterval(function() {
				bulletCompTop = bulletCompTop + 20;
				bulletComp.style.top = bulletCompTop + 'px';
			}, 30);

			setTimeout(function() {
				bulletComp.remove();
			}, 1500);

			// проверка попадания
			var bulletCoordinat = setInterval(function() {
				var bulletCoordinatTop = bulletComp.getBoundingClientRect().top;
				var bulletCoordinatLeft = bulletComp.getBoundingClientRect().left;

				var player = $('.player');
				for (var i = 0; i < player.length; i++) {
					var ballCoordinatTop = player[i].getBoundingClientRect().top;
					var ballCoordinatBottom = ballCoordinatTop + 26;
					var ballCoordinatLeft = player[i].getBoundingClientRect().left;
					var ballCoordinatRight = ballCoordinatLeft + 24;

					if(bulletCoordinatTop >= ballCoordinatTop && bulletCoordinatTop <= ballCoordinatBottom && ballCoordinatLeft <= bulletCoordinatLeft && ballCoordinatRight >= bulletCoordinatLeft){
						var audio = new Audio();
						audio.src = 'mp3/sound.mp3';
						audio.autoplay = true;

						var lifePlayer = $('.life');
						if (lifePlayer.length <= 1 ) {
							$('.pole').append('<h2>game over</h2>');
						}else{
							player[i].remove();
							lifePlayer[0].remove();
							
							setTimeout(function() {
								$('.pole').append('<span class="player">');
							},500);
						}
					}
				}
			}, 30);

			setTimeout(function() {
				clearInterval(bulletCoordinat);
			}, 1500);
		}
	},300);
}






