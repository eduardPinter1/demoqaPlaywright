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
        if (items === "listItems") {
            await this.sortList({
                rowNumList: rowNum,
                indexList: index,
                changedItemList: changedItem,
                changedOrderList: changedOrder
            });

            return;
        }
        await this.sortGrid({
            rowNumGrid: rowNum,
            indexGrid: index,
            changedItemGrid: changedItem,
            changedOrderGrid: changedOrder
        });
    }

    async sortList({
        rowNumList = "One",
        indexList = 1,
        changedOrderList = true,
        changedItemList = true,
    }) {
        let movingElement = await this.page.locator(`#demo-tabpane-list div.list-group-item:has-text("${rowNumList}")`)
        let beforeMoving = await this.getAllValues({});
        let listItemTextOnChangingIndex = await this.getItemTextByIndex({ index: indexList });
        await movingElement.dragTo(this.listItems.nth(index));
        changedOrderList
            ? expect(await this.getAllValues({})).toBe(await beforeMoving)
            : expect(await this.getAllValues({})).not.toBe(await beforeMoving);

        changedItemList
            ? expect(await this.getItemTextByIndex({ index: index })).not.toBe(listItemTextOnChangingIndex)
            : expect(await this.getItemTextByIndex({ index: index })).toBe(listItemTextOnChangingIndex)
    }

    async sortGrid({
        rowNumGrid = "One",
        indexGrid = 1,
        changedOrderGrid = true,
        changedItemGrid = true,
    }) {
        await this.gridTabItem.click();
        let movingElement = await this.page.locator(`#demo-tabpane-grid div.list-group-item:has-text("${rowNumGrid}")`)
        let beforeMoving = await this.getAllValues({ items: "gridItems" });
        let listItemTextOnChangingIndex = await this.getItemTextByIndex({ index: indexGrid, items: "gridItems" });
        await movingElement.dragTo(this.gridItems.nth(index));
        changedOrderGrid
            ? expect(await this.getAllValues({ items: "gridItems" })).toBe(await beforeMoving)
            : expect(await this.getAllValues({ items: "gridItems" })).not.toBe(await beforeMoving);

        changedItemGrid
            ? expect(await this.getItemTextByIndex({ index: index, items: "gridItems" })).not.toBe(listItemTextOnChangingIndex)
            : expect(await this.getItemTextByIndex({ index: index, items: "gridItems" })).toBe(listItemTextOnChangingIndex)
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
