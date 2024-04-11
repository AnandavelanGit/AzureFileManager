export const environment = {
    production: false,
    apiUrl: 'https://localhost:5001/',
    clientId: 'e1bdbd3a-22f7-47f7-aaea-19bc78e57d0c',
    authority: 'https://login.microsoftonline.com/e3978dc2-ccb8-49b2-8c6e-e9a8d4cf7b38',
    redirectUri: 'http://localhost:4200/',
    //Enable below for Read permission alone - Admin consent is not required as the scope
    // is pre-authorized in the api
    expose: 'api://db7857f4-4929-4c5e-95cb-5c352f65cf46/FileAPIRead',

   //Enable below for ReadWrite permission - Admin consent already provided
   // expose: 'api://db7857f4-4929-4c5e-95cb-5c352f65cf46/FileAPIReadWrite',

    graphApi: 'https://graph.microsoft.com/v1.0/me'
};
