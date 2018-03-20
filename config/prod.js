module.exports = {
  identityMetadata: process.env.IDENTITY_META_DATA,
  // or equivalently: 'https://login.microsoftonline.com/<tenant_guid>/.well-known/openid-configuration'
  //
  // or you can use the common endpoint
  // 'https://login.microsoftonline.com/common/.well-known/openid-configuration'
  // To use the common endpoint, you have to either set `validateIssuer` to false, or provide the `issuer` value.

  // Required, the client ID of your app in AAD
  clientID: process.env.CLIENT_ID,

  // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token'
  responseType: "code id_token",

  // Required
  responseMode: "form_post",

  url: process.env.HOST,

  // Required if we use http for redirectUrl
  allowHttpForRedirectUrl: false,

  // Required if `responseType` is 'code', 'id_token code' or 'code id_token'.
  // If app key contains '\', replace it with '\\'.
  clientSecret: process.env.CLIENT_SECRET,

  useCookieInsteadOfSession: false
};
