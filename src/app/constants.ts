export const PAGE_LIMIT = 20

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

    series = '[SERIES]',
    seriesDetails = '[SERIES DETAILS]',
    seriesByCharacterId = '[SERIES BY CHARACTER ID]',
}
