import { Test, TestingModule } from '@nestjs/testing';
import { ReservacionController } from './reservacion.controller';
import { ReservacionService } from './reservacion.service';

describe('ReservacionController', () => {
  let controller: ReservacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservacionController],
      providers: [ReservacionService],
    }).compile();

    controller = module.get<ReservacionController>(ReservacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
