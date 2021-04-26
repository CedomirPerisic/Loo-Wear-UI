// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  host: 'http://localhost:3000',
  discord: {
    host: 'https://discord.com/api/webhooks/',
    serverId: '836319352318984193/',
    webHook:
      '86F_HQbeb19NW1fZnXpHs0mKWwLi8ZpA4vjua2KttpY9PExmOPy89ARdcvS5ot6NUNmU',
    botUsername: 'Loo Wear UI',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
