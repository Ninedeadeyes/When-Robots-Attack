import { audioZap,audioWarning,audioEnding,pauseAudio,bkMusic } from "./audio.js";
import{good,average,bad,failed,easy,medium,hard,hell,end,mobile,pc } from "./info.js";

let score=0;
let lives=4;
let scoreDiv=document.getElementById("score");
let time=1000;
let alertStatus;
let difficulty;
let playField={
    width:400,
    height:500
};

let type;

let robots=[];
let interval;
let button=document.getElementById("start");
let field=document.getElementById("field");



window.startGame=function(){
    showButton(false);
    pauseAudio(audioEnding); // stop ending music when start a new game 
    bkMusic.play();
    lives=4;
    time=type.startingTime;
    field.style.backgroundImage="url('images/bg.png')";
    interval=setInterval(createrobot,time);
    score=0;
    updateScore();
    animate();
}

let modeSelection=window.confirm("If using touchscreen click 'OK' or mouse click 'Cancel'");

if (modeSelection===true){

    type=mobile;

}

else {

 type=pc;

}

function showButton(show){
    if (show){
        button.style.display="block";
    }

    else{
        button.style.display="none";
    }
}

function createrobot(){
    let robot= document.createElement("div");  // create new div 
    field.appendChild(robot);   // Add div to the HTML document 
   // robot.classList.add("robotCSS");  // just a personal reminder on how to add CSS class to div

    if (score >10 & score<40){
        time=type.firstChange;
        clearInterval(interval);
        interval=setInterval(createrobot,time);
    } 

    if (score >40 & score<60){
        time=type.secondChange;
        clearInterval(interval);
        interval=setInterval(createrobot,time);
    } 
    
    if (score >60 & score<80){
        time=type.thirdChange;
        clearInterval(interval);
        interval=setInterval(createrobot,time);
    } 

    if (score >80 & score<180){
        time=type.fouthChange;
        clearInterval(interval);
        interval=setInterval(createrobot,time);
    } 

    if (score >180 & score<200){
        time=type.fifthChange;
        clearInterval(interval);
        interval=setInterval(createrobot,time);
    } 

    if (score>200){
        time=type.lastChange;
        clearInterval(interval);
        interval=setInterval(createrobot,time);
    } 

    robot.onclick = function (){
    pop(robot);
    audioZap.play();
    };

   let monsters=["images/demon1.png","images/demon2.png"]
   let index=Math.floor(Math.random()*monsters.length);
   let example=monsters[index];

   robot.style.background ="url("+example+")";
   robot.style.backgroundRepeat="no-repeat";
   robot.style.backgroundSize="contain";
 
   let size=type.robotSize;
   robot.style.width=size+"px";
   robot.style.height=size+"px";
   
   let increaseSpeed=type.intialSpeed;

   if (type==mobile){


    if (score>60 & score<200) { 
        increaseSpeed=type.firstSpChange;
       }
        
    else if (score>200) { 
        increaseSpeed=type.secondSpChange;
       }
    
   }

   else{
    if (score>120 & score<200) { 
        increaseSpeed=type.firstSpChange;
       }
        
       else if (score>200) { 
        increaseSpeed=type.secondSpChange;
       }

   }

   let speed=Math.floor(Math.random()*increaseSpeed)+1;
   robot.speed=speed;

   let playWidth=playField.width-size;
   let left=Math.floor(Math.random()*playWidth)
   let top=playField.height/500;
   robot.style.left=left+"px";
   robot.style.top=top+"px";
                                // We need to add robot to the 'robots array but also keep track of where it is located in the array, to remove later ' 
   robot.index=robots.length;   //Setting the index to robots.length set it up for the next empty place in the array  ( length +1 because arrays are 0 based  )
   robots.push(robot);          //add item to the end of the array 
   updateScore();
}

function pop(robot){
    robots[robot.index]=null;    // This nullify the 'object' 
    robot.parentNode.removeChild(robot); // This remove the div hence image disappears .  ParentNode is the 'field' div 
    score++;
    updateScore();
}

function updateScore(){
    if (lives==4){
        alertStatus=good;
    }

    else if (lives==3){
        field.style.backgroundImage="url('images/bg1.png')";
    }

    else if (lives==2){
        alertStatus=average;
        field.style.backgroundImage="url('images/bg2.png')";
    }

    else if (lives==1){
        alertStatus=bad;
        field.style.backgroundImage="url('images/bg3.png')";
    }

    else{
        time=100;  // triggers the ending 
        alertStatus=failed;
        field.style.backgroundImage="url('images/bg4.png')";
    }

    if (time==type.startingTime || time==type.firstChange) {
        difficulty=easy;
    }

    else if (time==type.secondChange) {
        difficulty=medium;
    }

    else if (time==type.thirdChange) {
        difficulty=hard;
    }

    else if (time==type.fouthChange || time==type.fifthChange||time==type.lastChange ) {
        difficulty=hell;
    }

    else if (time==100) {
        difficulty=end;
    }

    let text="Kill count:"+score+"    ";
    text+="Shield: " +alertStatus;
    text+="<br> Report:"+difficulty;
    scoreDiv.innerHTML=text;
}

function animate(){
    let defeated=false;

    for (let i=0; i<robots.length; i++){  

        let robot=robots[i];  // This is will pull one robot at a time for the array base of index  

        if (!robot){        // destroyed robots will be set to 'null' hence 
            continue;       // this will tell it to skip and go back to top in such a situation 
        }

        let top=parseInt(robot.style.top);
        top += robot.speed;
        robot.style.top=top+"px";    // This literally increase the the div style top hence push it further away from the top. 

        if (top>=playField.height){

            if (lives>1){
                audioWarning.play();
            }
            
            robots[robot.index]=null;
            lives-=1
            updateScore();    
        }

        else if(lives==0){
            defeated=true;
            break;
        }
    }

    if (defeated){  
        gameOver();
        pauseAudio(audioWarning);
        pauseAudio(bkMusic); 
        audioEnding.play();
    }

    else{
        requestAnimationFrame(animate);
    }
}

function gameOver(){
    showButton(true);
    removeRobots();
    clearInterval(interval);
    updateScore();
    field.style.backgroundImage="url('images/bg4.png')";
    scoreDiv.innerHTML+="<h1> Game Over</h1>";
}

function removeRobots(){                     // remove all robots from array to start game again. 
    for (let i=0; i<robots.length; i++){
        
        let robot=robots[i];
        
        if (!robot){
            continue;
        }

        robot.parentNode.removeChild(robot);
    }
    
    robots=[];
}
