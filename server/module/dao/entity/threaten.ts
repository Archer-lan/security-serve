import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,OneToMany,EntityProxy} from 'relaen';
import {assets} from './assets';
import {assessment} from './assessment';
import {vulnerability} from './vulnerability';

@Entity('t_threaten')
export class threaten extends BaseEntity{
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

	@ManyToOne({entity:'assessment'})
	@JoinColumn({
		name:'assessment_id',
		refName:'id',
		nullable:false
	})
	public assessment:assessment;

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
	public vulnerabilitys:Array<vulnerability>;

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
	public async getVulnerabilitys():Promise<Array<vulnerability>>{
		return this['vulnerabilitys']?this['vulnerabilitys']:await EntityProxy.get(this,'vulnerabilitys');
	}
}