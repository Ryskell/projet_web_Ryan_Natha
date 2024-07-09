import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { User } from '../../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const username = 'John';
    const email = 'john@example.com';
    const user: User = { id: '1', username, email, createdAt: new Date() };

    userRepository.createUser.mockResolvedValue(user);

    const result = await service.createUser(username, email);
    expect(result).toEqual(user);
    expect(userRepository.createUser).toHaveBeenCalledWith(username, email);
  });

  it('should find user by id', async () => {
    const user: User = { id: '1', username: 'John', email: 'john@example.com', createdAt: new Date() };

    userRepository.findUserById.mockResolvedValue(user);

    const result = await service.findUserById('1');
    expect(result).toEqual(user);
    expect(userRepository.findUserById).toHaveBeenCalledWith('1');
  });
});
