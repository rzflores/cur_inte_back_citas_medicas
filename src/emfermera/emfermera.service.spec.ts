import { Test, TestingModule } from '@nestjs/testing';
import { EmfermeraService } from './emfermera.service';

describe('EmfermeraService', () => {
  let service: EmfermeraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmfermeraService],
    }).compile();

    service = module.get<EmfermeraService>(EmfermeraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
