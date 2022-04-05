import { Vue } from '@app/provider';
import { component, Prop } from '@app/core/component';

@component({
    template: `<div class="table-container" v-bind:role="roleId">
        <div class="table-header" >
            <button ref="previous" v-bind:class="previousClass" v-on:click="previous" disabled>前項</button>
            <button ref="next" v-bind:class="nextClass" v-on:click="next">次項</button>
            <table v-bind:class="tableClass">
                <tbody></tbody>
            </table>
        </div>
        <div class="table-body" style="margin-bottom: -1px; margin-top: -1px">
            <table v-bind:class="tableClass"
                v-on:touchstart="handleTouchStart"
                v-on:touchend="handleTouchEnd">
                <slot/>
            </table>
        </div>
        <div class="table-footer">
            <table v-bind:class="tableClass">
                <tbody></tbody>
            </table>
        </div>

    </div>`
})
export class FixTableComponent extends Vue {

    @Prop({ default: 'table table-bordered table-sm m-0' })
    public tableClass: string;

    @Prop({ default: 'btn btn-secondary btn-sm'})
    public previousClass: string;

    @Prop({ default: 'btn btn-secondary btn-sm'})
    public nextClass: string;

    @Prop({ default: 4 })
    public displayColumnsNumber: number;

    @Prop({ default: 5 })
    public rowNumber: number;

    private roleId: string = Date.now().toString();

    public startDisplayIndex: number = 1;
    public oldStartDisplayIndex: number = 1;

    private headerTable: HTMLTableElement = null;
    private bodyTable: HTMLTableElement = null;
    private footerTable: HTMLTableElement = null;

    private xDown: number = null;
    private yDown: number = null;

    private firstHeaderWidth: number = null;
    private lastHeaderWidth: number = null;
    private middleHeaderWidth: number = null;

    private flexibleColumns: number = null;
    private noChangeFooter = true;

    public mounted() {
        this.bodyTable = this.$el.querySelector('.table-container .table-body table') as HTMLTableElement;
        this.headerTable = this.$el.querySelector('.table-container .table-header table') as HTMLTableElement;
        this.footerTable = this.$el.querySelector('.table-container .table-footer table') as HTMLTableElement;

        this.addBlankColums();

        this.moveTheadAndTfoot();

        this.hiddenColumns(this.displayColumnsNumber + 1, this.flexibleColumns);

        this.addPrevNextButtons();

        this.setStyle();
    }

    private addBlankColums() {
        let numberOfFlexibleColumn = this.bodyTable.tHead.firstChild.childNodes.length - 2;
        let numberOfExcessColumn = numberOfFlexibleColumn % this.displayColumnsNumber;

        if (numberOfExcessColumn === 0) {
            return;
        }

        let numberOfBlankColumn = this.displayColumnsNumber - numberOfExcessColumn;
        let header = (this.bodyTable.tHead.children[0] as HTMLTableRowElement);
        for (let i = 0; i < numberOfBlankColumn; i++) {
            header.insertBefore(document.createElement('TH'), header.lastChild);
        }

        let rows = this.bodyTable.tBodies[0].children as HTMLCollection;
        Array.from(rows).forEach((row) => {
            for (let i = 0; i < numberOfBlankColumn; i++) {
                row.insertBefore(document.createElement('TD'), row.lastChild);
            }
        });

        if (this.bodyTable.tFoot.firstChild.childNodes.length !== 1) {
            let footer = this.bodyTable.tFoot.children[0] as HTMLTableRowElement;
            for (let i = 0; i < numberOfBlankColumn; i++) {
                footer.insertBefore(document.createElement('TD'), footer.lastChild);
            }
        }
    }

    private moveTheadAndTfoot() {
        this.headerTable.tHead = this.bodyTable.tHead;
        this.footerTable.tFoot = this.bodyTable.tFoot;

        this.noChangeFooter = this.footerTable.tFoot.firstChild.childNodes.length === 1;
        this.flexibleColumns = this.headerTable.tHead.firstChild.childNodes.length - 2;
    }

