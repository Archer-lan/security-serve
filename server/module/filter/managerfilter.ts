import {HttpRequest, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";

export async function isManager(request:HttpRequest){
    let session = await SessionFactory.getSession(request);
    let user = JSON.parse(await session.get('user'));
    if(user.username!=="lan"){
        return false
    }
    return true;
}