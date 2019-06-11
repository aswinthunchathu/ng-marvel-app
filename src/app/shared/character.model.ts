import { Image } from './image.interface'

export class Character {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public thumbnail: Image // public comics: string,
    ) // public series: string
    {}
}
