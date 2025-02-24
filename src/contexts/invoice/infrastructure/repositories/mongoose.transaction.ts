import { TransactionStrategy } from '../../domain/transaction.interface';
import { Connection, ClientSession } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { MyInjectable } from '@src/shared/infrastructure/dependency-injection/my-injectable';

@MyInjectable()
export class MongooseTransaction implements TransactionStrategy {
  private session: ClientSession | null = null;

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async start(): Promise<void> {
    this.session = await this.connection.startSession();
    this.session.startTransaction();
  }

  async commit(): Promise<void> {
    if (this.session) {
      await this.session.commitTransaction();
      await this.session.endSession();
    }
  }

  async rollback(): Promise<void> {
    if (this.session) {
      await this.session.abortTransaction();
      await this.session.endSession();
    }
  }

  getSession(): ClientSession | null {
    return this.session;
  }
}
