import { Character } from './character.model'

export class Comic {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public thumbnail: string,
        public characters: {
            items: Character[]
        },
        public series: string
    ) {}
}
