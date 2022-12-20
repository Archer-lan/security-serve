import {HttpRequest, Instance, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {EntityManager, getEntityManager, Query} from "relaen";
import {User} from "../dao/entity/user";
import {permission} from "../dao/entity/permission";
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
            }
        }
        let pro=<permission> await permission.findOne(params);
        if(!pro) return false;
        else return true;
    }
    //添加操作用户
    async add(user:User,ass:Assessment){
        let pers:permission=new permission();
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
            }
        }
        let pro=<permission> await permission.findOne(params);
        if(!pro) return false;
        else return true;
    }

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
            }
        }
        let em:EntityManager=await getEntityManager();
        let query:Query=em.createQuery(permission.name);
        let r=await query.select(["*","user.id","user.username","user.create_time","assessment.*"])
            .where(params)
            .getResultList();
        await em.close();
        return r;
    }
}