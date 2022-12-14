import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,EntityProxy} from 'relaen';
import {User} from './user';
import {Assessment} from './assessment';

@Entity('t_permission')
export class Permission extends BaseEntity{
	@Id()
	@Column({
		name:'id',
		type:'int',
		nullable:false
	})
	public id:number;

	@ManyToOne({entity:'User'})
	@JoinColumn({
		name:'user_id',
		refName:'id',
		nullable:false
	})
	public user:User;

	@Column({
		name:'level',
		type:'int',
		nullable:false
	})
	public level:number;

	@ManyToOne({entity:'Assessment'})
	@JoinColumn({
		name:'assessment_id',
		refName:'id',
		nullable:false
	})
	public assessment:Assessment;

	@Column({
		name:'status',
		type:'int',
		nullable:false
	})
	public status:number;

	constructor(idValue?:number){
		super();
		this.id = idValue;
	}
	public async getUser():Promise<User>{
		return this['user']?this['user']:await EntityProxy.get(this,'user');
	}
	public async getAssessment():Promise<Assessment>{
		return this['assessment']?this['assessment']:await EntityProxy.get(this,'assessment');
	}

}