import {BaseEntity,Entity,Column,Id,JoinColumn,ManyToOne,OneToMany,EntityProxy} from 'relaen';
import {assessment} from './assessment';
import {risk} from './risk';
import {threaten} from './threaten';
import {vulnerability} from './vulnerability';

@Entity('t_assets')
export class assets extends BaseEntity{
	@Id()
	@Column({
		name:'id',
		type:'int',
		nullable:false
	})
	public id:number;

	@Column({
		name:'type',
		type:'string',
		nullable:false,
		length:255
	})
	public type:string;

	@Column({
		name:'name',
		type:'string',
		nullable:false,
		length:255
	})
	public name:string;

	@Column({
		name:'person',
		type:'string',
		nullable:false,
		length:255
	})
	public person:string;

	@Column({
		name:'secrety',
		type:'int',
		nullable:false
	})
	public secrety:number;

	@Column({
		name:'wholeness',
		type:'int',
		nullable:false
	})
	public wholeness:number;

	@Column({
		name:'availability',
		type:'int',
		nullable:false
	})
	public availability:number;

	@Column({
		name:'importance',
		type:'int',
		nullable:false
	})
	public importance:number;

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
		entity:'risk',
		mappedBy:'assets'
	})
	public risks:Array<risk>;

	@OneToMany({
		entity:'threaten',
		mappedBy:'assets'
	})
	public threatens:Array<threaten>;

	@OneToMany({
		entity:'vulnerability',
		mappedBy:'assets'
	})
	public vulnerabilitys:Array<vulnerability>;

	constructor(idValue?:number){
		super();
		this.id = idValue;
	}
	public async getAssessment():Promise<assessment>{
		return this['assessment']?this['assessment']:await EntityProxy.get(this,'assessment');
	}
	public async getRisks():Promise<Array<risk>>{
		return this['risks']?this['risks']:await EntityProxy.get(this,'risks');
	}
	public async getThreatens():Promise<Array<threaten>>{
		return this['threatens']?this['threatens']:await EntityProxy.get(this,'threatens');
	}
	public async getVulnerabilitys():Promise<Array<vulnerability>>{
		return this['vulnerabilitys']?this['vulnerabilitys']:await EntityProxy.get(this,'vulnerabilitys');
	}
}