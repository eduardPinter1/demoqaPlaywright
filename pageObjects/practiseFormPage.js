import { expect } from "@playwright/test";
const data = JSON.parse(JSON.stringify(require("../fixtures/testData.json")));

export class PractiseFormPage {

    constructor(page) {
        this.page = page;
        this.userForm = this.page.locator("#userForm");
        this.firstNameField = this.page.locator("#firstName");
        this.lastNameField = this.page.locator("#lastName");
        this.emailField = this.page.locator("#userEmail");
        this.mobileNumberField = this.page.locator("#userNumber");
        this.dateOfBirth = this.page.locator("#dateOfBirthInput");
        this.dateOfBirthPicker = this.page.locator(".react-datepicker__month-container");
        this.subjectsField = this.page.locator("#subjectsInput");
        this.pictureInput = this.page.locator("#uploadPicture");
        this.currentAddressField = this.page.locator("#currentAddress");
        this.selectStateDropdown = this.page.locator('#state');
        this.stateOptions = this.page.locator("div[id*='react-select-3']");
        this.cityOptions = this.page.locator("div[id*='react-select-4']");
        this.selectCityDropdown = this.page.locator("#city");
        this.submitBtn = this.page.locator("#submit");
        this.formFulfilledPresence = this.page.locator(".modal-content")
    }

    async fillOutForm({
        firstName = "Jack",
        lastName = "Jackson",
        email = "ep@mail.co",
        mobile = "1111111111",
        subjectName = "English",
        adress = "None",
        gender = "Male",
        hobby = "Reading",
        date = "24 January 2023",
        hobbyName = "English",
        state = data.statesCities.ncr,
        city = data.statesCities.ncrCities.delhi,
        filePath = data.filePathJpeg,
        numDashes = 1,
        emptyFields = false
    }) {
        await this.page.goto("automation-practice-form");
        await this.removeBlockingAds();
        await expect(this.userForm).toBeVisible();
        if (emptyFields) {
            await this.clickSubmitBtn();
            expect(this.formFulfilledPresence).not.toBeVisible();

            return expect(this.formFulfilledPresence).not.toBeAttached();
        }
        await this.enterValueToFields({
            firstName: firstName,
            lastNameField: lastName,
            email: email,
            mobile: mobile,
            subject: subjectName,
            adress: adress
        });
        await this.checkGenderByValue({ value: gender });
        await this.checkHobbyByValue({ value: hobby });
        await this.uploadFileByPath({ filePath: filePath });
        const dateBySections = await this.setDateOfBirth({ date: date });
        await this.pickStateOption({ option: state });
        await this.pickCityOption({ option: city });
        await this.clickSubmitBtn();

        let fileName = filePath.split("/")
        fileName = fileName[numDashes];
        await this.assertSubmittedValues({
            firstName: firstName,
            lastName: lastName,
            email: email,
            mobile: mobile,
            subject: subjectName,
            adress: adress,
            gender: gender,
            hobbyName: hobbyName,
            day: dateBySections.day,
            month: dateBySections.month,
            year: dateBySections.year,
            state: state,
            city: city,
            fileName: fileName
        })
    }

    async enterValueToFields({
        firstName = "",
        lastNameField = "",
        email = "",
        mobile = "",
        subject = "",
        adress = ""
    }) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastNameField);
        await this.emailField.fill(email);
        await this.mobileNumberField.fill(mobile);
        await this.subjectsField.pressSequentially(subject, { delay: 100 });
        await this.subjectsField.press("Enter");
        await this.currentAddressField.fill(adress);

    }

    async checkGenderByValue({ value = "Male" }) {
        await this.page.locator(`input[value="${value}"]`).click({ force: true });
    }

    async checkHobbyByValue({ value = "Sports" }) {
        await this.page.locator(`label[for*="hobbies-checkbox"]:has-text("${value}")`).click({ force: true });
    }

    async pickStateOption({ option = "" }) {
        await this.selectStateDropdown.scrollIntoViewIfNeeded();
        await this.selectStateDropdown.click();
        await this.page.locator(`div[id*='react-select-3']:has-text("${option}")`).click();
    }

    async clickSubmitBtn() {
        await this.submitBtn.scrollIntoViewIfNeeded();
        await this.submitBtn.click();
    }

    async setDateOfBirth({ date = "" }) {
        await this.dateOfBirth.fill(date);
        const inputValue = await this.dateOfBirth.inputValue();
        expect(await inputValue).toEqual(date);
        await expect(this.dateOfBirth).toHaveAttribute("value", date);
        await this.page.keyboard.press("Escape");
        const partsOfDate = date.split(" ");
        const dateObj = {};
        dateObj.day = partsOfDate[0];
        dateObj.month = partsOfDate[1];
        dateObj.year = partsOfDate[2];

        return dateObj;
    }

    async pickCityOption({ option = "" }) {
        await this.selectCityDropdown.scrollIntoViewIfNeeded();
        await this.selectCityDropdown.click();
        await this.page.locator(`div[id*='react-select-4']:has-text("${option}")`).click();
    }

    async uploadFileByPath({
        filePath = "",
        numDashes = 1
    }) {
        let fileName = filePath.split("/")
        fileName = fileName[numDashes];
        await this.page.setInputFiles('#uploadPicture', [
            filePath,
        ])

        return fileName;
    }

    async assertSubmittedValues({
        firstName = "Jack",
        lastName = "Jackson",
        email = "ep@mail.co",
        mobile = "1111111111",
        day = "01",
        month = "January",
        year = "2023",
        fileName = "pic.png",
        subject = "English",
        adress = "None",
        gender = "Male",
        hobbyName = "",
        state = "",
        city = ""
    }) {
        let assertValues = {
            studName: `${firstName} ${lastName}`,
            gender: gender,
            email: email,
            mobile: mobile,
            date: `${day} ${month},${year}`,
            subject: subject,
            hobbies: hobbyName,
            file: fileName,
            adress: adress,
            stateCity: `${state} ${city}`
        }
        await expect(this.page.locator(`td:has-text("${data.practiseForm.name}") + td`)).toHaveText(assertValues.studName);
        await expect(this.page.locator(`td:has-text("${data.practiseForm.gender}") + td`)).toHaveText(assertValues.gender);
        await expect(this.page.locator(`td:has-text("${data.practiseForm.email}") + td`)).toHaveText(assertValues.email);
        await expect(this.page.locator(`td:has-text("${data.practiseForm.mobile}") + td`)).toHaveText(assertValues.mobile);
        await expect(this.page.locator(`td:has-text("${data.practiseForm.date}") + td`)).toHaveText(assertValues.date);
        await expect(this.page.locator(`td:has-text("${data.practiseForm.subjects}") + td`)).toHaveText(assertValues.subject);
        await expect(this.page.locator(`td:has-text("${data.practiseForm.file}") + td`)).toHaveText(assertValues.file);
        await expect(this.page.locator(`td:has-text("${data.practiseForm.adress}") + td`)).toHaveText(assertValues.adress);
        await expect(this.page.locator(`td:has-text("${data.practiseForm.stateCity}") + td`)).toHaveText(assertValues.stateCity);
    }

    async removeBlockingAds() {
        await this.page.evaluate(() => {
            const selectors = [
                'iframe[aria-label="Advertisement"]',
                '#adplus-anchor',
                "#fixedban",
                "footer",
            ]
            selectors.forEach(selector => {
                let element = document.querySelector(selector);
                if (element) {
                    element.remove();
                }
            });
        })
    }
}
