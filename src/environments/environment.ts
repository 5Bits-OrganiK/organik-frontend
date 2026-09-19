/**
 * Development environment configuration for the application
 *
 * this file contains settings and variables specific to the development environment.
 * It is used to configure the application during production and testing phases.
 */

export const environment = {
  production: true,
  newsProviderApiBaseUrl: 'https://newsapi.org/v2/',
  newProviderNewsEndpoint: 'top-headlines',
  newProviderSourceEndpointPath: 'top-headlines/sources',
  newProviderApiKey: 'YOUR_API_KEY',
  logoProviderApiBaseUrl: 'https://img.logo.dev',
  logoProviderPublishableKey: 'YOUR_LOGO_PROVIDER_PUBLISHABLE_KEY',
};

