// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  stage: 'prod', //use this variable only if you have specific stage related features. By default, use production variable
  production: true,
  DOMAIN: 'localhost',
  SITE_URL: 'http://localhost:4200',
  API: 'http://localhost:3000',
  COOKIE_DOMAIN: 'localhost', //.cambridge.ph
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
