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
     *   删除用户
     *   @param id    用户id
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

}