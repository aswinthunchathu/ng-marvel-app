import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { TabService } from '../tabs.service'

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit, OnDestroy {
    @Input() name: string
    activeTab: string
    tabSub: Subscription

    constructor(private tabService: TabService) {}

    ngOnInit() {
        this.tabService.addTab(this.name)
        this.tabSub = this.tabService.tabChangeEvent.subscribe(() => {
            this.activeTab = this.tabService.selectedTab
        })
    }

    ngOnDestroy() {
        this.tabSub.unsubscribe()
    }
}
