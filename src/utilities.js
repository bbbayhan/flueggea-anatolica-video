import {IMAGE_SRC} from './plantImages/MapNameToImage';

export const displayRandomImage = () => {
    const imageIndex = Math.floor(Math.random()*9);
    return Object.values(IMAGE_SRC)[imageIndex];
}

export const drawMesh = (predictions, ctx) => {
    if(predictions.length > 0){
        predictions.forEach((prediction) =>{
            const plantImage= new Image();
            const keypointsLeftEyeLower = prediction.annotations.leftEyeLower3;
            const keypointsLeftEyeBrowUpper = prediction.annotations.leftEyebrowUpper;
            const keypointsRightEyeUpper = prediction.annotations.rightEyebrowUpper;
            const imageWidth = keypointsLeftEyeLower[0][0] - keypointsLeftEyeLower[keypointsLeftEyeLower.length-1][0];
            const imageHeight = keypointsLeftEyeLower[0][1] - keypointsLeftEyeBrowUpper[keypointsLeftEyeBrowUpper.length-1][1];
          
            let plantImageSrc = displayRandomImage();

            plantImage.onload = function(){
                    const xUpperLEFT = keypointsLeftEyeBrowUpper[5][0];
                    const yUpperLEFT = keypointsLeftEyeBrowUpper[5][1];
                    const xUpperRIGHT = keypointsRightEyeUpper[0][0];
                    const yUpperRIGHT = keypointsLeftEyeBrowUpper[5][1];

                    if(ctx){
                        ctx.beginPath();
                        ctx.drawImage(plantImage,xUpperLEFT,yUpperLEFT,imageWidth,4*imageHeight);
                        ctx.drawImage(plantImage,xUpperRIGHT,yUpperRIGHT,imageWidth,4*imageHeight);
                        ctx.closePath();
                        ctx.fill();
                        ctx.stroke();
                    }
                    
                    
                //}
            } 
            plantImage.src=plantImageSrc;
        });
    }
}