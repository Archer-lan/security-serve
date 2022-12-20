import {Router, Route, Inject, BaseRoute, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {ThreatenService} from "../service/threatenservice";

//路由类装饰器
@Router({
    namespace:"/threaten",
    path:"*"
})
class ThreatenRoute extends BaseRoute{
    //注入
    @Inject(ThreatenService)
    assetsService:ThreatenService;
    /**
     *   添加威胁
     *   @param assetsid     资产id
     *   @param type    威胁类型
     *   @param value   威胁值
     *   @param note    威胁描述
     *   @param proid   评估对象id
     */
    async add(){
        try{
            let res=await this.assetsService.add(this.request,this.model.assetsid,this.model.type,this.model.value
            ,this.model.note,this.model.proid);
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
     *   添加威胁
     *   @param threatenid     威胁id
     *   @param type    威胁类型
     *   @param value   威胁值
     *   @param note    威胁描述
     *   @param proid   评估对象id
     */
    async alter(){
        try{
            let res=await this.assetsService.alter(this.request,this.model.threatenid,this.model.type,this.model.value
                ,this.model.note,this.model.proid);
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
     *   删除威胁
     *   @param threatenid     威胁id
     *   @param proid   评估对象id
     */
    async delete(){
        try{
            let res=await this.assetsService.delete(this.request,this.model.threatenid,this.model.proid);
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
     *   查找威胁
     *   @param threatenid     威胁id
     *   @param proid   评估对象id
     */
    async queryAll(){
        try{
            let res=await this.assetsService.queryAll(this.request,this.model.proid);
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