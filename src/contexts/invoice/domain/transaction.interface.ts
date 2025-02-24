export abstract class TransactionStrategy {
  abstract start(): Promise<void>;
  abstract commit(): Promise<void>;
  abstract rollback(): Promise<void>;
}
