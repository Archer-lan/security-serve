import {HttpRequest, Inject, Instance, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {EntityManager, getEntityManager, Query} from "relaen";
import {PermissionService} from "./permissionservice";
import {Assets} from "../dao/entity/assets";
import {release} from "os";
import {Assessment} from "../dao/entity/assessment";
import {Vulnerability} from "../dao/entity/vulnerability";
import {Threaten} from "../dao/entity/threaten";
import * as fs from "fs";
import * as path from "path"
import * as util from "util"

@Instance()
export class AssetsService{
    @Inject(PermissionService)
    permissionService:PermissionService;
    //添加资产
    async add(request: HttpRequest, type, name, person: string, secrety: number, wholeness: number, availability: number, importance: number, note, proid: any) {
        let ass:Assessment=<Assessment> await Assessment.find(proid);
        if(!ass){
            throw Responesecode.Error10
        }
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let assets:Assets=new Assets();
        assets.type=type;
        assets.name=name;
        assets.person=person;
        assets.secrety=secrety;
        assets.wholeness=wholeness;
        assets.availability=availability;
        assets.importance=importance;
        assets.note=note;
        assets.assessment=ass;
        assets.status=0;
        await assets.save(true);
        return Responesecode.DONE6;
    }
    //修改资产
    async alter(request: HttpRequest, type, name, person, secrety, wholeness, availability, importance, note, proid: any) {
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params={
            "name":{
                value:name,
                rel:'='
            },
            "assessment.id":{
                value:proid,
                rel:"="
            },
            "status":{
                value:0,
                rel:'='
            }
        }
        let assets:Assets=<Assets> await Assets.findOne(params);
        if(!assets){
            throw Responesecode.Error11;
        }
        if(type){
            assets.type=type;
        }
        if(person){
            assets.person=person;
        }
        if(secrety){
            assets.secrety=secrety;
        }
        if(wholeness){
            assets.wholeness=wholeness;
        }
        if(availability){
            assets.availability=availability;
        }
        if(importance){
            assets.importance=importance;
        }
        if(note){
            assets.note=note;
        }
        await assets.save(true);
        return Responesecode.DONE7;
    }
    //删除对应资产条目
    async delete(request: HttpRequest, id, proid: any) {
        let res=await this.permissionService.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params={
            "id":{
                value:id,
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
        let assets:Assets=<Assets> await Assets.findOne(params);
        if(!assets){
            throw Responesecode.Error11;
        }
        let params2={
            "assets.id":{
                value:id,
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
        let threaten:Threaten=<Threaten> await Threaten.findOne(params2);
        if(threaten){
            throw Responesecode.Error16;
        }
        assets.status=1;
        await assets.save(true);
        return Responesecode.DONE5;
    }
    //查询评估对象对应的所有资产
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
                rel:'='
            },
        }
        let em:EntityManager = await getEntityManager();
        let query:Query = em.createQuery(Assets.name);
        let r = await query.select(["*","assessment.*"])
            .where(params)
            .getResultList();
        await em.close();
        return r;
    }
    async Upload(request: HttpRequest, file,proid) {
        let param={
            "id":{
                value:proid,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            }
        }
        let ass:Assessment=<Assessment> await Assessment.findOne(param);
        if(!ass){
            throw Responesecode.Error10
        }
        let filepath=path.resolve(file.path);
        let data=fs.readFileSync(filepath,"utf-8");
        console.log(data);
        let res=[];
        let line=data.split("\r\n");
        for(let i=1;i<line.length;i++){
            res.push(line[i].split(","));
        }
        console.log(res);
        for(let i=0;i<res.length;i++){
            let asset:Assets=new Assets();
            asset.type=res[i][0];
            asset.name=res[i][1];
            asset.person=res[i][2];
            asset.secrety=res[i][3];
            asset.wholeness=res[i][4];
            asset.availability=res[i][5];
            asset.importance=res[i][6];
            asset.note=res[i][7];
            asset.assessment=ass;
            asset.status=0;
            await asset.save(true);
        }
        return Responesecode.DONE9;
    }
}