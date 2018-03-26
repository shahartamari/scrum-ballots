module.exports = {
  identityMetadata: process.env.IDENTITY_META_DATA,
  // or equivalently: 'https://login.microsoftonline.com/<tenant_guid>/.well-known/openid-configuration'
  //
  // or you can use the common endpoint
  // 'https://login.microsoftonline.com/common/.well-known/openid-configuration'
  // To use the common endpoint, you have to either set `validateIssuer` to false, or provide the `issuer` value.
  tenant: process.env.TENANT,
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
    // Required if `useCookieInsteadOfSession` is set to true. You can provide multiple set of key/iv pairs for key
  // rollover purpose. We always use the first set of key/iv pair to encrypt cookie, but we will try every set of
  // key/iv pair to decrypt cookie. Key can be any string of length 32, and iv can be any string of length 12.
  proxy: false
};

