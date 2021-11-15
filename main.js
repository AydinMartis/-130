song="";
leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

ScoreRightWrist=0;


scorekeypoints=0;


function setup ()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);


}

function modelloaded ()
{
    console.log('Posenet is initialised!');
}

function gotposes (results)
{
    if(results.length>0)
    {
        console.log(results);
        ScoreRightWrist=results[0].pose.keypoints[10].score;
        scorekeypoints=results[0].pose.keypoints[9].score;
        
        console.log("scoreleftWrist = "+scorekeypoints+"scoreRightWrist = "+ScoreRightWrist);
        
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
    }

}

function draw ()

{
    image(video,0,0,600,500);
    fill("red");
   stroke("red");

   if(ScoreRightWrist>0.2){

   circle(rightWristX,rightWristY,20);

   if(rightWristY>0 &&rightWristY<=100)
   {
       document.getElementById("speed").innerHTML="Speed=0.5x";

       song.rate(0.5);

   }

   else if(rightWristY>100 &&rightWristY<=200)
   {
       document.getElementById("speed").innerHTML="Speed=1x";

       song.rate(1);

   }

   else if(rightWristY>200 &&rightWristY<=300)
   {
       document.getElementById("speed").innerHTML="Speed=1.5x";

       song.rate(1.5);

   }

   else if(rightWristY>300 &&rightWristY<=400)
   {
       document.getElementById("speed").innerHTML="Speed=2x";

       song.rate(2);

   }
   else if(rightWristY>400 &&rightWristY<=500)
   {
       document.getElementById("speed").innerHTML="Speed=2.5x";

       song.rate(2.5);

   }

}

   if(scorekeypoints>0.2)
   {
    circle(leftWristX,leftWristY,20);
    number_leftWristY= Number(leftWristY);
    remove_decimal= floor(number_leftWristY);
    volume= remove_decimal/500;
    document.getElementById('volume').innerHTML="Volume ="+volume;
    song.setVolume(volume);

   }
   
   

}

function preload ()
{
    song=loadSound("music.mp3");
}

function play ()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}