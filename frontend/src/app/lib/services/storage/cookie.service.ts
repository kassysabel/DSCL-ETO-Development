import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CookieService {

    get(name: string) {
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split('; ');
      for(let cookie of cookies){
        const [key, value] = cookie.split(/=(.+)/);
        if(key === name && value != '') return value;
      }

      return null;
    }

    remove(name: string) {
      let cookie = '';
      cookie = `${name}=;domain=${environment.COOKIE_DOMAIN};expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
      document.cookie = cookie;
    }

    set(name: string, value: string, options: any = {}) {

      options = {
        domain: environment.COOKIE_DOMAIN,
        path: '/',
        // add other defaults here if necessary
        ...options
      };

      if (options['expires'] instanceof Date) {
        options['expires'] = options['expires'].toUTCString();
      }
      let updatedCookie = `${name}=${value}`;

      for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
          updatedCookie += "=" + optionValue;
        }
      }

      document.cookie = updatedCookie;
    }
}
