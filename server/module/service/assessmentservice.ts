import {HttpRequest, Instance, SessionFactory} from "noomi";
import {Responesecode} from "../util/responeseCode";
import {assessment} from "../dao/entity/assessment";
import {permission} from "../dao/entity/permission";
import {User} from "../dao/entity/user";
import {Connection, getConnection, Transaction} from "relaen";
@Instance()
export class AssessmentService{
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
        if(await assessment.findOne(params)){
            throw Responesecode.Error7;
        }

        let asment:assessment=new assessment();
        asment.name=name;
        asment.note=note;
        await asment.save(true);

        let session = await SessionFactory.getSession(request);
        let user = JSON.parse(await session.get('user'));
        let res2:User=<User> await User.find(user.id);
        console.log(1234);

        let pmsion:permission=new permission();

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
}