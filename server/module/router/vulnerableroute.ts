import {Router, Route, Inject, BaseRoute, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {VulnerableService} from "../service/vulnerableservice";

//路由类装饰器
@Router({
    namespace:"/vulnerable",
    path:"*"
})
class VulnerableRoute extends BaseRoute{
    //注入
    @Inject(VulnerableService)
    vulnerableService:VulnerableService;
    /**
     *   添加脆弱性
     *   @param assetsid    资产ID
     *   @param type        脆弱性类型
     *   @param value       脆弱性值
     *   @param proid       评估对象id
     *   @param threatenid  威胁id
     */
    async add(){
        try{
            let res=await this.vulnerableService.add(this.request,this.model.assetsid,this.model.type,
                this.model.value,this.model.proid,this.model.threatenid);
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
     *   修改脆弱性
     *   @param vulid       脆弱性ID
     *   @param type        脆弱性类型
     *   @param value       脆弱性值
     *   @param proid       评估对象id
     */
    async alter(){
        try{
            let res=await this.vulnerableService.alter(this.request,this.model.vulid,this.model.type,
                this.model.value,this.model.proid);
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
     *   删除脆弱性
     *   @param vulid       脆弱性id
     *   @param proid       评估对象id
     */
    async delete(){
        try{
            let res=await this.vulnerableService.delete(this.request,this.model.vulid,this.model.proid);
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
     *   查找脆弱性
     *   @param proid       评估对象id
     */
    async queryAll(){
        try{
            let res=await this.vulnerableService.queryAll(this.request,this.model.proid);
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