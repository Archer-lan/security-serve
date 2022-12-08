import {Router, Route, Inject, BaseRoute, SessionFactory} from "noomi";
import {UserService} from "../service/userservice";
import {Responesecode} from "../util/responeseCode";

//路由类装饰器
@Router({
    namespace:"/user",
    path:"*"
})
class UserRoute extends BaseRoute{
    //注入
    @Inject(UserService)
    userService:UserService;
    /**
     *   登陆
     *   @param account     账号
     *   @param password    密码
     */
    async login(){
        try{
            let res=await this.userService.login(this.model.account,this.model.password);
            let session=await SessionFactory.getSession(this.request);
            await session.set('user',res);
            return {
                result:Responesecode.SUCCESS,
                message:Responesecode.DONE2,
            }
        }catch (e){
            return {
                result:Responesecode.FAIL,
                message:e,
            }
        }
    }
    /**
     *  注销
     * */
    async logout(){
        try{
            let sessionId=await SessionFactory.getSessionId(this.request);
            if(!sessionId){
                throw Responesecode.Error5;
            }
            await SessionFactory.delSession(sessionId);
            return {
                result:Responesecode.SUCCESS,
                message:Responesecode.DONE4,
            }
        }catch (e) {
            return {
                result:Responesecode.FAIL,
                message:e,
            }
        }
    }
    /**
     *  注册
     *  @param account     账号
     *  @param password1   密码1
     *  @param password2   密码2
     * */
    async register(){
        try{
            let msg=await this.userService.register(this.model.account,this.model.password1,this.model.password2);
            return {
                result:Responesecode.SUCCESS,
                message:msg,
            }
        }catch (e){
            return {
                result:Responesecode.FAIL,
                message:e
            }
        }
    }
    /**
     *  修改密码
     *  @param request      请求头
     *  @param curpwd       当前密码
     *  @param password1    新密码1
     *  @param passwprd2    新密码2
     * */
    async alterPwd(){
        try{
            let msg=await this.userService.alterPwd(this.request,this.model.curpwd,this.model.password1,this.model.password2);
            return {
                result:Responesecode.SUCCESS,
                message:msg,
            }
        }catch (e){
            return {
                result:Responesecode.FAIL,
                message:e
            }
        }
    }
}