import { ResponseStatusEnum } from "../enum/response-status.enum";
import { PaginDto } from "./paging.dto";

export class ResponseEntityDto<T> {
  status: ResponseStatusEnum;
  data: T;
}

export class PagedResponseDto<T> extends ResponseEntityDto<T> {
  paging: PaginDto;
}