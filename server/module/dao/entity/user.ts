import {BaseEntity,Entity,Column,Id,OneToMany,EntityProxy} from 'relaen';
import {Permission} from './permission';

@Entity('t_user')
export class User extends BaseEntity{
	@Id()
	@Column({
		name:'id',
		type:'int',
		nullable:false
	})
	public id:number;

	@Column({
		name:'username',
		type:'string',
		nullable:false,
		length:255
	})
	public username:string;

	@Column({
		name:'password',
		type:'string',
		nullable:false,
		length:255
	})
	public password:string;

	@Column({
		name:'create_time',
		type:'date',
		nullable:false
	})
	public createTime:string;

	@Column({
		name:'register_time',
		type:'date',
		nullable:false
	})
	public registerTime:string;

	@Column({
		name:'status',
		type:'int',
		nullable:false
	})
	public status:number;

	@OneToMany({
		entity:'permission',
		mappedBy:'user'
	})
	public permissions:Array<Permission>;

	constructor(idValue?:number){
		super();
		this.id = idValue;
	}
	public async getPermissions():Promise<Array<Permission>>{
		return this['permissions']?this['permissions']:await EntityProxy.get(this,'permissions');
	}
}