    private setStyle() {
        this.$nextTick(() => {

            this.generateStyle();

            let rows = this.bodyTable.tBodies[0].children;
            if (rows.length === 0) {
                return;
            }
            this.setStyleOfTableBody(rows);
        });
    }

    private calculateColumnsWidth() {
        let theFirstHeader = this.headerTable.querySelector('thead>tr>th:first-child') as HTMLTableCellElement;
        let theLastHeader = this.headerTable.querySelector('thead>tr>th:last-child') as HTMLTableCellElement;

        let firstHeaderAttribute = theFirstHeader.getAttribute('c-width');
        let lastHeaderAttribute = theLastHeader.getAttribute('c-width');

        this.firstHeaderWidth = firstHeaderAttribute !== null ? +firstHeaderAttribute : theFirstHeader.offsetWidth;
        this.lastHeaderWidth = lastHeaderAttribute !== null ? +lastHeaderAttribute : theLastHeader.offsetWidth;

        let totalMidddleColumnsWidth = (this.$el as HTMLElement).offsetWidth - this.firstHeaderWidth - this.lastHeaderWidth;
        this.middleHeaderWidth = Math.floor(totalMidddleColumnsWidth / this.displayColumnsNumber - 1);
    }

    private createColumnsCSS(): string {
        let numberOfCols = this.headerTable.tHead.firstChild.childNodes.length;
        let css: string = '';

        css += this.createColumnStyle(1, this.firstHeaderWidth);
        for (let i = 2; i < numberOfCols; i++) {
            css += this.createColumnStyle(i, this.middleHeaderWidth);
        }
        css += this.createColumnStyle(numberOfCols, this.lastHeaderWidth);

        return css;
    }

    private createStyleTag(css: string): HTMLStyleElement {
        let styleTag = document.createElement('style');
        styleTag.setAttribute('role', this.roleId);
        styleTag.setAttribute('type', 'text/css');
        styleTag.innerHTML = css;

        return styleTag;
    }

    private generateStyle() {
        this.calculateColumnsWidth();
        let css = this.createColumnsCSS();
        let styleTag = this.createStyleTag(css);

        let head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(styleTag);
    }

    private createColumnStyle(index: number, width: number): string {
        return `
            [role="${this.roleId}"] tr td:nth-child(${index}),\n
            [role="${this.roleId}"] tr th:nth-child(${index}) {\n
                width: ${width}px;\n
                min-width: ${width}px;\n
                max-width: ${width}px;\n
            }\n
        `;
    }

    private setStyleOfTableBody(rows: any) {
        let height: number = (rows[0] as HTMLTableRowElement).offsetHeight;

        let styleTag = document.querySelector(`style[role="${this.roleId}"]`) as HTMLStyleElement;
        let css = `.table-container .table-body {
            height: ${height * this.rowNumber - ((this.rowNumber - 1) / 3)}px;
            overflow-y: scroll;
        }`;
        styleTag.innerHTML += css;
    }

    private changeDisplayColumn() {
        // hidden
        let maxHiddenColIndex = this.oldStartDisplayIndex + this.displayColumnsNumber - 1;
        this.hiddenColumns(this.oldStartDisplayIndex, maxHiddenColIndex);

        // display
        let maxDisplayColIndex = this.startDisplayIndex + this.displayColumnsNumber - 1;
        this.displayColumns(this.startDisplayIndex, maxDisplayColIndex);
    }

