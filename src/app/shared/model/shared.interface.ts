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

export interface Character {
    id: number
    name: string
    description: string
    thumbnail: Image
    comics: Collections
    series: Collections
}

export interface CharacterResults {
    data: {
        offset: number
        limit: number
        total: number
        count: number
        results: Character[]
    }
}

export interface Comic {
    id: number
    title: string
    description: string
    thumbnail: Image
    characters: Collections
    series: Collections
    prices: Price[]
}

export interface ComicsResults {
    data: {
        offset: number
        limit: number
        total: number
        count: number
        results: Comic[]
    }
}
export interface Series {
    id: number
    title: string
    description: string
    thumbnail: Image
    characters: Collections
    comics: Collections
    prices: Price[]
}

export interface SeriesResults {
    data: {
        offset: number
        limit: number
        total: number
        count: number
        results: Series[]
    }
}
