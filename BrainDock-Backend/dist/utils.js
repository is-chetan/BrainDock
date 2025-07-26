"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = random;
function random(len) {
    let options = "qwertyuioasdfghjklzxcvbnm12345678";
    let ans = "";
    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * options.length);
        ans += options[randomIndex];
    }
    return ans;
}
