export interface Image {
    path: string
    extension: string
}

export interface Collections {
    available: number
    collectionURI: string
}

export interface Page {
    offset: number
    limit: number
    total: number
    count: number
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
