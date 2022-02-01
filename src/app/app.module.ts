import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ResourceModule } from './resource/resource.module';
import { HeaderComponent } from './resource/components/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: 'resources', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, ResourceModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
