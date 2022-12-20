import {Router, Route, Inject, BaseRoute, SessionFactory} from "noomi";
import {UserService} from "../service/userservice";
import {Responesecode} from "../util/responeseCode";
import {AssetsService} from "../service/assetsservice";


//路由类装饰器
@Router({
    namespace:"/assets",
    path:"*"
})
class AssetsRoute extends BaseRoute{
    //注入
    @Inject(AssetsService)
    assetsService:AssetsService;
    /**
     *   添加资产
     *   @param type    数据类型
     *   @param name    资产名称
     *   @param person  资产责任人
     *   @param secrety 资产保密性
     *   @param wholeness    资产完整性
     *   @param availability 资产可用性
     *   @param importance   资产重要性
     *   @param note    资产备注
     *   @param proid   评估对象id
     */
    async add(){
        try{
            let res=await this.assetsService.add(this.request,this.model.type,this.model.name
                ,this.model.person,this.model.secrety,this.model.wholeness,this.model.availability
                ,this.model.importance,this.model.note,this.model.proid);
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
     *   修改资产
     *   @param type    数据类型
     *   @param name    资产名称
     *   @param person  资产责任人
     *   @param secrety 资产保密性
     *   @param wholeness    资产完整性
     *   @param availability 资产可用性
     *   @param importance   资产重要性
     *   @param note    资产备注
     *   @param proid   评估对象id
     */
    async alter(){
        try{
            let res=await this.assetsService.alter(this.request,this.model.type,this.model.name
                ,this.model.person,this.model.secrety,this.model.wholeness,this.model.availability
                ,this.model.importance,this.model.note,this.model.proid);
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
     *   删除资产
     *   @param name    资产名称
     *   @param proid   评估对象id
     */
    async delete(){
        try{
            let res=await this.assetsService.delete(this.request,this.model.name,this.model.proid);
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
     *   查看资产
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