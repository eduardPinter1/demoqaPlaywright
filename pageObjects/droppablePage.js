import { expect } from "../modules/base";

export class DroppablePage {
    constructor(page) {
        this.page = page;
        this.acceptButtonTab = this.page.locator('#droppableExample-tab-accept');
        this.preventPropogationButtonTab = this.page.locator('#droppableExample-tab-preventPropogation');
        this.revertDraggableButtonTab = this.page.locator('#droppableExample-tab-revertable');
        this.draggableSimple = this.page.locator("#simpleDropContainer > #draggable");
        this.droppableSimple = this.page.locator("#simpleDropContainer > #droppable");
        this.acceptable = this.page.locator("#acceptable");
        this.notAcceptable = this.page.locator("#notAcceptable");
        this.droppableAccept = this.page.locator("#acceptDropContainer > #droppable");
        this.dragBox = this.page.locator("#dragBox");
        this.greedyBoxInner = this.page.locator("#greedyDropBoxInner")
        this.greedyBoxOuter = this.page.locator("#greedyDropBox");
        this.notGreedyBoxInner = this.page.locator("#notGreedyInnerDropBox")
        this.notGreedyBoxOuter = this.page.locator("#notGreedyDropBox")
        this.revertableBox = this.page.locator("#revertable")
        this.notRevertableBox = this.page.locator("#notRevertable")
        this.droppableRevert = this.page.locator("#revertableDropContainer #droppable")
    }

    async dragAndDrop({
        tabOption = "propogation",
        dragOut = true,
        greedy = true,
        reverting = true,
        haveTextMessage = "Dropped!" }) {
        switch (tabOption) {
            case "simple":
                await this.draggableSimple.dragTo(await this.droppableSimple);
                await this.assertCss({ selectorCss: "droppableSimple" });
                await this.assertText({ haveTextMsg: haveTextMessage, selectorText: "droppableSimple" })
                break;
            case "accept":
                await this.acceptButtonTab.click();
                await this.notAcceptable.dragTo(await this.droppableAccept);
                await this.assertCss({
                    haveCss: false,
                    selectorCss: "droppableAccept"
                })
                await this.assertText({
                    selectorText: "droppableAccept",
                    haveTextMsg: haveTextMessage,
                    haveText: false
                })
                await this.acceptable.dragTo(await this.droppableAccept, { force: true });
                await this.assertCss({ selectorCss: "droppableAccept" })
                await this.assertText({
                    selectorText: "droppableAccept",
                    haveTextMsg: haveTextMessage
                })
                break;
            case "propogation":
                await this.preventPropogationButtonTab.click();
                await this.greedyNotGreedy(greedy, dragOut);
                break;
            case "revert":
                await this.revertDraggableButtonTab.click();
                await this.revertNotRevert(reverting);
                break;
            default:
                throw new Error(`Tab option "${tabOption}" does not exist`)
        }

    }

    async greedyNotGreedy(isGreedy = true, dragOut = true) {
        if (isGreedy) {
            await this.greedyTrue(dragOut);
        }
        if (dragOut) {
            await this.handleDragOutTrue();
        }
        await this.handleDragOutFalse();
    }

    async revertNotRevert(revert = true, textMessage = "Dropped!") {
        if (revert) {
            await this.revertableBox.dragTo(await this.droppableRevert);
            await this.assertingAttrCss({
                haveCss: true,
                selectorCss: "droppableRevert",
                attributeText: "position: relative; left: 0px; top: 0px;",
                selectorForAttr: "revertableBox"
            })
        } else {
            await this.notRevertableBox.dragTo(await this.droppableRevert);
            await this.assertingAttrCss({
                haveAttrPositive: false,
                attributeText: "position: relative;",
                selectorForAttr: "notRevertableBox"
            })
        }
        await this.assertCss({ selectorCss: "droppableRevert" })
        await this.assertText({
            haveTextMsg: textMessage,
            selectorText: "droppableRevert"
        })
    }

