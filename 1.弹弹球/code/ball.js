jQuery(function($){
  var vx= 10,
      vy = 10,
      $ball = $('.ball'),
      $win = $(window),
      r = parseInt($ball.css('width')),
      maxWidth = $win.width() -r,
      maxHeight = $win.height() -r,
      posX = parseInt($ball.css('left')),
      posY = parseInt($ball.css('top'));

  function move(){
    posX += vx;
    posY += vy;
    if(posX > maxWidth){
      posX = maxWidth;
      vx = -vx;
    }else if(posX <0 ){
      posX = 0;
      vx = -vx;
    }
    if(posY > maxHeight){
      posY = maxHeight;
      vy = -vy;
    }else if(posY <0 ){
      posY = 0;
      vy = -vy;
    }
    console.log("(x,y)="+posX +","+posY);
    $ball.css({
      left:posX+"px",
      top:posY+"px"
    });
  }

  window.setInterval(move,1000/60);

});
