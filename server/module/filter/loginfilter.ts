import {HttpRequest, HttpResponse, Instance, WebFilter,SessionFactory} from "noomi";

@Instance()
export class loginFilter{
    @WebFilter(/\.*/,11)
    async do(request:HttpRequest,response:HttpResponse){
        // const url=require("url")
        // let path=url.parse(request.url).pathname;
        // if(path.endsWith('.html')){
        //     return true;
        // }
        // if(path.endsWith('.css')){
        //     return true;
        // }
        // if(path.endsWith('.js')){
        //     return true;
        // }
        // if(path==="/user/login"||path==="/user/register"){
        //     return true
        // }
        // else{
        //     let session = await SessionFactory.getSession(request);
        //     // console.log(session);
        //
        //     let user = await session.get('user');
        //     // console.log(user);
        //     if(user){
        //         return true
        //     }
        // }
        // response.writeToClient({
        //     data:{error:'没有访问权限'},
        // });
        // return false
        return true;
    }
}