    private hiddenColumns(startIndex: number, endIndex: number) {
        let headerColumns = this.headerTable.tHead.firstChild.childNodes;
        let footerColumns = this.footerTable.tFoot.firstChild.childNodes;
        let bodyRows = this.bodyTable.tBodies[0].children as HTMLCollection;

        // header columns
        for (let i = startIndex; i <= endIndex; i++) {
            (headerColumns[i] as HTMLTableHeaderCellElement).classList.add('d-none');
        }

        Array.from(bodyRows).forEach((row) => {
            // body cells
            for (let i = startIndex; i <= endIndex; i++) {
                (row.childNodes[i] as HTMLTableCellElement).classList.add('d-none');
            }
        });

        if (this.noChangeFooter) {
            return;
        }

        // footer columns
        for (let i = startIndex; i <= endIndex; i++) {
            (footerColumns[i] as HTMLTableHeaderCellElement).classList.add('d-none');
        }

    }

    private displayColumns(startIndex: number, endIndex: number) {
        let headerColumns = this.headerTable.tHead.firstChild.childNodes;
        let footerColumns = this.footerTable.tFoot.firstChild.childNodes;
        let bodyRows = this.bodyTable.tBodies[0].children as HTMLCollection;

        // header columns
        for (let i = startIndex; i <= endIndex; i++) {
            (headerColumns[i] as HTMLTableHeaderCellElement).classList.remove('d-none');
        }


        Array.from(bodyRows).forEach((row) => {
            // body cells
            for (let i = startIndex; i <= endIndex; i++) {
                (row.childNodes[i] as HTMLTableCellElement).classList.remove('d-none');
            }
        });

        if (this.noChangeFooter) {
            return;
        }

        // footer columns
        for (let i = startIndex; i <= endIndex; i++) {
            (footerColumns[i] as HTMLTableHeaderCellElement).classList.remove('d-none');
        }
    }

    private addPrevNextButtons() {
        let headerColumns = this.headerTable.tHead.children[0].children;
        headerColumns[0].appendChild(this.$refs.previous as Node);

        let nextButton = this.$refs.next as HTMLButtonElement;
        if ( this.displayColumnsNumber === this.flexibleColumns) {
            nextButton.disabled = true;
        }
        headerColumns[headerColumns.length - 1].appendChild(nextButton);
    }

    public previous() {
        let self = this;

        if (self.startDisplayIndex === 1) {
            return;
        }

        self.oldStartDisplayIndex = self.startDisplayIndex;
        self.startDisplayIndex = self.startDisplayIndex - self.displayColumnsNumber;

        if (self.startDisplayIndex === 1) {
            (self.$refs.previous as HTMLButtonElement).disabled = true;
        }

        self.enableButton(self.$refs.next as HTMLButtonElement);
        self.changeDisplayColumn();
    }

    public next() {
        let self = this;
        if (self.startDisplayIndex + self.displayColumnsNumber > self.flexibleColumns) {
            return;
        }

        self.oldStartDisplayIndex = self.startDisplayIndex;
        self.startDisplayIndex = self.startDisplayIndex + self.displayColumnsNumber;

        if (self.startDisplayIndex + self.displayColumnsNumber > self.flexibleColumns) {
            (self.$refs.next as HTMLButtonElement).disabled = true;
        }

        self.enableButton(self.$refs.previous as HTMLButtonElement);
        self.changeDisplayColumn();
    }

    private enableButton(button: HTMLButtonElement) {
        if (button.disabled === true) {
            button.disabled = false;
        }
    }

    public handleTouchStart(evt) {
        this.xDown = evt.touches[0].clientX;
        this.yDown = evt.touches[0].clientY;
    }

    public handleTouchEnd(evt: TouchEvent) {

        if (!this.xDown || !this.yDown) {
            return;
        }

        let xDiff = this.xDown - evt.changedTouches[0].clientX;
        let yDiff = this.yDown - evt.changedTouches[0].clientY;

        this.xDown = null;
        this.yDown = null;

        if (Math.abs(xDiff) < Math.abs(yDiff)) {
            // up-down swipe
            return;
        }

        if (xDiff === 0) {
            return;
        }

        if (xDiff > 0) {
            this.next();
        } else {
            this.previous();
        }

    }

    public destroyed() {
        let styleTag = document.querySelector(`style[role="${this.roleId}"]`) as HTMLStyleElement;
        styleTag.remove();
    }
}