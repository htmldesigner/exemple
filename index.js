(function(){
    let canvas = document.querySelector('canvas')
    let ctx = canvas.getContext('2d')

    let h = canvas.height = window.innerHeight
    let w = canvas.width = window.innerWidth
    document.querySelector('body').append(canvas)

    window.addEventListener('resize', () => {
        h = canvas.height = window.innerHeight
        w = canvas.width = window.innerWidth
    })

    let particles = []
    let properties = {
        bgColor: 'rgba(17,17,19,1)',
        particleColor: 'rgba(255, 40, 40, 1)',
        radius: 3,
        particleCount: 60,
        particleMaxVelocity: 0.5,
        lineLength : 150,
    }

    class Particle {
        constructor(){
            this.x = Math.random() * w
            this.y = Math.random() * h
            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity
            this.r = (Math.random() * (properties.radius - 1 + 1)) + 1
        }

        position(){
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX*=-1 : this.velocityX
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY*=-1 : this.velocityY
            this.x += this.velocityX
            this.y += this.velocityY
        }
        
        reDraw(){
            ctx.fillStyle = properties.particleColor
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
        }
    }

   function reDrawBackground(){
       ctx.fillStyle = properties.bgColor
       ctx.fillRect(0,0,w,h)
     }

     function reDrawParticles(){
        for(let dot of particles){
           dot.position()
           dot.reDraw()
        }
     }

     function drawLines(){
         let x1, y1, x2, y2, length, opacity;

         for(let i of particles){
            for(let j of particles){
                x1 = i.x
                y1 = i.y
                x2 = j.x
                y2 = j.y
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
                if(length < properties.lineLength){
                    opacity = 1 - length /  properties.lineLength
                    ctx.lineWidth = '0,5'
                    ctx.strokeStyle = `rgba(255, 40, 40 , ${opacity})`
                    ctx.beginPath()
                    ctx.moveTo(x1, y1)
                    ctx.lineTo(x2, y2)
                    ctx.stroke()
                    ctx.closePath()
                }
            }
         }

     }

     function loop(){
         reDrawBackground()
         reDrawParticles()
         drawLines()
         requestAnimationFrame(loop)
     }

    function init(){
        for (let i = 0; i < properties.particleCount; i++) {
           particles.push(new Particle)
        }
        loop()
    }

    init()

}())