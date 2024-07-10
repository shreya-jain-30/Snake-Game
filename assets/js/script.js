let move = new Audio("./dirchange.mp3");
let eat=new Audio("./food.mp3");
const end=new Audio("./end.mp3");
const gamesound=new Audio("./game.mp3");
let dir={
    x:0,y:0
}
let speed=4;
let last=0;
let score=0;
let snakeArr=[{ x:8,y:8}];
let food={x:6,y:2};
function main(cur)
{
    window.requestAnimationFrame(main);
    // console.log(cur);
    if((cur-last)/1000 < 1/speed)
    {
        return;
    }
    last=cur;
    game();

}
function collide(snake)
{
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snake[i].x == snake[0].x && snake[i].y==snake[0].y)
        {
            return true;
        }
        
    }
    if(snake[0].x>20 || snake[0].y>20 || snake[0].x<0 ||  snake[0].y<0)
        return true;
    return false;
}
function game()
{
    if(collide(snakeArr))
    {
        dir={x:0,y:0};
        alert("Game Over!!");
        snakeArr=[{x:8,y:8}];
        score=0;
    }
    if(food.x===snakeArr[0].x && food.y===snakeArr[0].y)
    {
        
        let a=1;
        let b=18;
        snakeArr.unshift({x: snakeArr[0].x + dir.x , y: snakeArr[0].y + dir.y});
        score+=1;
        if(score>hsval)
        {
            hsval=score;
            localStorage.setItem("highscore",JSON.stringify(hsval));
            hsbox.innerHTML="High Score:"+hsval;
        }
        Score.innerHTML="Score:"+score;
        
        food={x: Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
    }
    
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]} ;
    }
    snakeArr[0].x=snakeArr[0].x+dir.x;
    snakeArr[0].y=snakeArr[0].y+dir.y;
    frame.innerHTML="";
    snakeArr.forEach((e,index)=>{
        sele=document.createElement('div');
        sele.style.gridRowStart=e.y;
        sele.style.gridColumnStart=e.x;
        if(index==0)
        {
            sele.classList.add('head');
        }
        else
        {
            sele.classList.add('snake');
        }
        frame.appendChild(sele);
    })
    fele=document.createElement('div');
    fele.style.gridRowStart=food.y;        
    fele.style.gridColumnStart=food.x;  
    fele.classList.add('food');
    frame.appendChild(fele);
}
let hs=localStorage.getItem("highscore");
if(hs==null)
{
    localStorage.setItem("highscore",JSON.stringify(0));
}
else{
    hsval=JSON.parse(hs);
    hsbox.innerHTML="High Score:"+hsval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    move.play();
    switch(e.key)
    {
        case "ArrowUp":

            dir.x=0;
            dir.y=-1;
            break;
        case "ArrowDown":
            dir.x=0;
            dir.y=1;
            break;
        case "ArrowLeft":
            dir.x=-1;
            dir.y=0;
            break;
        case "ArrowRight":
            dir.x=1;
            dir.y=0;
            break;
        default:
            console.log("wrong");
            break;
    }
})