import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinderComponent } from './finder/finder.component';
import { SingleCardComponent } from './single-card/single-card.component';

const routes: Routes = [{ path: 'pokemon/:id', component: FinderComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
