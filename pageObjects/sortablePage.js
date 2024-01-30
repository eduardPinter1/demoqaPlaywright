import { expect } from "../modules/base";

export class SortablePage {

    constructor(page) {
        this.page = page;
        this.listItems = this.page.locator("#demo-tabpane-list div.list-group-item");
        this.gridTabItem = this.page.locator("#demo-tab-grid")
        this.gridItems = this.page.locator("#demo-tabpane-grid div.list-group-item")
    }

    async sortGridList({
        rowNum = "One",
        index = 1,
        changedOrder = true,
        changedItem = true,
        items = "listItems"
    }) {
        let movingElement;
        let beforeMoving;
        let listItemTextOnChangingIndex;
        if (items === "listItems") {
            movingElement = await this.page.locator(`#demo-tabpane-list div.list-group-item:has-text("${rowNum}")`)
            beforeMoving = await this.getAllValues({});
            listItemTextOnChangingIndex = await this.getItemTextByIndex({ index: index });
            await movingElement.dragTo(this.listItems.nth(index));
            changedOrder ? expect(await this.getAllValues({})).toBe(await beforeMoving) : expect(await this.getAllValues({})).not.toBe(await beforeMoving);
            return changedItem ? expect(await this.getItemTextByIndex({ index: index })).not.toBe(listItemTextOnChangingIndex) : expect(await this.getItemTextByIndex({ index: index })).toBe(listItemTextOnChangingIndex)
        }
        await this.gridTabItem.click();
        movingElement = await this.page.locator(`#demo-tabpane-grid div.list-group-item:has-text("${rowNum}")`)
        beforeMoving = await this.getAllValues({ items: "gridItems" });
        listItemTextOnChangingIndex = await this.getItemTextByIndex({ index: index, items: "gridItems" });
        await movingElement.dragTo(this.gridItems.nth(index));
        changedOrder ? expect(await this.getAllValues({ items: "gridItems" })).toBe(await beforeMoving) : expect(await this.getAllValues({ items: "gridItems" })).not.toBe(await beforeMoving);
        changedItem ? expect(await this.getItemTextByIndex({ index: index, items: "gridItems" })).not.toBe(listItemTextOnChangingIndex) : expect(await this.getItemTextByIndex({ index: index, items: "gridItems" })).toBe(listItemTextOnChangingIndex)
    }

    async getAllValues({
        items = "listItems"
    }) {
        let listOrderValues = [];
        listOrderValues = await this[items].allTextContents();

        return listOrderValues;
    }

    async getItemTextByIndex({ index = 1, items = "listItems" }) {
        let itemText = await this[items].nth(index).textContent();

        return itemText;
    }
}
