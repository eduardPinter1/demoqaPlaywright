import { expect } from "../modules/base";
const data = JSON.parse(JSON.stringify(require("../fixtures/testData.json")));

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

    async simpleDragDrop({
        tabOption = "simple",
        dragOut = true,
        greedy = true,
        reverting = true }) {
        switch (tabOption) {
            case "simple":
                await this.draggableSimple.dragTo(await this.droppableSimple);
                await this.assertingValues({ haveTextMsg: data.droppedIn, selectorText: "droppableSimple", selectorCss: "droppableSimple" })
                break;
            case "accept":
                await this.acceptButtonTab.click();
                await this.notAcceptable.dragTo(await this.droppableAccept);
                await this.assertingValues({ haveTextMsg: data.droppedIn, selectorCss: "droppableAccept", selectorText: "droppableAccept", haveCss: false, haveText: false })
                await this.acceptable.dragTo(await this.droppableAccept, { force: true });
                await this.assertingValues({ haveTextMsg: data.droppedIn, selectorCss: "droppableAccept", selectorText: "droppableAccept" })
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
            if (dragOut) {
                await this.dragBox.dragTo(await this.greedyBoxOuter.locator("p").nth(0));
                await expect(await this.greedyBoxOuter.locator("p").nth(0)).toHaveText(data.droppedIn);
                return await this.assertingValues({ haveTextMsg: data.greedyInnerMsg, selectorText: "greedyBoxInner", selectorCss: "greedyBoxOuter", selectorCssNeg: "greedyBoxInner", negHaveCss: true })
            }
            await this.dragBox.dragTo(await this.greedyBoxInner);
            await expect(await this.greedyBoxOuter.locator("p").nth(0)).toHaveText("Outer droppable");
            return await this.assertingValues({ haveTextMsg: data.droppedIn, selectorText: "greedyBoxInner", selectorCss: "greedyBoxInner", selectorCssNeg: "greedyBoxOuter", negHaveCss: true })
        }
        if (dragOut) {
            await this.dragBox.dragTo(await this.notGreedyBoxOuter.locator("p").nth(0));
            return await this.assertingValues({
                haveTextMsg: "Inner droppable (not greedy)", selectorText: "notGreedyBoxInner",
                selectorCss: "notGreedyBoxOuter",
                negHaveCss: true, selectorCssNeg: "notGreedyBoxInner",
                haveTextTwo: true, selectorTextTwo: "notGreedyBoxOuter", textMessageTwo: data.droppedIn
            });
        }
        await this.dragBox.dragTo(await this.notGreedyBoxInner);
        await this.assertingValues({
            haveTextMsg: data.droppedIn, selectorText: "notGreedyBoxInner",
            selectorCss: "notGreedyBoxOuter",
            haveCssTwo: true, selectorCssTwo: "notGreedyBoxInner",
            haveTextTwo: true, selectorTextTwo: "notGreedyBoxOuter", textMessageTwo: data.droppedIn
        });
    }

    async revertNotRevert(revert = true) {
        if (revert) {
            await this.revertableBox.dragTo(await this.droppableRevert);
            await this.assertingAttrCss({ haveCss: true, selectorCss: "droppableRevert", attributeText: "position: relative; left: 0px; top: 0px;", selectorForAttr: "revertableBox" })
        } else {
            await this.notRevertableBox.dragTo(await this.droppableRevert);
            await this.assertingAttrCss({ haveAttrPositive: false, attributeText: "position: relative;", selectorForAttr: "notRevertableBox" })
        }
        await this.assertingValues({ haveTextMsg: data.droppedIn, selectorCss: "droppableRevert", selectorText: "droppableRevert" })
    }

    async assertingValues({
        haveText = true, haveTextMsg = "", selectorText = "",
        haveCss = true, selectorCss = "",
        negHaveCss = false, selectorCssNeg = "",
        haveCssTwo = false, selectorCssTwo = "",
        haveTextTwo = false, selectorTextTwo = "", textMessageTwo = "" }) {

        !haveText
            ? await expect(await this[selectorText]).not.toHaveText(haveTextMsg)
            : await expect(await this[selectorText]).toHaveText(haveTextMsg)

        !haveCss
            ? await expect(await this[selectorCss]).not.toHaveCSS("background-color", data.colorDropped)
            : await expect(await this[selectorCss]).toHaveCSS("background-color", data.colorDropped);

        if (negHaveCss) { await expect(await this[selectorCssNeg]).not.toHaveCSS("background-color", data.colorDropped); }

        if (haveCssTwo) { await expect(await this[selectorCssTwo]).toHaveCSS("background-color", data.colorDropped); }

        if (haveTextTwo) { await expect(await this[selectorTextTwo].locator("p").nth(0)).toHaveText(textMessageTwo) }
    }

    async assertingAttrCss({
        haveCss = false, selectorCss = "",
        haveAttrPositive = true, attributeText = "", selectorForAttr = "" }) {

        if (haveCss) { await expect(await this[selectorCss]).toHaveCSS("background-color", data.colorDropped); }

        haveAttrPositive
            ? await expect(await this[selectorForAttr]).toHaveAttribute("style", attributeText)
            : await expect(await this[selectorForAttr]).not.toHaveAttribute("style", attributeText);
    }
}
