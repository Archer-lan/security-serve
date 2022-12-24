import {Router, Route, Inject, BaseRoute, SessionFactory} from "noomi";
import {UserService} from "../service/userservice";
import {Responesecode} from "../util/responeseCode";
import {ManagerService} from "../service/managerservice";
import {AssessmentService} from "../service/assessmentservice";

//路由类装饰器
@Router({
    namespace:"/assessment",
    path:"*"
})
class AssessmentRoute extends BaseRoute{
    //注入
    @Inject(AssessmentService)
    assessmentService:AssessmentService;
    /**
     *   添加评估对象
     *   @param name    评估对象名称
     *   @param note    评估对象描述
     */
    async add(){
        try{
            let res=await this.assessmentService.add(this.request,this.model.name,this.model.note);
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
     *   删除评估对象
     *   @param name    评估对象名称
     */
    async delete(){
        try{
            let res=await this.assessmentService.delete(this.request,this.model.name);
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
     *   修改评估对象描述
     *   @param name    评估对象名称
     *   @param note    评估对象描述
     */
    async alter(){
        try{
            let res=await this.assessmentService.alter(this.request,this.model.proid,this.model.name,this.model.note);
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
     *   添加评估对象用户
     *   @param name    评估对象名称
     *   @param username 添加对象用户的名称
     */
    async addMembers(){
        try{
            let res=await this.assessmentService.addMembers(this.request,this.model.name,this.model.username);
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