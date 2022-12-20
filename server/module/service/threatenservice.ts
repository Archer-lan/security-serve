import {HttpRequest, Inject, Instance, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {PermissionService} from "./permissionservice";
import {Assets} from "../dao/entity/assets";
import {Assessment} from "../dao/entity/assessment";
import {Threaten} from "../dao/entity/threaten";
import {EntityManager, getEntityManager, Query} from "relaen";

@Instance()
export class ThreatenService{
    @Inject(PermissionService)
    permissionService:PermissionService;
    //添加威胁
    async add(request: HttpRequest, assetsid: number, type:string, value, note:string, proid: number) {
        let ass:Assessment=<Assessment> await Assessment.find(proid);
        if(!ass){
            throw Responesecode.Error10
        }
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let assets:Assets=<Assets> await Assets.find(assetsid);
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
        let threaten:Threaten=<Threaten> await Threaten.find(threatenid);
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
        let threaten:Threaten=<Threaten> await Threaten.find(threatenid);
        if(!threaten) throw Responesecode.Error12;
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