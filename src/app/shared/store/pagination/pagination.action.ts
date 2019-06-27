import { createAction, props } from '@ngrx/store'

import { Pagination } from '../../../model/pagination.model'

export const setPagination = (tag: string) => createAction(`${tag} Set Pagination`, props<{ payload: Pagination }>())

export const resetPagination = (tag: string) => createAction(`${tag} Reset Pagination`)
