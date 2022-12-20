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
}