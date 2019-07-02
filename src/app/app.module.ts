import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'

import { NavLinkComponent } from './header/sidebar/nav-link/nav-link.component'
import { SidebarComponent } from './header/sidebar/sidebar.component'
import { HeaderComponent } from './header/header.component'
import { AppStoreModule } from './store/app-store.module'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule } from './app-routing.module'
import { ListViewComponent } from './list-view/list-view.component'
import { DetailsComponent } from './list-view/details/details.component'
import { PageInfoComponent } from './list-view/page-info/page-info.component'
import { SearchBoxComponent } from './search/search-box/search-box.component'
import { SearchResultsComponent } from './search/search-results/search-results.component'

@NgModule({
    declarations: [
        AppComponent,
        NavLinkComponent,
        SidebarComponent,
        HeaderComponent,
        ListViewComponent,
        DetailsComponent,
        PageInfoComponent,
        SearchBoxComponent,
        SearchResultsComponent,
    ],
    imports: [BrowserAnimationsModule, ReactiveFormsModule, SharedModule, AppStoreModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
