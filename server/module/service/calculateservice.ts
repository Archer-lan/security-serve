import {HttpRequest, Inject, Instance, SessionFactory} from "noomi";
import {VulnerableService} from "./vulnerableservice";
import {Responesecode} from "../util/responeseCode";
import {Assets} from "../dao/entity/assets";
import {Assessment} from "../dao/entity/assessment";
import {Risk} from "../dao/entity/risk";
import {PermissionService} from "./permissionservice";
import {EntityManager, getEntityManager, Query} from "relaen";
import {Vulnerability} from "../dao/entity/vulnerability";


@Instance()
export class CalculateService{
    @Inject(VulnerableService)
    vulnerableService:VulnerableService;
    @Inject(PermissionService)
    permissionService:PermissionService;
    async getResult(request: HttpRequest, proid: any) {
        if(!await this.permissionService.isPermitted(request,proid)) throw Responesecode.Error8;
        let vul=await this.vulnerableService.queryAll(request,proid);
        if(!vul){
            throw Responesecode.Error13;
        }
        let res=[];
        //可能性矩阵
        let pos=new Array();
        pos.push([2,4,7,11,14]);
        pos.push([3,6,10,13,17]);
        pos.push([5,9,12,16,20]);
        pos.push([7,11,14,18,22]);
        pos.push([8,12,17,20,25]);
        //可能性等级划分
        let poslevel=new Array();
        poslevel.push(1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5);

        //损失矩阵
        let lo=new Array();
        lo.push([2,4,6,10,13]);
        lo.push([3,5,9,12,16]);
        lo.push([4,7,11,15,20]);
        lo.push([5,8,14,19,22]);
        lo.push([6,10,16,21,25]);
        //损失等级划分
        let lolevel=new Array();
        lolevel.push(1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5);

        //风险矩阵
        let r=new Array();
        r.push([3,6,9,12,16]);
        r.push([5,8,11,15,18]);
        r.push([6,9,13,17,21]);
        r.push([7,11,16,20,23]);
        r.push([9,14,20,23,25]);
        //风险等级划分
        let rlevel=new Array();
        rlevel.push(1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,5,5);

        let grade;
        let gradeLevel;
        let possible;
        let loss;
        for(let i=0;i<vul.length;i++){
            let params1={
                "id":{
                    value:vul[i].assets.id,
                    rel:'='
                },
                "status":{
                    value:0,
                    rel:'='
                }
            }
            let asset:Assets=<Assets> await Assets.findOne(params1);
            if(!asset) throw Responesecode.Error11;
            let params2={
                "id":{
                    value:vul[i].assessment.id,
                    rel:'='
                },
                "status":{
                    value:0,
                    rel:'='
                }
            }
            let assessment:Assessment=<Assessment> await Assessment.findOne(params2);
            if(!assessment) throw Responesecode.Error10;
            possible=poslevel[pos[vul[i].threaten.value-1][vul[i].value-1]];
            loss=lolevel[lo[vul[i].assets.importance-1][vul[i].value-1]];
            grade=r[loss-1][possible-1];
            gradeLevel=rlevel[grade];

            let risk:Object={
                vul:vul[i],
                // assets:asset,
                // assessments:assessment,
                los:loss,
                possibility:possible,
                risk:grade,
                grade:gradeLevel,
                status:0,
            }
            res.push(risk);
            //存储到数据库
            // let risk:Risk=new Risk();
            // risk.assets=asset;
            // risk.assessment=assessment;
            // risk.loss=loss;
            // risk.possibility=possible;
            // risk.risk=grade;
            // risk.grade=gradeLevel;
            // risk.status=0;
            // await risk.save(true);
        }
        return res;
        // return await this.queryAll(request,proid);
    }
    //查找当前评估对象所有结果值
    // async queryAll(request: HttpRequest, proid: any){
    //     let params={
    //         "assessment.id":{
    //             value:proid,
    //             rel:"="
    //         },
    //         "status":{
    //             value:0,
    //             rel:"="
    //         }
    //     }
    //     let em:EntityManager=await getEntityManager();
    //     let query:Query=em.createQuery(Risk.name);
    //     let r=await query.select(["*","assets.*","assessment.*",])
    //         .where(params)
    //         .getResultList();
    //     await em.close()
    //     return r;
    // }
    //删除计算结果值
    // async delete(request: HttpRequest, proid: any, id) {
    //     if(!await this.permissionService.isPermitted(request,proid)) throw Responesecode.Error8;
    //     let params={
    //         "id":{
    //             value:id,
    //             rel:"="
    //         },
    //         "assessment.id":{
    //             value:proid,
    //             rel:'='
    //         },
    //         "status":{
    //             value:0,
    //             rel:'='
    //         }
    //     }
    //     let risk:Risk=<Risk> await Risk.findOne(params);
    //     if(!risk) throw Responesecode.Error14;
    //     risk.status=1;
    //     await risk.save(true);
    //     return Responesecode.DONE5
    // }
}