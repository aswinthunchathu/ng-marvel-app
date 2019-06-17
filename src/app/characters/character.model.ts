import { Collections, Image } from '../shared/model/shared.interface'
import { ImageGenerator, types } from '../shared/model/image-generator.model'

export class CharacterModel {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public thumbnail: Image,
        public comics: Collections,
        public series: Collections
    ) {}

    get bgImage() {
        return new ImageGenerator(this.thumbnail.path, this.thumbnail.extension, types.default).image
    }

    get image() {
        return new ImageGenerator(this.thumbnail.path, this.thumbnail.extension, types.standard_fantastic).image
    }

    get placeholder() {
        return new ImageGenerator(this.thumbnail.path, this.thumbnail.extension, types.standard_small).image
    }

    get linkToDetails() {
        return ['/character', this.id]
    }
}
