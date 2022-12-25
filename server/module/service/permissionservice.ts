import {HttpRequest, Instance, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {EntityManager, getEntityManager, Query} from "relaen";
import {User} from "../dao/entity/user";
import {Permission} from "../dao/entity/permission";
import {Assessment} from "../dao/entity/assessment";
import {Threaten} from "../dao/entity/threaten";
@Instance()
export class PermissionService{
    async isCreator(request: HttpRequest,id:number){
        let session = await SessionFactory.getSession(request);
        let user = JSON.parse(await session.get('user'));

        let params={
            "assessment.id":{
                value:id,
                rel:'='
            },
            "user.id":{
                value:user.id,
                rel:'='
            },
            "level":{
                value:3,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            }
        }
        let pro=<Permission> await Permission.findOne(params);
        if(!pro) return false;
        else return true;
    }
    //添加操作用户
    async add(user:User,ass:Assessment){
        let pers:Permission=new Permission();
        pers.user=user;
        pers.assessment=ass;
        pers.level=1;
        pers.status=0;
        await pers.save(true);
        return true;
    }
    //是否是用户
    async isPermitted(request: HttpRequest,id:number){
        let session = await SessionFactory.getSession(request);
        let user = JSON.parse(await session.get('user'));

        let params={
            "assessment.id":{
                value:id,
                rel:'='
            },
            "user.id":{
                value:user.id,
                rel:'='
            },
            "level":{
                value:1,
                rel:'>='
            },
            "status":{
                value:0,
                rel:'='
            }
        }
        let pro=<Permission> await Permission.findOne(params);
        if(!pro) return false;
        else return true;
    }
    //查找此用户对应所有评估对象
    async queryAll(request: HttpRequest) {
        let session = await SessionFactory.getSession(request);
        let user = JSON.parse(await session.get('user'));

        let params={
            "user.id":{
                value:user.id,
                rel:'='
            },
            "level":{
                value:1,
                rel:'>='
            },
            "assessment.status":{
                value:0,
                rel:"=",
            },
            "status":{
                value:0,
                rel:'='
            }
        }
        let em:EntityManager=await getEntityManager();
        let query:Query=em.createQuery(Permission.name);
        let r=await query.select(["*","user.id","user.username","assessment.*"])
            .where(params)
            .getResultList();
        await em.close();
        return r;
    }
    //查找此评估对象对应所有协作者
    async queryAllHelper(request: HttpRequest, proid: any) {
        let res=await this.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params={
            "assessment.id":{
                value:proid,
                rel:'='
            },
            "level":{
                value:1,
                rel:'>='
            },
            "status":{
                value:0,
                rel:'='
            },
            "assessment.status":{
                value:0,
                rel:'='
            },
        }
        let em:EntityManager=await getEntityManager();
        let query:Query=em.createQuery(Permission.name);
        let r=await query.select(["*","user.id","user.username","assessment.*"])
            .where(params)
            .getResultList();
        await em.close();
        return r;
    }
    //查看当前用户对应评估对象等级
    async queryLevel(request: HttpRequest, proid: any) {
        let session = await SessionFactory.getSession(request);
        let user = JSON.parse(await session.get('user'));

        let res=await this.isPermitted(request,proid);
        if(!res){
            throw Responesecode.Error6;
        }
        let params={
            "user.id":{
                value:user.id,
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
            "assessment.status":{
                value:0,
                rel:'='
            },
        }
        let pro=<Permission> await Permission.findOne(params);
        if(!pro) throw Responesecode.Error6;
        else return pro.level;
    }
    //删除权限信息
    async delete(request: HttpRequest, proid: any, id) {
        let res=await this.isCreator(request,proid);
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
            },
            "assessment.status":{
                value:0,
                rel:'='
            },
        }
        let pro=<Permission> await Permission.findOne(params);
        if(!pro) throw Responesecode.Error6;
        pro.status=1;
        await pro.save(true);
        return Responesecode.DONE5;
    }
}