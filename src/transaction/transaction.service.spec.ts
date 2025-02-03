import { Test, TestingModule } from '@nestjs/testing'
import { TransactionService } from './transaction.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Transaction } from './entities/transaction.entity'
import { Repository } from 'typeorm'
import { TransactionType } from './enum/transaction-type.enum'
import { TransactionSubType } from './enum/transaction-subtype.enum'
import { TransactionStatus } from './enum/transaction-status.enum'
import { RoleService } from '../role/role.service'
import { UserService } from '../user/user.service'
import { User } from '../user/entities/user.entity'

describe('TransactionService', () => {
  let service: TransactionService
  let repository: Repository<Transaction>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let roleService: RoleService
  let userService: UserService
  let adminUser: User

  const mockTransaction = {
    id: 1,
    type: TransactionType.deposit,
    subType: TransactionSubType.reward,
    amount: 100,
    status: TransactionStatus.success,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: {
            create: jest.fn().mockReturnValue(mockTransaction),
            save: jest.fn().mockResolvedValue(mockTransaction),
            find: jest.fn().mockResolvedValue([mockTransaction]),
            findOne: jest.fn().mockResolvedValue(mockTransaction)
          }
        },
        {
          provide: RoleService,
          useValue: {
            checkAccessFor: jest.fn().mockResolvedValue(true)
          }
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              id: 1,
              email: 'admin@test.com',
              firstName: 'Admin',
              lastName: 'User',
              roles: [
                {
                  id: 1,
                  name: 'admin',
                  permissions: []
                }
              ],
              createdAt: new Date(),
              updatedAt: new Date()
            })
          }
        }
      ]
    }).compile()

    service = module.get<TransactionService>(TransactionService)
    repository = module.get<Repository<Transaction>>(
      getRepositoryToken(Transaction)
    )
    roleService = module.get<RoleService>(RoleService)
    userService = module.get<UserService>(UserService)

    // Fetch admin user from database
    adminUser = await userService.findById(1)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    it('should create a transaction', async () => {
      const createDto = {
        type: TransactionType.deposit,
        subType: TransactionSubType.reward,
        amount: 100,
        status: TransactionStatus.pending,
        userId: 1,
        description: 'Test transaction'
      }

      const result = await service.create(adminUser.id, createDto)
      expect(result).toEqual(mockTransaction)
      expect(repository.save).toHaveBeenCalledWith(createDto)
    })
  })

  describe('findAll', () => {
    it('should return an array of transactions', async () => {
      const result = await service.findAll(adminUser.id)
      expect(result).toEqual([mockTransaction])
      expect(repository.find).toHaveBeenCalled()
    })
  })

  describe('findAllForUser', () => {
    it('should return transactions for specific user', async () => {
      const targetUserId = 2
      const result = await service.findAllForUser(adminUser.id, targetUserId)
      expect(result).toEqual([mockTransaction])
      expect(repository.find).toHaveBeenCalledWith({
        where: { userId: targetUserId }
      })
    })
  })
})
