import {HttpRequest, Instance, SessionFactory} from "noomi";
import {User} from "../dao/entity/user";
import {Responesecode} from "../util/responeseCode";
import {EntityManager, getEntityManager, Query} from "relaen";
import {encryp} from "../util/encryp";
import {getNowDate} from "../util/getDate";
@Instance()
export class UserService{
    //登陆
    async login(account:string,password:string){
        let user:User=new User();
        let params={
            "username":{
                value:account,
            },
        };
        user= <User> await User.findOne(params);
        if(!user||user.status===3){
            throw Responesecode.Error3;
        }
        if(user.password===encryp(password)){
            return user;
        }else{
            throw Responesecode.Error3;
        }
    }
    //注册
    async register(account:string,password1:string,password2:string){
        let user:User=new User();
        let params={
            "username":{
                value:account,
            }
        }
        if(await User.findOne(params)){
            throw Responesecode.Error2;
        }
        if(password1!==password2){
            throw Responesecode.Error4;
        }
        user.username=account;
        user.password=encryp(password1);
        user.createTime=getNowDate();
        user.registerTime=getNowDate();
        user.status=0;
        await user.save(true);
        return Responesecode.DONE1;
    }
    //修改密码
    async alterPwd(request:HttpRequest,curpwd:string,password1:string,password2:string){
        let session = await SessionFactory.getSession(request);
        let user = JSON.parse(await session.get('user'));
        // console.log(user);
        let params={
            "username":{
                value:user.username,
            }
        }
        if(encryp(curpwd)!==user.password||password1!==password2){
            throw Responesecode.Error4;
        }
        let users:User=<User> await User.findOne(params);
        users.password=encryp(password1);
        await users.save(true)
        return Responesecode.DONE3;
    }
}