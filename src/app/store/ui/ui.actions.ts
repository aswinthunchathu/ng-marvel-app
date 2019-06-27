import { createAction, props } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

export const showSpinner = (tag: string) => createAction(`${tag} Show Spinner`)
export const hideSpinner = (tag: string) => createAction(`${tag} Hide Spinner`)
export const setError = (tag: string) => createAction(`${tag} Set Error`, props<{ payload: HttpErrorResponse }>())
export const resetError = (tag: string) => createAction(`${tag} Reset Error`)
