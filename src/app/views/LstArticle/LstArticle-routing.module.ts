import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LstArticleComponent } from './LstArticle.component'
import {PermissionsGuard} from '../../guards/permissions.guard'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Liste Articles'
    },
    children: [
      {
        path: '',
        component: LstArticleComponent,
        data: {
          title: ''
        }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LstArticleRoutingModule { }
