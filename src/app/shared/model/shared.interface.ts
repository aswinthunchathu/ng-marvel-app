import { FILTER_TYPE } from 'src/app/constants'

export interface Image {
    path: string
    extension: string
}

export interface Collections {
    available: number
    collectionURI: string
}

export interface Price {
    type: string
    price: number
}

export interface Comic {
    id: number
    title: string
    description: string
    thumbnail: Image
}

export interface Series {
    id: number
    title: string
    description: string
    thumbnail: Image
}

export interface Character {
    id: number
    name: string
    description: string
    thumbnail: Image
}

export interface APIResponse<T> {
    data: {
        offset: number
        limit: number
        total: number
        count: number
        results: T[]
    }
}

export interface Filter {
    type: FILTER_TYPE.comics | FILTER_TYPE.series | FILTER_TYPE.character
    id: number
}
