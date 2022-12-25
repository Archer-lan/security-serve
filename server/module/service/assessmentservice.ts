import {HttpRequest, Inject, Instance, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {Assessment} from "../dao/entity/assessment";
import {Permission} from "../dao/entity/permission";
import {User} from "../dao/entity/user";
import {Connection, getConnection, Transaction} from "relaen";
import {PermissionService} from "./permissionservice";
import {ManagerService} from "./managerservice";
@Instance()
export class AssessmentService{
    @Inject(PermissionService)
    permissionService:PermissionService;
    @Inject(ManagerService)
    managerService:ManagerService;
    //添加
    async add(request:HttpRequest,name:string,note:string){
        //创建连接
        let conn:Connection=await getConnection();
        //创建事务
        let tx:Transaction=conn.createTransaction();
        //开始事务
        await tx.begin();

        let params={
            "name":{
                value:name,
                rel:'='
            }
        }
        if(await Assessment.findOne(params)){
            throw Responesecode.Error7;
        }

        let asment:Assessment=new Assessment();
        asment.name=name;
        asment.note=note;
        await asment.save(true);

        let session = await SessionFactory.getSession(request);
        let user = JSON.parse(await session.get('user'));
        let res2:User=<User> await User.find(user.id);

        let pmsion:Permission=new Permission();

        pmsion.assessment=asment;
        pmsion.user=res2;
        pmsion.level=3;
        await pmsion.save(true);

        //结束事务
        await tx.commit();
        //关闭链接
        await conn.close();
        return Responesecode.DONE6;
    }
    //删除
    async delete(request: HttpRequest, name) {
        let params={
            "name":{
                value:name,
                rel:'='
            }
        }
        let ass=<Assessment> await Assessment.findOne(params);
        if(!ass){
            throw Responesecode.Error8;
        }
        let isCreator=await this.permissionService.isCreator(request,ass.id);
        if(!isCreator){
            throw Responesecode.Error8;
        }
        ass.status=1;
        await ass.save(true);
    }
    //修改
    async alter(request: HttpRequest,proid:string,name:string,note:string){
        let params={
            "id":{
                value:proid,
                rel:'='
            }
        }
        let ass=<Assessment> await Assessment.findOne(params);
        if(!ass){
            throw Responesecode.Error8;
        }
        let isCreator=await this.permissionService.isCreator(request,ass.id);
        if(!isCreator){
            throw Responesecode.Error8;
        }
        ass.name=name;
        ass.note=note;
        await ass.save(true);
        return Responesecode.DONE7
    }
    //添加成员
    async addMembers(request: HttpRequest,name:string,username:string){
        let params={
            "name":{
                value:name,
                rel:'='
            },
            "status":{
                value:0,
                rel:'='
            }
        }
        let ass:Assessment=<Assessment> await Assessment.findOne(params);
        if(!ass){
            throw Responesecode.Error8;
        }
        let isCreator=await this.permissionService.isCreator(request,ass.id);
        if(!isCreator){
            throw Responesecode.Error8;
        }
        let user:User=<User> await this.managerService.queryUserByName(username);
        if(!user){
            throw Responesecode.Error9;
        }
        let res=await this.permissionService.add(user,ass);
        return Responesecode.DONE6;
    }
}