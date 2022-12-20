import {Router, Route, Inject, BaseRoute, SessionFactory} from "noomi";
import {UserService} from "../service/userservice";
import {Responesecode} from "../util/responeseCode";
import {ManagerService} from "../service/managerservice";

//路由类装饰器
@Router({
    namespace:"/manager",
    path:"*"
})
class ManagerRoute extends BaseRoute{
    //注入
    @Inject(ManagerService)
    managerService:ManagerService;
    /**
     *   删除用户
     *   @param id    用户id
     */
    async deleteUser(){
        try{
            let res=await this.managerService.deleteUser(this.request,this.model.id);
            return {
                result:Responesecode.SUCCESS,
                message:res,
            }
        }catch (e){
            return {
                result:Responesecode.FAIL,
                message:e,
            }
        }
    }
    /**
     *   修改用户
     *   @param id          账号
     *   @param password    密码
     */
    async alterUser(){
        try{
            let res=await this.managerService.alterUser(this.request,this.model.id,this.model.password);
            return {
                result:Responesecode.SUCCESS,
                message:res,
            }
        }catch (e){
            return {
                result:Responesecode.FAIL,
                message:e,
            }
        }
    }
    /**
     *   查询所有用户
     */
    async queryAllUser(){
        try{
            let res=await this.managerService.queryAllUser(this.request);
            return {
                result:Responesecode.SUCCESS,
                message:res,
            }
        }catch (e){
            return {
                result:Responesecode.FAIL,
                message:e,
            }
        }
    }
}