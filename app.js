const express = require('express');
const jsforce = require('jsforce');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const {SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_SECURITY_TOKEN} = process.env;

const PORT = 3001;

const connection = new jsforce.Connection();

connection.login(SF_USERNAME, SF_PASSWORD + SF_SECURITY_TOKEN, (err, res) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Info: ${res.id}`);
    }

    connection.sobject('Opportunity').retrieve('0066F00000wOxM1QAK', (err, res) => {
        if(err) {
            console.log(err);
        }
    
        console.log('Opportunity Name: ' + res.Name);
    })

    connection.sobject('Expense__c').retrieve('a056F00001FeBn8QAF', (err, res) => {
        if(err) {
            console.log(err);
        }
    
        console.log('Expense Name: ' + res.Description__c);
    })

    connection.sobject('Expense__c').update({ Id : 'a056F00001FeBn8QAF', Description__c : 'Description Test' }, (err, res) => {
        if(err) {
            console.log(err);
        }
    })

    connection.sobject('ContentVersion').create({ PathOnClient: 'C:/Users/DreamStore/Documents/AppIdeaGuide.pdf', Title: 'pdftest.pdf', }, (err, res) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(`New File ID: ${res.id}`);
        }
    })
})


app.listen(PORT, () => {
    console.log(`Listening to the port: ${PORT}`);
});