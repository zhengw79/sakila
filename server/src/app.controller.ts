import { Controller, Get, Inject, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER} from '@nestjs/cache-manager';
import { Observable, combineLatest, concat, map, of, reduce, take, timer } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Get()
  async getHello(): Promise<string> {
    await this.cacheManager.set('key', 'hello', 0);
    return this.appService.getHello();
  }

  @Get('view-all')
  async findAll(@Req() request: Request): Promise<string> {
    const value = await this.cacheManager.get('key');
    return `This actuon returns all cats. value = ${value}`;
  }

  @Get('combine')
	combineLatest(): Observable<string> {
		const timeOne$ = timer(1000, 4000).pipe(take(5));
		const timeTwo$ = timer(2000, 4000).pipe(take(5));
		const timeThree$ = timer(3000, 4000).pipe(take(5));

		return combineLatest(timeOne$, timeTwo$, timeThree$).pipe(
			map(([timerValOne, timerValTwo, timerValThree]) => `Timer one latest: ${timerValOne}, Timer two latest: ${timerValTwo}, Timer three latest: ${timerValThree}`)
		);
	}

  @Get('concat')
  concat(): Observable<number> {
    return concat(
      of(1,2,3),
      of(4,5,6),
      of(7,8,9)
    ).pipe(map(val => val * 2));
  }

  @Get('reduce')
  reduce(): Observable<string> {
    return of(1,2,3,4).pipe(
      reduce((acc, val) => acc + val),
      map(val => `result is ${val}`)
    );
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    return `This action returns a #${params.id} cat.`;
  }
}
