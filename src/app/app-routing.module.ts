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
        loadChildren: () =>
          import('@pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'collections/:name',
        loadChildren: () =>
          import('@pages/collections/collections.module').then(
            (m) => m.CollectionsModule
          ),
      },
      {
        // !404 - keep this route at the end of child!!
        // move this route at the end of parent array if nav and footer need to be hidden at 404 page
        path: 'page-not-found',
        loadChildren: () =>
          import('@pages/not-found/not-found.module').then(
            (m) => m.NotFoundModule
          ),
      },
    ],
  },
  {
    // 500 (navbar and footer not visible)
    path: 'server-error',
    loadChildren: () =>
      import('@pages/server-error/server-error.module').then(
        (m) => m.ServerErrorModule
      ),
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
