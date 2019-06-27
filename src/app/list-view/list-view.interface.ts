import { FILTER_TYPE, COMPONENT_TYPE } from './map'

export interface Tab {
    title: string
    type: COMPONENT_TYPE
}

export interface Filter {
    type: FILTER_TYPE
    id: number
}
