/*
    Angular Material design components are registered here
*/
import { NgModule } from '@angular/core'
import { MatTabsModule, MatIconModule } from '@angular/material'

@NgModule({
    imports: [MatTabsModule, MatIconModule],
    exports: [MatTabsModule, MatIconModule],
})
export class MaterialComponentsModule {}
