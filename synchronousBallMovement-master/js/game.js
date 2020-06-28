class Game {
    constructor() {}
    getstate() {
        var gamestateref = database.ref("gamestate");
        gamestateref.on("value",function(data){
            gamestate = data.val();
        })
    }
    update(state){
        database.ref("/").update({
            gamestate:state
        });
    }
    async start(){
        if(gamestate===0) {
            player = new Player(); 
            var playercountref = await database.ref("playercount").once("value");
            if(playercountref.exists()) {
                playercount = playercountref.val();
                player.getcount();
            }
            form = new Form();
            form.display();
        }
        car1 = createSprite(100,200);
        car1.addImage(car1img);
        car2 = createSprite(300,200);
        car2.addImage(car2img);
        car3 = createSprite(500,200);
        car3.addImage(car3img);
        car4 = createSprite(700,200);
        car4.addImage(car4img)
        cars = [car1,car2,car3,car4];
    }
    play() {
        form.hide();
        //textSize(18);
        //text("Game Start!",120,100);
        Player.getplayerinfo();
        player.getcarsatend();
        if(allplayers!==undefined) {
           // var displayposition = 130;
            background(groundimg);
            image(trackimg,0,-displayHeight*4,displayWidth,displayHeight*7);
            var index = 0;
            var x = 100;
            var y;

            for(var i in allplayers){
                index = index+1;
                x = x+200;
                y = displayHeight - allplayers[i].distance;
                cars[index-1].x = x;
                cars[index-1].y = y;
                if(index===player.index) {
                    stroke(10);
                    fill("red");
                    ellipse(x,y,60,60);
                    cars[index-1].shapeColor = "red";
                    camera.position.x = displayWidth/2;
                    camera.position.y = cars[index-1].y;
                }
           // else{
           //     fill("black");
           // }
           /* displayposition+=20;
            textSize(15);
            text(allplayers[i].name+":"+allplayers[i].distance,120,displayposition)*/
            
            }
            
        }
        if(keyIsDown(UP_ARROW)&&player.index!==null) {
            player.distance+=50;
            player.update();
        }
        if(player.distance>3700) {
            gamestate = 2;
            player.rank+=1;
            Player.updatecarsatend(player.rank)
        }
        drawSprites();
    }
    end() {
        console.log("game ended")
       // game.update(2);
        console.log(player.rank);
    }
}