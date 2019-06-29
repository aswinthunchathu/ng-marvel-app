import { FILTER_TYPE, COMPONENT_TYPE } from './list-view.metadata'

export interface Tab {
    title: string
    type: COMPONENT_TYPE
}

export interface Filter {
    type: FILTER_TYPE
    id: number
}
