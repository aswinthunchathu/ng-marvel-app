import { FILTER_TYPE } from '../list.metadata'
import * as fromListMetadata from '../list.metadata'

export enum COMPONENT_TYPE {
    'character' = 'character',
    'comic' = 'comic',
    'seriesDetails' = 'seriesDetails',
}

export const mapping: Record<string, any> = {
    [COMPONENT_TYPE.character]: {
        filterKey: FILTER_TYPE.byCharacterId,
        tabs: [
            {
                label: 'Comics',
                type: fromListMetadata.COMPONENT_TYPE.comics,
            },
            {
                label: 'Series',
                type: fromListMetadata.COMPONENT_TYPE.series,
            },
        ],
    },
    [COMPONENT_TYPE.comic]: {
        filterKey: FILTER_TYPE.byComicId,
        tabs: [
            {
                label: 'Characters',
                type: fromListMetadata.COMPONENT_TYPE.characters,
            },
        ],
    },
    [COMPONENT_TYPE.seriesDetails]: {
        filterKey: FILTER_TYPE.bySeriesId,
        tabs: [
            {
                label: 'Characters',
                type: fromListMetadata.COMPONENT_TYPE.characters,
            },
            {
                label: 'Comics',
                type: fromListMetadata.COMPONENT_TYPE.comics,
            },
        ],
    },
}
