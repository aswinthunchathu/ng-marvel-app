import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'

import { SidebarComponent } from '../UI/header/sidebar/sidebar.component'
import { LoaderComponent } from '../UI/loader/loader.component'
import { ProgressiveImageLoadingDirective } from './directives/progressive-image-loading.directive'
import { CardComponent } from '../UI/card/card.component'
import { ListComponent } from '../UI/list/list.component'
import { ListDetailsComponent } from '../UI/list/list-details/list-details.component'
import { NavLinkComponent } from '../UI/header/sidebar/nav-link/nav-link.component'
import { ErrorHandlerComponent } from '../UI/error-handler/error-handler.component'
import { AppRoutingModule } from '../app-routing.module'

@NgModule({
    declarations: [
        SidebarComponent,
        LoaderComponent,
        ProgressiveImageLoadingDirective,
        CardComponent,
        ListComponent,
        ListDetailsComponent,
        NavLinkComponent,
        ErrorHandlerComponent,
    ],
    imports: [CommonModule, InfiniteScrollModule, AppRoutingModule],
    exports: [
        SidebarComponent,
        LoaderComponent,
        ProgressiveImageLoadingDirective,
        CardComponent,
        ListComponent,
        ListDetailsComponent,
        NavLinkComponent,
        ErrorHandlerComponent,
    ],
})
export class SharedModule {}
