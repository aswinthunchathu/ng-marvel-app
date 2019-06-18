import { Subject } from 'rxjs'
import { Injectable } from '@angular/core'

export class TabService {
    tabs: string[] = []
    _selectedTab: string
    tabChangeEvent = new Subject<void>()
    selectedTabIndex: number

    constructor() {}

    get selectedTab() {
        return this._selectedTab
    }

    set selectedTab(tab: string) {
        this._selectedTab = tab
        this.tabChangeEvent.next()
    }

    addTab(name: string) {
        const updatedTabs = [...this.tabs]
        updatedTabs.push(name)
        this.tabs = updatedTabs
        this.tabChangeEvent.next()
    }

    getActiveTabIndex = () => this.tabs.findIndex(tab => tab === this.selectedTab)
}
