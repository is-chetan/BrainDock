export function random(len: number) {
    let options = "qwertyuioasdfghjklzxcvbnm12345678";
    let ans= "";
    for(let i=0;i<len;i++){
        const randomIndex = Math.floor(Math.random() * options.length);
        ans += options[randomIndex];
    }
    return ans;
}