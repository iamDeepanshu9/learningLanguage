import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Level1PageComponent} from './level1-page/level1-page.component';
import {Test1PageComponent} from './test1-page/test1-page.component';
import {HomeComponent} from './home/home.component';
import {Auth1Guard} from './shared/auth1.guard';
import {Auth2Guard} from './shared/auth2.guard';
import {Auth3Guard} from './shared/auth3.guard';
import {Auth4Guard} from './shared/auth4.guard';
import {Auth5Guard} from './shared/auth5.guard';
import {Auth6Guard} from './shared/auth6.guard';
import {Auth7Guard} from './shared/auth7.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, children: [
      { path: 'level1', canActivate: [Auth1Guard], component: Level1PageComponent },
      { path: 'test1', canActivate: [Auth1Guard], component: Test1PageComponent },
      { path: 'level2', canActivate: [Auth2Guard], component: Level1PageComponent },
      { path: 'test2', canActivate: [Auth2Guard], component: Test1PageComponent },
      { path: 'level3', canActivate: [Auth3Guard], component: Level1PageComponent },
      { path: 'test3', canActivate: [Auth3Guard], component: Test1PageComponent },
      { path: 'level4', canActivate: [Auth4Guard], component: Level1PageComponent },
      { path: 'test4', canActivate: [Auth4Guard], component: Test1PageComponent },
      { path: 'level5', canActivate: [Auth5Guard], component: Level1PageComponent },
      { path: 'test5', canActivate: [Auth5Guard], component: Test1PageComponent },
      { path: 'level6', canActivate: [Auth6Guard], component: Level1PageComponent },
      { path: 'test6', canActivate: [Auth6Guard], component: Test1PageComponent },
      { path: 'level7', canActivate: [Auth7Guard], component: Level1PageComponent },
      { path: 'test7', canActivate: [Auth7Guard], component: Test1PageComponent }
    ] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
