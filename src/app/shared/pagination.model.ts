import { Page } from './shared.interface'

export class Pagination implements Page {
    constructor(public offset: number, public limit: number, public total: number, public count: number) {}
}
