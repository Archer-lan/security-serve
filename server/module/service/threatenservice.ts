import {HttpRequest, Inject, Instance, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {PermissionService} from "./permissionservice";
import {Assets} from "../dao/entity/assets";
import {Assessment} from "../dao/entity/assessment";
import {Threaten} from "../dao/entity/threaten";
import {EntityManager, getEntityManager, Query} from "relaen";
import {Vulnerability} from "../dao/entity/vulnerability";

@Instance()
export class ThreatenService{
    @Inject(PermissionService)
    permissionService:PermissionService;
    //添加威胁
    async add(request: HttpRequest, assetsid: number, type:string, value, note:string, proid: number) {
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
            "assessment.id":{
                value:proid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            },
            "id":{
                value:assetsid,
                rel:'='
            }
        }
        let assets:Assets=<Assets> await Assets.findOne(params2);
        if(!assets){
            throw Responesecode.Error11;
        }
        let threaten:Threaten=new Threaten();
        threaten.assets=assets;
        threaten.type=type;
        threaten.value=value;
        threaten.note=note;
        threaten.assessment=ass;
        threaten.status=0;
        await threaten.save(true);
        return Responesecode.DONE6;
    }
    //修改威胁
    async alter(request: HttpRequest, threatenid: number, type, value, note,proid:number) {
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params1={
            "id":{
                value:threatenid,
                rel:'='
            },
            "assessment.id":{
                value:proid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            },
        }
        let threaten:Threaten=<Threaten> await Threaten.findOne(params1);
        if(!threaten) throw Responesecode.Error12;
        if(type){
            threaten.type=type;
        }
        if(value){
            threaten.value=value;
        }
        if(note){
            threaten.note=note;
        }
        await threaten.save(true);
        return Responesecode.DONE7;
    }
    //删除威胁
    async delete(request: HttpRequest, threatenid: any, proid: any) {
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params1={
            "id":{
                value:threatenid,
                rel:'='
            },
            "assessment.id":{
                value:proid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            },
        }
        let threaten:Threaten=<Threaten> await Threaten.findOne(params1);
        if(!threaten) throw Responesecode.Error12;
        let params2={
            "threaten.id":{
                value:threatenid,
                rel:'='
            },
            "assessment.id":{
                value:proid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            }
        }
        let vul:Vulnerability=<Vulnerability> await Vulnerability.findOne(params2);
        if(vul){
            throw Responesecode.Error15;
        }
        threaten.status=1;
        await threaten.save(true);
        return Responesecode.DONE5;
    }
    //查找所有威胁
    async queryAll(request: HttpRequest, proid: any) {
        let res=await this.permissionService.isPermitted(request,proid);
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
                rel:"="
            }
        }
        let em:EntityManager=await getEntityManager();
        let query:Query=em.createQuery(Threaten.name);
        let r=await query.select(["*","assets.*","assessment.*"])
            .where(params)
            .getResultList();
        await em.close();
        return r;
    }
}