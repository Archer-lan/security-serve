import {Router, Route, Inject, BaseRoute, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {CalculateService} from "../service/calculateservice";


//路由类装饰器
@Router({
    namespace:"/calculate",
    path:"*"
})
class CalculateRoute extends BaseRoute{
    //注入
    @Inject(CalculateService)
    calculateService:CalculateService;
    /**
     *   计算结果
     *   @param proid    评估对象ID
     */
    async getResult(){
        try{
            let res=await this.calculateService.getResult(this.request,this.model.proid);
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
     *   删除计算结果
     *   @param proid    评估对象ID
     *   @param id       计算结果id
     */
    // async delete(){
    //     try{
    //         let res=await this.calculateService.delete(this.request,this.model.proid,this.model.id);
    //         return {
    //             result:Responesecode.SUCCESS,
    //             message:res,
    //         }
    //     }catch (e){
    //         return {
    //             result:Responesecode.FAIL,
    //             message:e,
    //         }
    //     }
    // }
}