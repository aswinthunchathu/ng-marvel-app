import { Page } from './shared.interface'

export class Pagination implements Page {
    constructor(public offset: number, public limit: number, public total: number, public count: number) {}

    get hasMore() {
        return this.offset > -1 ? this.total > this.limit + this.offset : true
    }

    get nextPage() {
        return this.offset > -1 ? this.limit + this.offset : 0
    }
}
