import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from "./user.schema";
import { UserInput } from './user.dto';



@Injectable()
export class UserService {
	constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

	async findOneById(id: string): Promise<User | null | undefined> {
		const user = await this.userModel.findById(id).exec();
		return user;
	}

	async findOneByUsername(username: string): Promise<User | null | undefined> {
		return await this.userModel.findOne({ username }).exec();
	}

	async findOneByEmail(email: string): Promise<User | null | undefined> {
		return await this.userModel.findOne({ email }).exec();
	}

	async checkExists(checkEmail: string): Promise<Boolean> {
        const user = await this.userModel.findOne({ email: checkEmail }).exec();
        return !!user;
    }
	

	async findAll(): Promise<User[]> {
		return await this.userModel.find().exec();
	}

	async create(data: UserInput): Promise<boolean> {
		const newUser = new this.userModel(data);
		await newUser.save();
		return true;
	}

	async remove(id: string): Promise<Boolean> {
		const result = await this.userModel.findByIdAndDelete(id).exec();
		return result !== null;
	}

	async signIn(username: string, password: string): Promise<Boolean | User> {
		return false;
	}

	async addConvToUsers(userIds: string[], convId: string): Promise<Boolean> {
		try {
			await this.userModel.updateMany(
				{_id: { $in: userIds}},
				{ $addToSet: {conversationsIds: convId}}
			).exec();
			return true;
		} catch (e) {
			throw Error(e);
		}

	}


	async update(user: User): Promise<User | null> {
		const newUser = new this.userModel(user);
		
		user.updateOne();
		user.save();
		if (!user) {
			return null;
		}
		return newUser;
	}
}