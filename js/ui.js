class Button{
  constructor(x,y,image,scale){
    this.x=x;
    this.y=y;
    this.image=image;
    this.scale=scale;
  }
  draw(){
    ctx.drawImage(this.image,this.x*tw,this.y*tw,globalWidth*this.scale,globalWidth*this.scale);
  }
}
class Container{
  constructor(x,y,buttons,scale){
    this.x=x;
    this.y=y;
    this.scale=scale
  }
}