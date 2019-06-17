import { HttpErrorResponse } from '@angular/common/http'

import * as fromComicActions from './comic.actions'
import { ComicModel } from '../../comic.model'

export interface State {
    fetching: boolean
    data: ComicModel
    error: HttpErrorResponse
}

const initialState: State = {
    fetching: false,
    data: null,
    error: null,
}

export const comicReducer = (state = initialState, action: fromComicActions.type) => {
    switch (action.type) {
        case fromComicActions.FETCH_COMIC_START:
            return {
                ...state,
                fetching: true,
                error: null,
            }
        case fromComicActions.FETCH_COMIC_SUCCESS:
            return {
                ...state,
                fetching: false,
                error: null,
                data: action.payload,
            }
        case fromComicActions.FETCH_COMIC_ERROR:
            return {
                ...state,
                fetching: false,
                error: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
}
