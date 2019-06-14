export enum types {
    default = '',
    standard_small = '/standard_small',
    standard_fantastic = '/standard_fantastic',
    portrait_small = '/portrait_small',
    portrait_incredible = '/portrait_incredible',
}
export class ImageGenerator {
    constructor(public path: string, public extension: string, public type: types = types.default) {}

    get image() {
        return `${this.path}${this.type}.${this.extension}`
    }
}
