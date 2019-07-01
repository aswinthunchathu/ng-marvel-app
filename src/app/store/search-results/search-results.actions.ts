import { createAction, props } from '@ngrx/store'

import { CharacterModel } from '../../model/character.model'
import { ACTION_TAGS } from '../../constants'
import { ComicModel } from 'src/app/model/comic.model'
import { SeriesModel } from 'src/app/model/series.model'

const TAG = ACTION_TAGS.search

export const setSearchKey = createAction(`${TAG} Set Key`, props<{ payload: string }>())

const TAG_CHARACTERS = ACTION_TAGS.searchCharacters

export const fetchCharactersStart = createAction(`${TAG_CHARACTERS} Fetch Start`)

export const fetchCharactersSuccess = createAction(
    `${TAG_CHARACTERS} Fetch Success`,
    props<{ payload: CharacterModel[] }>()
)

const TAG_COMICS = ACTION_TAGS.searchComics

export const fetchComicsStart = createAction(`${TAG_COMICS} Fetch Start`)

export const fetchComicsSuccess = createAction(`${TAG_COMICS} Fetch Success`, props<{ payload: ComicModel[] }>())

const TAG_SERIES = ACTION_TAGS.searchSeries

export const fetchSeriesStart = createAction(`${TAG_SERIES} Fetch Start`)

export const fetchSeriesSuccess = createAction(`${TAG_SERIES} Fetch Success`, props<{ payload: SeriesModel[] }>())
