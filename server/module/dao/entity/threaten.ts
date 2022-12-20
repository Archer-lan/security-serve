import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,OneToMany,EntityProxy} from 'relaen';
import {Assets} from './assets';
import {Assessment} from './assessment';
import {Vulnerability} from './vulnerability';

@Entity('t_threaten')
export class Threaten extends BaseEntity{
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
		name:'type',
		type:'string',
		nullable:false,
		length:255
	})
	public type:string;

	@Column({
		name:'value',
		type:'int',
		nullable:false
	})
	public value:number;

	@Column({
		name:'note',
		type:'string',
		nullable:true,
		length:255
	})
	public note:string;

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

	@OneToMany({
		entity:'vulnerability',
		mappedBy:'threaten'
	})
	public vulnerabilitys:Array<Vulnerability>;

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
	public async getVulnerabilitys():Promise<Array<Vulnerability>>{
		return this['vulnerabilitys']?this['vulnerabilitys']:await EntityProxy.get(this,'vulnerabilitys');
	}
}