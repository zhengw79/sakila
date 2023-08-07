import { Controller, Get, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('view-all')
  findAll(@Req() request: Request): string {
    return 'This actuon returns all cats.'
  }

  @Get(':id')
  findOne(@Param() params: any): string { 
    return `This action returns a #${params.id} cat.`;
  }
}
