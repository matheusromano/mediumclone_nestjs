import { Controller, Get } from "@nestjs/common";
import { TagService } from "./tag.service";


// 'tags' means the name of the route
@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}
    @Get()
    findAll(): string[] {
        return this.tagService.findAll();
    }
}