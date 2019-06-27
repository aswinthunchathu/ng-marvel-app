import { ActionCreator } from '@ngrx/store'
import { TypedAction } from '@ngrx/store/src/models'
import { createEffect, ofType, Actions } from '@ngrx/effects'
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { Injectable } from '@angular/core'

import * as fromUIActions from './ui.actions'
import { ACTION_TAGS } from '../../../constants'
import { HttpErrorResponse } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class UIService {
    constructor(private actions$: Actions) {}

    public showSpinnerEffect = (
        actions: (
            | ActionCreator<string, () => TypedAction<string>>
            | ActionCreator<string, (props: any) => any & TypedAction<string>>)[],
        tag: ACTION_TAGS
    ) =>
        createEffect(() =>
            this.actions$.pipe(
                ofType(...actions),
                switchMap(() => {
                    return of(fromUIActions.showSpinner(tag)())
                })
            )
        )

    public hideSpinnerEffect = (
        actions: (
            | ActionCreator<string, () => TypedAction<string>>
            | ActionCreator<string, (props: any) => any & TypedAction<string>>)[],
        tag: ACTION_TAGS
    ) =>
        createEffect(() =>
            this.actions$.pipe(
                ofType(...actions, fromUIActions.setError(tag)),
                switchMap(() => of(fromUIActions.hideSpinner(tag)()))
            )
        )

    public setError = (err: HttpErrorResponse, tag) =>
        fromUIActions.setError(tag)({
            payload: err,
        })
}
