export const PAGE_LIMIT = 20

export enum FILTER_TYPE {
    none = 'none',
    comics = 'comics',
    series = 'series',
    character = 'character',
}

export enum ACTION_TAGS {
    characters = '[CHARACTERS]',
    charactersByComicId = '[CHARACTERS BY COMIC ID]',
    charactersBySeriesId = '[CHARACTERS BY SERIES ID]',
}
