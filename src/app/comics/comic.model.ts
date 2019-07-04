import { Image } from '../shared/model/shared.interface'
import { ImageGenerator } from '../shared/model/image-generator.model'

export class ComicModel {
    constructor(public id: number, public title: string, public description: string, public thumbnail: Image) {}

    get image() {
        return new ImageGenerator(this.thumbnail.path, this.thumbnail.extension)
    }

    get linkToDetails() {
        return ['/comics', this.id]
    }
}

export enum FILTER_TYPE {
    'none' = 'none',
    'byCharacterId' = 'byCharacterId',
    'bySeriesId' = 'bySeriesId',
    'byTitle' = 'byTitle',
}
