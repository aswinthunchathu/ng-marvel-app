import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InfiniteScrollModule } from 'ngx-infinite-scroll'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { SidebarComponent } from '../UI/header/sidebar/sidebar.component'
import { LoaderComponent } from '../UI/loader/loader.component'
import { ProgressiveImageLoadingDirective } from './directives/progressive-image-loading.directive'
import { CardComponent } from '../UI/card/card.component'
import { ListComponent } from '../UI/list/list.component'
import { ListDetailsComponent } from '../UI/list/list-details/list-details.component'
import { NavLinkComponent } from '../UI/header/sidebar/nav-link/nav-link.component'
import { ErrorHandlerComponent } from '../UI/error-handler/error-handler.component'
import { AppRoutingModule } from '../app-routing.module'
import { MaterialComponentsModule } from './material-components.module'
import { ApiInterceptor } from './services/api-interceptor.services'
import { HeaderComponent } from '../UI/header/header.component'

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        LoaderComponent,
        ProgressiveImageLoadingDirective,
        CardComponent,
        ListComponent,
        ListDetailsComponent,
        NavLinkComponent,
        ErrorHandlerComponent,
    ],
    imports: [CommonModule, HttpClientModule, InfiniteScrollModule, AppRoutingModule, MaterialComponentsModule],
    exports: [
        HttpClientModule,
        AppRoutingModule,
        MaterialComponentsModule,
        HeaderComponent,
        SidebarComponent,
        LoaderComponent,
        ProgressiveImageLoadingDirective,
        CardComponent,
        ListComponent,
        ListDetailsComponent,
        NavLinkComponent,
        ErrorHandlerComponent,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            multi: true,
        },
    ],
})
export class SharedModule {}
