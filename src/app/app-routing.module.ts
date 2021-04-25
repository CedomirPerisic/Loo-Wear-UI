import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppOutletComponent } from '@app/components';

const routes: Routes = [
  {
    path: '',
    component: AppOutletComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('@pages/home/home.module').then(m => m.HomeModule)
      },
      {
        // !404 - keep this route at the end of child!!
        // move this route at the end of parent array if nav and footer need to be hidden at 404 page
        path: '**',
        loadChildren: () => import('@pages/not-found/not-found.module').then(m => m.NotFoundModule)
      }
    ]
  },
  {
    // 500 (navbar and footer not visible)
    path: 'error',
    loadChildren: () => import('@app/pages/server-error/server-error.module').then(m => m.ServerErrorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
