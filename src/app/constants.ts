export const PAGE_LIMIT = 20
export const SEARCH_PAGE_LIMIT = 7

export enum ACTION_TAGS {
    characters = '[CHARACTERS]',
    character = '[CHARACTER]',
    charactersByComicId = '[CHARACTERS BY COMIC ID]',
    charactersBySeriesId = '[CHARACTERS BY SERIES ID]',
    charactersByName = '[CHARACTERS BY NAME]',

    comics = '[COMICS]',
    comic = '[COMIC]',
    comicsByCharacterId = '[COMICS BY CHARACTER ID]',
    comicsBySeriesId = '[COMICS BY SERIES ID]',
    comicsByName = '[COMICS BY NAME]',

    series = '[SERIES]',
    seriesDetails = '[SERIES DETAILS]',
    seriesByCharacterId = '[SERIES BY CHARACTER ID]',
    seriesByName = '[SERIES BY NAME]',
}

export enum ROUTE_PATHS {
    search = 'search',
    characters = 'characters',
    comics = 'comics',
    series = 'series',
}
