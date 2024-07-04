import { Provider } from '@nestjs/common';
import { MemoryStoreService } from './memory-store.service';

export const memoryStoreProvider: Provider = {
  provide: MemoryStoreService,
  useFactory: () => {
    return MemoryStoreService.getInstance();
  },
};
