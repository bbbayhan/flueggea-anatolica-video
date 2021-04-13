import plantImageSrc from './Waterwheel.jpg';

export const drawMesh = (predictions, ctx) => {
    if(predictions.length > 0){
        predictions.forEach((prediction) =>{
            const plantImage= new Image();
            const keypointsLeftEyeLower = prediction.annotations.leftEyeLower3;
            const keypointsLeftEyeUpper = prediction.annotations.leftEyeUpper1;
            const keypointsRightEyeUpper = prediction.annotations.rightEyeUpper1;
            const imageWidth = keypointsLeftEyeLower[0][0] - keypointsLeftEyeLower[keypointsLeftEyeLower.length-1][0];
            const imageHeight = keypointsLeftEyeLower[0][1] - keypointsLeftEyeUpper[keypointsLeftEyeUpper.length-1][1];
          


            plantImage.onload = function(){
                    const xUpperLEFT = keypointsLeftEyeUpper[5][0];
                    const yUpperLEFT = keypointsLeftEyeUpper[5][1];
                    const xUpperRIGHT = keypointsRightEyeUpper[0][0];
                    const yUpperRIGHT = keypointsRightEyeUpper[0][1];

                    
                    ctx.beginPath();
                    ctx.drawImage(plantImage,xUpperLEFT,yUpperLEFT,imageWidth,3*imageHeight);
                    ctx.drawImage(plantImage,xUpperRIGHT,yUpperRIGHT,imageWidth,3*imageHeight);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();
                    
                //}
            } 
            plantImage.src=plantImageSrc;
        });
    }
}