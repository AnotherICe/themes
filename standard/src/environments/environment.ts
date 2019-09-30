// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`
// in DEV, API points to demo site to pull posts from blogifier.net
// so no need to run server-side application locally

export const environment = {
  production: false,
	apiEndpoint: 'http://blogifier.net',
	themeData: '/assets/data.json'
};