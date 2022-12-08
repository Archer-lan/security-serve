import * as crypto from "crypto";
export function encryp(data:string):string{
    let hash=crypto.createHash('md5');
    hash.update(data);
    let newStr=hash.digest('hex');
    console.log(newStr);
    return newStr;
}