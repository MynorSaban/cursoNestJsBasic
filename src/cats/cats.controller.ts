import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Role } from 'src/common/enums/rol.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { UserActivateInterface } from 'src/interfaces/user-activate.interface';

@Auth(Role.USER)
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll(@ActiveUser() user: UserActivateInterface) {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {  // id: number su en caso le enviamos un string, entonces con lo que hicimos en un inicio este lo transforma en numerico
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.remove(+id);
  }
}
