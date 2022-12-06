export let modernFontColor=(str,color)=> '<span style="color: ' + color + '">' + str + '</span>';  //no curly braces because produce an expression 
export const good=modernFontColor("Green Alert ", "green");
export const average=modernFontColor("Amber Alert", "yellow");
export const bad=modernFontColor("Red Alert", "red");
export const failed=modernFontColor("DESTROYED", "red");
export const easy=modernFontColor("It is too quiet.", "green");
export const medium=modernFontColor("Large swarm right ahead !", "yellow");
export const hard=modernFontColor("There are too many, run ! ", "red");
export const hell=modernFontColor("AARRGGHHHHHHHH !!", "red");
export const end=modernFontColor("The Machine has won","red");

export class platform {
    constructor (startingTime,robotSize,intialSpeed,firstChange,secondChange,thirdChange,fouthChange,fifthChange,lastChange,firstSpChange,secondSpChange){
        this.startingTime=startingTime;
        this.robotSize=robotSize;
        this.intialSpeed=intialSpeed;
        this.firstChange=firstChange;
        this.secondChange=secondChange;
        this.thirdChange=thirdChange;
        this.fouthChange=fouthChange;
        this.fifthChange=fifthChange;
        this.lastChange=lastChange;
        this.firstSpChange=firstSpChange;
        this.secondSpChange=secondSpChange;
    }
}

export const mobile= new platform(600,50,3,500,450,400,350,300,200,4,5);
export const pc= new platform(1000,35,1,900,800,700,600,550,450,2,3);
