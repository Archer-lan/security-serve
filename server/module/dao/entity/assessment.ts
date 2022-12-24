import {BaseEntity,Entity,Column,Id,OneToMany,EntityProxy} from 'relaen';
import {Assets} from './assets';
import {Permission} from './permission';
import {Risk} from './risk';
import {Threaten} from './threaten';
import {Vulnerability} from './vulnerability';

@Entity('t_assessment')
export class Assessment extends BaseEntity{
	@Id()
	@Column({
		name:'id',
		type:'int',
		nullable:false
	})
	public id:number;

	@Column({
		name:'name',
		type:'string',
		nullable:false,
		length:255
	})
	public name:string;

	@Column({
		name:'note',
		type:'string',
		nullable:true,
		length:255
	})
	public note:string;

	@Column({
		name:'status',
		type:'int',
		nullable:false
	})
	public status:number;

	@OneToMany({
		entity:'assets',
		mappedBy:'assessment'
	})
	public assetss:Array<Assets>;

	@OneToMany({
		entity:'permission',
		mappedBy:'assessment'
	})
	public permissions:Array<Permission>;

	@OneToMany({
		entity:'risk',
		mappedBy:'assessment'
	})
	public risks:Array<Risk>;

	@OneToMany({
		entity:'threaten',
		mappedBy:'assessment'
	})
	public threatens:Array<Threaten>;

	@OneToMany({
		entity:'vulnerability',
		mappedBy:'assessment'
	})
	public vulnerabilitys:Array<Vulnerability>;

	constructor(idValue?:number){
		super();
		this.id = idValue;
	}
	public async getAssetss():Promise<Array<Assets>>{
		return this['assetss']?this['assetss']:await EntityProxy.get(this,'assetss');
	}
	public async getPermissions():Promise<Array<Permission>>{
		return this['permissions']?this['permissions']:await EntityProxy.get(this,'permissions');
	}
	public async getRisks():Promise<Array<Risk>>{
		return this['risks']?this['risks']:await EntityProxy.get(this,'risks');
	}
	public async getThreatens():Promise<Array<Threaten>>{
		return this['threatens']?this['threatens']:await EntityProxy.get(this,'threatens');
	}
	public async getVulnerabilitys():Promise<Array<Vulnerability>>{
		return this['vulnerabilitys']?this['vulnerabilitys']:await EntityProxy.get(this,'vulnerabilitys');
	}
}