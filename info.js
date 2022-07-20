export function modernFontColor(str, color) {
    return '<span style="color: ' + color + '">' + str + '</span>';
}

export const good=modernFontColor("Green Alert ", "green");
export const average=modernFontColor("Amber Alert", "yellow");
export const bad=modernFontColor("Red Alert", "red");
export const failed=modernFontColor("DESTROYED", "red");
export const easy=modernFontColor("It is too quiet.", "green");
export const medium=modernFontColor("Large swarm right ahead !", "yellow");
export const hard=modernFontColor("There are too many, run ! ", "red");
export const hell=modernFontColor("AARRGGHHHHHHHH !!", "red");
export const end=modernFontColor("The Machine has won","red");