import {HttpRequest, Inject, Instance, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {PermissionService} from "./permissionservice";
import {EntityManager, getEntityManager, Query} from "relaen";
import {Assessment} from "../dao/entity/assessment";
import {Assets} from "../dao/entity/assets";
import {Threaten} from "../dao/entity/threaten";
import {Vulnerability} from "../dao/entity/vulnerability";

@Instance()
export class VulnerableService{
    @Inject(PermissionService)
    permissionService:PermissionService;
    //添加
    async add(request: HttpRequest, assetsid: number, type, value, proid: number, threatenid: number) {
        let params1={
            "id":{
                value:proid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            },
        }
        let ass:Assessment=<Assessment> await Assessment.findOne(params1);
        if(!ass){
            throw Responesecode.Error10
        }
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params2={
            "id":{
                value:assetsid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            },
            "assessment.id":{
                value:proid,
                rel:'='
            }
        }
        let assets:Assets=<Assets> await Assets.findOne(params2);
        if(!assets){
            throw Responesecode.Error11;
        }
        let params3={
            "id":{
                value:threatenid,
                rel:'='
            },
            "assessment.id":{
                value:proid,
                rel:'='
            },
            "status":{
                value:'0',
                rel:'='
            }
        }
        let threaten:Threaten=<Threaten> await Threaten.findOne(params3);
        if(!threaten){
            throw Responesecode.Error12;
        }
        let vul:Vulnerability=new Vulnerability();
        vul.assets=assets;
        vul.assessment=ass;
        vul.threaten=threaten;
        vul.type=type;
        vul.value=value;
        vul.status=0;
        await vul.save(true);
        return Responesecode.DONE6;
    }
    //修改脆弱性
    async alter(request: HttpRequest, vulid: any, type, value, proid: any) {
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params1={
            "id":{
                value:vulid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            },
        }
        let vul:Vulnerability=<Vulnerability> await Vulnerability.findOne(params1);
        if(!vul){
            throw Responesecode.Error13;
        }
        if(type){
            vul.type=type;
        }
        if(value){
            vul.value=value;
        }
        await vul.save(true);
        return Responesecode.DONE7;
    }
    //删除脆弱性
    async delete(request: HttpRequest, vulid: any, proid: any) {
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params1={
            "id":{
                value:vulid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            },
        }
        let vul:Vulnerability=<Vulnerability> await Vulnerability.findOne(params1);
        if(!vul){
            throw Responesecode.Error13;
        }
        vul.status=1;
        await vul.save(true);
        return Responesecode.DONE5;
    }
    //查找
    async queryAll(request: HttpRequest, proid: any) {
        let res=await this.permissionService.isReadAllow(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params={
            "assessment.id":{
                value:proid,
                rel:'='
            },
            "status":{
                value:0,
                rel: "="
            }
        }
        let em:EntityManager=await getEntityManager();
        let query:Query=em.createQuery(Vulnerability.name);
        let r=await query.select(["*","assets.*","threaten.*","assessment.*"])
            .where(params)
            .getResultList();
        await em.close()
        return r;
    }
}