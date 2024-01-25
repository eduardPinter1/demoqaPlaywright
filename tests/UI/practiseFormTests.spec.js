import { test } from '../../modules/base';

test("Fill form - happy flow", async ({ practiseForm }) => {
    await practiseForm.fillOutForm({})
})

test("Fill form - all fields empty", async ({ practiseForm }) => {
    await practiseForm.fillOutForm({
        emptyFields: true
    })
})
