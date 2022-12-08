import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,EntityProxy} from 'relaen';
import {assets} from './assets';
import {assessment} from './assessment';

@Entity('t_risk')
export class risk extends BaseEntity{
	@Id()
	@Column({
		name:'id',
		type:'int',
		nullable:false
	})
	public id:number;

	@ManyToOne({entity:'assets'})
	@JoinColumn({
		name:'asset_id',
		refName:'id',
		nullable:false
	})
	public assets:assets;

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

	@ManyToOne({entity:'assessment'})
	@JoinColumn({
		name:'assessment_id',
		refName:'id',
		nullable:false
	})
	public assessment:assessment;

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
	public async getAssets():Promise<assets>{
		return this['assets']?this['assets']:await EntityProxy.get(this,'assets');
	}
	public async getAssessment():Promise<assessment>{
		return this['assessment']?this['assessment']:await EntityProxy.get(this,'assessment');
	}
}