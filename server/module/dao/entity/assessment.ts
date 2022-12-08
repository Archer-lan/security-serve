import {BaseEntity,Entity,Column,Id,OneToMany,EntityProxy} from 'relaen';
import {assets} from './assets';
import {permission} from './permission';
import {risk} from './risk';
import {threaten} from './threaten';
import {vulnerability} from './vulnerability';

@Entity('t_assessment')
export class assessment extends BaseEntity{
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
	public assetss:Array<assets>;

	@OneToMany({
		entity:'permission',
		mappedBy:'assessment'
	})
	public permissions:Array<permission>;

	@OneToMany({
		entity:'risk',
		mappedBy:'assessment'
	})
	public risks:Array<risk>;

	@OneToMany({
		entity:'threaten',
		mappedBy:'assessment'
	})
	public threatens:Array<threaten>;

	@OneToMany({
		entity:'vulnerability',
		mappedBy:'assessment'
	})
	public vulnerabilitys:Array<vulnerability>;

	constructor(idValue?:number){
		super();
		this.id = idValue;
	}
	public async getAssetss():Promise<Array<assets>>{
		return this['assetss']?this['assetss']:await EntityProxy.get(this,'assetss');
	}
	public async getPermissions():Promise<Array<permission>>{
		return this['permissions']?this['permissions']:await EntityProxy.get(this,'permissions');
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