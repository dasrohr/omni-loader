import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';



import { AlertModule, ButtonsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { JobCreatorComponent } from './job-creator/job-creator.component';
import { JobSelectorComponent } from './job-creator/job-selector/job-selector.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HistoryComponent } from './history/history.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/job', pathMatch: 'full' },
  { path: 'job', component: JobCreatorComponent, children: [
    { path: 'select', component: JobSelectorComponent }
  ] },
  { path: 'history', component: HistoryComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    JobCreatorComponent,
    JobSelectorComponent,
    PageNotFoundComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( appRoutes ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
