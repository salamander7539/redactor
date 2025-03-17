import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {
  provideFirebaseApp,
  getApp,
  initializeApp,
  firebaseApp$,
} from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

const firebaseConfig = {
  apiKey: 'AIzaSyAldzYve5Xu_P5N-1D56cfSbXwUec5sxzg',
  authDomain: 'angular-redactor.firebaseapp.com',
  projectId: 'angular-redactor',
  storageBucket: 'angular-redactor.firebasestorage.app',
  messagingSenderId: '942726031812',
  appId: '1:942726031812:web:275c8f9760f5c61c471c91',
  measurementId: 'G-BNCJZNJ86P',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
};
