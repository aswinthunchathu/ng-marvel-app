import { Collections, Image } from '../shared/model/shared.interface'
import { ImageGenerator, types } from '../shared/model/image-generator.model'

export class SeriesModel {
    constructor(public id: number, public title: string, public description: string, public thumbnail: Image) {}

    get image() {
        return new ImageGenerator(this.thumbnail.path, this.thumbnail.extension, types.portrait_incredible).image
    }

    get placeholder() {
        return new ImageGenerator(this.thumbnail.path, this.thumbnail.extension, types.portrait_small).image
    }

    get linkToDetails() {
        return ['/series', this.id]
    }
}
