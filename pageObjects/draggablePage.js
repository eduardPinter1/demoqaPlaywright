import { expect } from "../modules/base";
const data = JSON.parse(JSON.stringify(require("../fixtures/testData.json")));

export class DraggablePage {
    constructor(page) {
        this.page = page;
        this.dragBoxSimple = this.page.locator("#dragBox");
        this.axisRestrictedTab = this.page.locator('#draggableExample-tab-axisRestriction');
        this.dragX = this.page.locator("#restrictedX")
        this.dragY = this.page.locator("#restrictedY")
        this.containerRestrictedTab = this.page.locator('#draggableExample-tab-containerRestriction');
        this.containerWrapper = this.page.locator("#containmentWrapper")
        this.containedInWrapper = this.page.locator('#containmentWrapper div:has-text("I\'m contained within the box")');
        this.containedInParent = this.page.locator('div.draggable span:has-text("I\'m contained within my parent")')
        this.parentContainer = this.page.locator("#draggableExample-tabpane-containerRestriction > div.draggable")
        this.scrollForView = this.page.locator('span:has-text("Book Store Application")');
        this.cursorStyleTab = this.page.locator("#draggableExample-tab-cursorStyle");
        this.cursorCenter = this.page.locator("#cursorCenter");
        this.cursorTopLeft = this.page.locator("#cursorTopLeft");
        this.cursorBottom = this.page.locator("#cursorBottom");
        this.cursorContainer = this.page.locator("#draggableExample-tabpane-cursorStyle")
    }

    async moveSimpleBox({ x = 15, y = 15 }) {
        await this.dragBoxSimple.hover();
        await this.mouseMoveElement(x, y);
        await expect(await this.dragBoxSimple).not.toHaveAttribute("style", "position: relative;")
    }

    async moveXOrY({ isX = true, x = 15, y = 15 }) {
        await this.axisRestrictedTab.click();
        if (isX) {
            await this.dragX.hover();
            await this.mouseMoveElement(x, y);
            return await expect(await this.dragX).toHaveCSS("top", "0px");
        }
        await this.dragY.hover();
        await this.mouseMoveElement(x, y);
        await expect(await this.dragY).toHaveCSS("left", "0px");

    }

    async moveContained({ isWrapped = true }) {
        let box;
        await this.containerRestrictedTab.click();
        if (isWrapped) {
            await this.containerWrapper.scrollIntoViewIfNeeded();
            box = await this.containerWrapper.boundingBox();
            await this.containedInWrapper.hover();
            await this.mouseMoveElement(box.x + box.width / 2, box.y + box.height / 2);

            return await expect(await this.containerWrapper)
                .toHaveScreenshot();
        }
        await this.scrollForView.scrollIntoViewIfNeeded();
        box = await this.parentContainer.boundingBox();
        await this.containedInParent.hover();
        await this.mouseMoveElement(box.x + box.width / 2, box.y + box.height / 2);

        return await expect(await this.parentContainer)
            .toHaveScreenshot();
    }

    async checkCursorStyle({ style = "" }) {
        let cursorStyle;
        await this.cursorStyleTab.click();
        switch (style) {
            case "center":
                await this.cursorCenter.hover();
                cursorStyle = await this.get_cursor_style();
                await expect(cursorStyle).toBe(data.moveCursor)
                break;
            case "topLeft":
                await this.cursorTopLeft.hover();
                cursorStyle = await this.get_cursor_style();
                await expect(cursorStyle).toBe(data.crosshairCursor)
                break;
            case "bottom":
                await this.cursorBottom.hover();
                cursorStyle = await this.get_cursor_style();
                await expect(cursorStyle).toBe(data.moveCursor)
                break;
        }
    }

    async get_cursor_style() {
        let box = await this.cursorContainer.boundingBox();
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        const cursorStyle = await this.page.evaluate(() => {
            const element = document.body;
            let cursorType = window.getComputedStyle(element);
            return cursorType.cursor;
        });
        return cursorStyle;
    }

    async mouseMoveElement(x, y) {
        await this.page.mouse.down();
        await this.page.mouse.move(x, y);
        await this.page.mouse.up();
    }
}
