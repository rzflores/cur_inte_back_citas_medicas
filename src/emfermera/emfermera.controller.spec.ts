import { Test, TestingModule } from '@nestjs/testing';
import { EmfermeraController } from './emfermera.controller';
import { EmfermeraService } from './emfermera.service';

describe('EmfermeraController', () => {
  let controller: EmfermeraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmfermeraController],
      providers: [EmfermeraService],
    }).compile();

    controller = module.get<EmfermeraController>(EmfermeraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
