import { Test, TestingModule } from '@nestjs/testing';
import { ConsultorioController } from './consultorio.controller';
import { ConsultorioService } from './consultorio.service';

describe('ConsultorioController', () => {
  let controller: ConsultorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultorioController],
      providers: [ConsultorioService],
    }).compile();

    controller = module.get<ConsultorioController>(ConsultorioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
