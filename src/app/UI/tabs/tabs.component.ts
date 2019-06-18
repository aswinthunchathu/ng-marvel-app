import { Component, OnInit, Input, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { TabService } from './tabs.service'

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    providers: [TabService],
})
export class TabsComponent implements OnInit, OnDestroy {
    @Input('default-tab') defaultTab: string
    activeTab: string
    tabs: string[] = []
    tabsSub: Subscription

    constructor(private tabService: TabService) {}

    ngOnInit() {
        this.tabService.selectedTab = this.defaultTab
        this.tabsSub = this.tabService.tabChangeEvent.subscribe(() => {
            this.tabs = this.tabService.tabs
            this.activeTab = this.tabService.selectedTab
        })
    }

    onTabChange(tab: string) {
        this.tabService.selectedTab = tab
    }

    ngOnDestroy() {
        this.tabsSub.unsubscribe()
    }
}
