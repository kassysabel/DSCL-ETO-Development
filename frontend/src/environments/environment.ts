// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  stage: 'devt', //use this variable only if you have specific stage related features. By default, use production variable
  production: false,
  DOMAIN: 'localhost',
  SITE_URL: 'http://localhost:4200',
  API: 'http://localhost:3000',
  COOKIE_DOMAIN: 'localhost',
};
