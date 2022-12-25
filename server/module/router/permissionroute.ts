import {Router, Route, Inject, BaseRoute, SessionFactory} from "noomi";
import {UserService} from "../service/userservice";
import {Responesecode} from "../util/responeseCode";
import {PermissionService} from "../service/permissionservice";

//路由类装饰器
@Router({
    namespace:"/permission",
    path:"*"
})
class PermissionRoute extends BaseRoute{
    //注入
    @Inject(PermissionService)
    permissionService:PermissionService;
    /**
     *   查找所有评估对象
     */
    async queryAll(){
        try{
            let res=await this.permissionService.queryAll(this.request);
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
     *   查找评估对象所有协作者
     *   @param proid  评估对象id
     */
    async queryAllHelper(){
        try{
            let res=await this.permissionService.queryAllHelper(this.request,this.model.proid);
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
     *   查找当前用户对应评估对象操作等级
     *   @param proid  评估对象id
     */
    async queryLevel(){
        try{
            let res=await this.permissionService.queryLevel(this.request,this.model.proid);
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
     *   查找当前用户对应评估对象操作等级
     *   @param proid  评估对象id
     */
    async delete(){
        try{
            let res=await this.permissionService.delete(this.request,this.model.proid,this.model.id);
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