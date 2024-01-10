(()=>{"use strict";const t=class{constructor(t){this.gameWidth=t.gameWidth,this.width=150,this.height=20,this.maxSpeed=7,this.speed=0,this.position={x:t.gameWidth/2-this.width/2,y:t.gameHeight-this.height-10}}draw(t){t.fillStyle="#00f",t.fillRect(this.position.x,this.position.y,this.width,this.height)}moveLeft(){this.speed=-this.maxSpeed}moveRight(){this.speed=this.maxSpeed}stop(){this.speed=0}update(t){this.position.x+=this.speed,this.position.x<0&&(this.position.x=0),this.position.x>this.gameWidth-this.width&&(this.position.x=this.gameWidth-this.width)}},s=class{constructor(t,s){const e="ArrowLeft",i="ArrowRight";document.addEventListener("keydown",(h=>{switch(h.key){case e:case"a":case"A":t.moveLeft();break;case i:case"d":case"D":t.moveRight();break;case"Escape":s.togglePause();break;case" ":s.start()}})),document.addEventListener("keyup",(s=>{switch(s.key){case e:case"a":case"A":t.speed<0&&t.stop();break;case i:case"d":case"D":t.speed>0&&t.stop()}}))}};function e(t,s){let e=t.position.y+t.size,i=t.position.y,h=s.position.y,a=s.position.x,o=s.position.x+s.width,n=s.position.y+s.height;return e>=h&&i<=n&&t.position.x>=a&&t.position.x<=o}class i{constructor(t){this.img=document.getElementById("img-ball"),this.gameWidth=t.gameWidth,this.gameHeight=t.gameHeight,this.game=t,this.size=16,this.reset()}reset(){this.position={x:10,y:400},this.speed={x:4,y:-2}}draw(t){t.drawImage(this.img,this.position.x,this.position.y,this.size,this.size)}update(t){this.position.x+=this.speed.x,this.position.y+=this.speed.y,(this.position.x+this.size>this.gameWidth||this.position.x<0)&&(this.speed.x=-this.speed.x),this.position.y<0&&(this.speed.y=-this.speed.y),this.position.y+this.size>this.gameHeight&&(this.game.lives-=1,this.reset()),e(this,this.game.paddle)&&(this.speed.y=-this.speed.y,this.position.y=this.game.paddle.position.y-this.size)}}class h{constructor(t,s){this.img=document.getElementById("img-brick"),this.game=t,this.position=s,this.width=80,this.height=24,this.markedForDeletion=!1}update(){e(this.game.ball,this)&&(this.game.ball.speed.y=-this.game.ball.speed.y,this.markedForDeletion=!0)}draw(t){t.drawImage(this.img,this.position.x,this.position.y,this.width,this.height)}}function a(t,s){let e=[];return s.forEach(((s,i)=>{s.forEach(((s,a)=>{if(1===s){let s={x:80*a,y:75+24*i};e.push(new h(t,s))}}))})),e}const o=[[0,1,1,0,1,1,0,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1]],n=[[0,1,1,0,1,1,0,1,1,0],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1],[1,0,0,1,0,0,1,0,0,1]],r=document.getElementById("gameScreen"),d=r.getContext("2d"),l=r.width,g=r.height;let c=new class{constructor(e,h){this.gameWidth=e,this.gameHeight=h,this.gamestate=2,this.paddle=new t(this),this.ball=new i(this),this.gameObjects=[],this.bricks=[],this.lives=3,this.levels=[o,n],this.currentLevel=0,new s(this.paddle,this)}start(){2===this.gamestate&&(this.bricks=a(this,this.levels[this.currentLevel]),this.gameObjects=[this.ball,this.paddle],this.gamestate=1)}update(t){if(0===this.lives&&(this.gamestate=3),0!==this.gamestate&&2!==this.gamestate&&3!==this.gamestate&&5!==this.gamestate){if(0===this.bricks.length){if(this.currentLevel++,this.currentLevel>=this.levels.length)return void(this.gamestate=5);this.bricks=a(this,this.levels[this.currentLevel]),this.lives++}[...this.gameObjects,...this.bricks].forEach((s=>s.update(t))),this.bricks=this.bricks.filter((t=>!t.markedForDeletion))}}displayStats(t,s,e,i,h){t.font="20px Arial",t.fillStyle="black",t.fillText(s+e,i,h)}screenMsg(t,s,e){t.rect(0,0,this.gameWidth,this.gameHeight),t.fillStyle=`rgba(0,0,0,${s})`,t.fill(),t.font="30px Arial",t.fillStyle="white",t.textAlign="center",t.fillText(e,this.gameWidth/2,this.gameHeight/2)}draw(t){5===this.gamestate&&this.screenMsg(t,1,"You've beat all the levels we have so far. Good Job."),[...this.gameObjects,...this.bricks].forEach((s=>s.draw(t))),this.displayStats(t,"Lives: ",this.lives,40,30),this.displayStats(t,"Level: ",this.currentLevel+1,760,30),0===this.gamestate&&this.screenMsg(t,.5,"Paused"),2===this.gamestate&&this.screenMsg(t,1,"Press SPACEBAR to start"),3===this.gamestate&&this.screenMsg(t,1,"GAME OVER")}togglePause(){0==this.gamestate?this.gamestate=1:this.gamestate=0}}(l,g),m=0;requestAnimationFrame((function t(s){let e=s-m;m=s,d.clearRect(0,0,l,g),c.update(e),c.draw(d),requestAnimationFrame(t)}))})();