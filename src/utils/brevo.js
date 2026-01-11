const brevo = require('@getbrevo/brevo');
const dotenv = require('dotenv').config()

apiInstance = new brevo.TransactionalEmailsApi()

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY,
)

module.exports = {apiInstance,brevo}