const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

export function randomString(len) {
    let arr = new Array(len)
    for (let i = 0; i < len; i++) {
        arr[i] = alphabet[Math.floor(Math.random() * alphabet.length)]
    }
    return arr.join("")
}