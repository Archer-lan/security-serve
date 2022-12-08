import {HttpRequest, Instance, SessionFactory} from "noomi";
import {User} from "../dao/entity/user";
import {Responesecode} from "../util/responeseCode";
import {encryp} from "../util/encryp";
import {isManager} from "../filter/managerfilter";
import {EntityManager, getEntityManager, Query} from "relaen";
@Instance()
export class ManagerService{
    //删除用户
    async deleteUser(request:HttpRequest,id:number){
        if(!isManager(request)){
            throw Responesecode.Error6;
        }
        let user_status:User=<User> await User.find(id);
        user_status.status=3;
        await user_status.save(true);
        return Responesecode.DONE5;
    }
    //修改用户密码
    async alterUser(request:HttpRequest,id:number,password:string){
        if(!isManager(request)){
            throw Responesecode.Error6;
        }
        let user_status:User=<User> await User.find(id);
        user_status.password=encryp(password);
        await user_status.save(true);
        return Responesecode.DONE5;
    }
    //查询所有用户
    async queryAllUser(request:HttpRequest){
        if(!isManager(request)){
            throw Responesecode.Error6;
        }
        let params={
            "status":{
                value:3,
                rel:"!="
            }
        }
        let em:EntityManager=await getEntityManager();
        let query:Query=em.createQuery(User.name);
        let results=await query.select(["id","username","createTime","registerTime"])
            .where(params)
            .getResultList();
        await em.close();
        return results;
    }
}