import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,EntityProxy} from 'relaen';
import {Assets} from './assets';
import {Assessment} from './assessment';

@Entity('t_risk')
export class Risk extends BaseEntity{
	@Id()
	@Column({
		name:'id',
		type:'int',
		nullable:false
	})
	public id:number;

	@ManyToOne({entity:'Assets'})
	@JoinColumn({
		name:'asset_id',
		refName:'id',
		nullable:false
	})
	public assets:Assets;

	@Column({
		name:'possibility',
		type:'int',
		nullable:false
	})
	public possibility:number;

	@Column({
		name:'loss',
		type:'int',
		nullable:false
	})
	public loss:number;

	@Column({
		name:'risk',
		type:'int',
		nullable:false
	})
	public risk:number;

	@ManyToOne({entity:'Assessment'})
	@JoinColumn({
		name:'assessment_id',
		refName:'id',
		nullable:false
	})
	public assessment:Assessment;

	@Column({
		name:'grade',
		type:'int',
		nullable:false
	})
	public grade:number;

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
	public async getAssets():Promise<Assets>{
		return this['assets']?this['assets']:await EntityProxy.get(this,'assets');
	}
	public async getAssessment():Promise<Assessment>{
		return this['assessment']?this['assessment']:await EntityProxy.get(this,'assessment');
	}
}