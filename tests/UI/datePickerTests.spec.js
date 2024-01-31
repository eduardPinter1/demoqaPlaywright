import { test } from '../../modules/base';
import data from "../../fixtures/testData.json";

test.beforeEach(async ({ wpage }) => {
    await wpage.goto("date-picker");
})

test("Date picker - using date without time", async ({ datePicker }) => {
    await datePicker.selectDate({
        datePicker: "date",
        day: data.day,
        month: data.month,
        year: data.year
    })
})

test("Date picker - using date with time", async ({ datePicker }) => {
    await datePicker.selectDate({
        datePicker: "dateAndTime",
        time: data.time,
        day: data.day,
        month: data.month,
        year: data.year
    })
})
