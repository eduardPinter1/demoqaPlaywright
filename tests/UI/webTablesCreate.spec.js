import { test } from '../../modules/base';
const data = JSON.parse(JSON.stringify(require('../../fixtures/testData.json')));

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("webtables");
})

test("Create table happy flow", async ({ webTablesPage }) => {
    await webTablesPage.createTable({});
})

test("Create table - all empty fields", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            firstName: "",
            lastName: "",
            userEmail: "",
            age: "",
            salary: "",
            department: "",
        }, fail: true
    });
})

test("Create table - email no symbol", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            userEmail: data.emailFormats.noSymbol
        }, fail: true
    });
})

test("Create table - email no dot", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            userEmail: data.emailFormats.noDot
        }, fail: true
    });
})

test("Create table - email no domain with dot", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            userEmail: data.emailFormats.noDomainWithDot
        }, fail: true
    });
})

test("Create table - email no domain without dot", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            userEmail: data.emailFormats.noDomainWithoutDot
        }, fail: true
    });
})

test("Create table - email no mail server", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            userEmail: data.emailFormats.noMailServer
        }, fail: true
    });
})

test("Create table - email no username", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            userEmail: data.emailFormats.noUsername
        }, fail: true
    });
})

test("Create table - age populated with special symbols", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            age: data.stringVariations.symbolsOnly
        }, fail: true
    });
})

test("Create table - age populated with letters only", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            age: data.stringVariations.lettersOnly
        }, fail: true
    });
})

test("Create table - salary populated with special symbols", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            salary: data.stringVariations.symbolsOnly
        }, fail: true
    });
})

test("Create table - salary populated with letters only", async ({ webTablesPage }) => {
    await webTablesPage.createTable({
        testData: {
            salary: data.stringVariations.lettersOnly
        }, fail: true
    });
})