    async greedyTrue(dragOut = true, textMessage = "Dropped!") {
        if (dragOut) {
            await this.dragBox.dragTo(await this.greedyBoxOuter.locator("p").nth(0));
            await expect(await this.greedyBoxOuter.locator("p").nth(0)).toHaveText(textMessage);
            await this.assertText({
                haveTextMsg: textMessage,
                selectorText: "greedyBoxInner"
            })
            await this.assertCss({
                selectorCss: "greedyBoxOuter",
                selectorCssNeg: "greedyBoxInner",
                negHaveCss: true
            })
        }
        await this.dragBox.dragTo(await this.greedyBoxInner);
        await expect(await this.greedyBoxOuter.locator("p").nth(0)).toHaveText("Outer droppable");
        await this.assertCss({
            electorCss: "greedyBoxInner",
            selectorCssNeg: "greedyBoxOuter",
            negHaveCss: true
        })
        await this.assertText({
            haveTextMsg: textMessage,
            selectorText: "greedyBoxInner"
        })
    }

    async handleDragOutTrue(textMessageOne = "Inner droppable (not greedy)", textMessageTwo = "Dropped!") {
        await this.dragBox.dragTo(await this.notGreedyBoxOuter.locator("p").nth(0));
        await this.assertCss({
            selectorCss: "notGreedyBoxOuter",
            negHaveCss: true,
            selectorCssNeg: "notGreedyBoxInner",
        })
        await this.assertText({
            haveTextMsg: textMessageOne, selectorText: "notGreedyBoxInner",
            haveTextTwo: true, selectorTextTwo: "notGreedyBoxOuter", textMessageTwo: textMessageTwo
        })
    }

    async handleDragOutFalse(textMessage = "Dropped!") {
        await this.dragBox.dragTo(await this.notGreedyBoxInner);
        await this.assertCss({
            selectorCss: "notGreedyBoxOuter",
            haveCssTwo: true, selectorCssTwo: "notGreedyBoxInner",
        });
        await this.assertText({
            haveTextMsg: textMessage, selectorText: "notGreedyBoxInner",
            haveTextTwo: true, selectorTextTwo: "notGreedyBoxOuter", textMessageTwo: textMessage
        })
    }

    async assertText({
        haveText = true, haveTextMsg = "", selectorText = "",
        haveTextTwo = false, selectorTextTwo = "", textMessageTwo = ""
    }) {
        !haveText
            ? await expect(await this[selectorText]).not.toHaveText(haveTextMsg)
            : await expect(await this[selectorText]).toHaveText(haveTextMsg)
        if (haveTextTwo) { await expect(await this[selectorTextTwo].locator("p").nth(0)).toHaveText(textMessageTwo) }
    }

    async assertCss({
        haveCss = true, selectorCss = "", cssValue = "rgb(70, 130, 180)",
        negHaveCss = false, selectorCssNeg = "",
        haveCssTwo = false, selectorCssTwo = "",
    }) {
        !haveCss
            ? await expect(await this[selectorCss]).not.toHaveCSS("background-color", cssValue)
            : await expect(await this[selectorCss]).toHaveCSS("background-color", cssValue);

        if (negHaveCss) { await expect(await this[selectorCssNeg]).not.toHaveCSS("background-color", cssValue); }
        if (haveCssTwo) { await expect(await this[selectorCssTwo]).toHaveCSS("background-color", cssValue); }
    }

    async assertingAttrCss({
        haveCss = false, selectorCss = "", bgColor = "rgb(70, 130, 180)",
        haveAttrPositive = true, attributeText = "", selectorForAttr = "" }) {

        if (haveCss) { await expect(await this[selectorCss]).toHaveCSS("background-color", bgColor); }

        haveAttrPositive
            ? await expect(await this[selectorForAttr]).toHaveAttribute("style", attributeText)
            : await expect(await this[selectorForAttr]).not.toHaveAttribute("style", attributeText);
    }
}
