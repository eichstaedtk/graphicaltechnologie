function setup() {
  window.onkeydown = keyboardHandler

  images = [createImage('wheel','url(images/sprite-wheel.png)',512,512, 3072),
    createImage('bunny','url(images/sprite-bunny.png)',200,240, 1600)]
}

function createImage(imageContainerID,imageUrl, width,height, length) {
  console.log('Create your Image ...')
  var rotatedImage = document.getElementById(imageContainerID);
  rotatedImage.style.backgroundImage = imageUrl
  rotatedImage.style.width = width+'px'
  rotatedImage.style.height = height+'px'
  rotatedImage.positionX = 0
  rotatedImage.animation

  rotatedImage.rotateLeft = function () {
    console.log('Rotate Image Left')
    rotatedImage.positionX = rotatedImage.positionX + width

    if(rotatedImage.positionX >= length)
    {
      rotatedImage.positionX = 0
    }

    rotatedImage.style.backgroundPositionX = rotatedImage.positionX + 'px'
  }

  rotatedImage.rotateRight = function() {
    console.log('Rotate Image Right')
    rotatedImage.positionX = rotatedImage.positionX - width

    if(rotatedImage.positionX <= 0)
    {
      rotatedImage.positionX = length
    }

    rotatedImage.style.backgroundPositionX = rotatedImage.positionX + 'px'
  }

  rotatedImage.rotateEndless = function () {
    console.log('Rotate Image Endless')
      rotatedImage.animation = window.setInterval(()=>{
        rotatedImage.rotateRight()
      },200)

  }
  return rotatedImage;
}

/*
Callback Function to handle keyboard events properly ...
 */

function keyboardHandler(evt) {
  console.log('Getting Keyboard Event')

  images.forEach(rotatedImage => {
    if(rotatedImage.animation){
      window.clearInterval(rotatedImage.animation);
    }

    switch (evt.key) {
      case 'r': rotatedImage.rotateRight(); break;
      case 'l': rotatedImage.rotateLeft(); break;
      case 'a': rotatedImage.rotateEndless(); break;
    }
  })


}