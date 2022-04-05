import { Vue, DirectiveBinding } from '@app/provider';
import { dom, $uuid, obj, browser } from '@app/utils';

interface IDoms {
    readonly id: string;
    style: HTMLStyleElement;
    container: HTMLDivElement;
    header: {
        row: HTMLDivElement;
        fixed: HTMLDivElement;
        scroll: HTMLDivElement;
    };
    body: {
        row: HTMLDivElement;
        fixed: HTMLDivElement;
        scroll: HTMLDivElement;
    };
    footer: {
        row: HTMLDivElement;
        fixed: HTMLDivElement;
        scroll: HTMLDivElement;
    };
}

const __fx__ = '__fx_table__',
    __lk__ = '__fx_link__',
    __lkh1__ = '__fx_link_h1__',
    __lkh2__ = '__fx_link_h2__',
    initFx = (el: HTMLElement, binding: DirectiveBinding) => {
        let c = dom.create,
            id = $uuid.domId,
            // table header fixed
            tblhf = c('table'),
            // table header scroll
            tblhs = c('table'),
            tblbf = c('table'),
            tblff = c('table'),
            tblfs = c('table'),
            sty = dom.getAttr(el, 'style'),
            hr = c('div', { 'class': 'fx-row-header' }),
            hf = c('div', { 'class': 'fx-fixed-header' }),
            hsc = c('div', { 'class': 'fx-scroll-header' }),
            br = c('div', { 'class': 'fx-row-body' }),
            bf = c('div', { 'class': 'fx-fixed-body' }),
            bsc = c('div', { 'class': 'fx-scroll-body' }),
            fr = c('div', { 'class': 'fx-row-footer' }),
            ff = c('div', { 'class': 'fx-fixed-footer' }),
            fsc = c('div', { 'class': 'fx-scroll-footer' }),
            st = c('style', { 'rel': 'stylesheet', 'type': 'text/css' }),
            container = c('div', { 'class': 'fx-container' });

        // remove old style of table
        if (sty) {
            dom.setAttr(el, 'data-style', sty);
        }

        if (browser.mobile) {
            dom.addClass(container, 'fx-container-mobile');
        }

        dom.removeAttr(el, 'style');

        dom.addClass(el, 'fx-table');

        // copy class of real table to 5 clone tables
        let cla: string = dom.getAttr(el, 'class');
        {
            dom.setAttr(tblhf, 'class', cla);
            dom.setAttr(tblhs, 'class', cla);
            dom.setAttr(tblbf, 'class', cla);
            dom.setAttr(tblff, 'class', cla);
            dom.setAttr(tblfs, 'class', cla);
        }

        // replace table by fx container
        el.parentElement.replaceChild(container, el);

        //container.appendChild(st);
        document.head.appendChild(st);

        container.appendChild(hr);
        container.appendChild(br);
        container.appendChild(fr);

        hf.appendChild(tblhf);
        hsc.appendChild(tblhs);

        tblhf.appendChild(dom.create('thead'));
        tblhf.appendChild(dom.create('tbody'));

        tblhs.appendChild(dom.create('thead'));
        tblhs.appendChild(dom.create('tbody'));

        bf.appendChild(tblbf);

        tblbf.appendChild(dom.create('tbody'));

        ff.appendChild(tblff);
        fsc.appendChild(tblfs);

        tblff.appendChild(dom.create('tbody'));
        tblff.appendChild(dom.create('tfoot'));

        tblfs.appendChild(dom.create('tbody'));
        tblfs.appendChild(dom.create('tfoot'));

        hr.appendChild(hf);
        hr.appendChild(hsc);

        br.appendChild(bf);
        br.appendChild(bsc);

        fr.appendChild(ff);
        fr.appendChild(fsc);

        bsc.appendChild(el);

        dom.setAttr(container, 'role', id);

        dom.data.set(el, __fx__, {
            id,
            style: st,
            container,
            header: {
                row: hr,
                fixed: hf,
                scroll: hsc
            },
            body: {
                row: br,
                fixed: bf,
                scroll: bsc
            },
            footer: {
                row: fr,
                fixed: ff,
                scroll: fsc
            }
        });
    },
    moveHead = (el: HTMLTableElement, binding: DirectiveBinding) => {
        let options: {
            width?: number;
            displayRow?: number;
            fixedColumn?: number;
            columns: Array<number>;
        } = binding.value,
            doms: IDoms = dom.data.get(el, __fx__),
            // fixed table elements
            tab1 = doms.header.fixed.querySelector('table'),
            head1 = tab1.querySelector('thead'),
            body1 = tab1.querySelector('tbody'),
            // scroll table elements
            tab2 = doms.header.scroll.querySelector('table'),
            head2 = tab2.querySelector('thead'),
            body2 = tab2.querySelector('tbody'),
            // get first row of tbody (real table)
            row = el.querySelector('table>tbody>tr') || el.querySelector('table>thead>tr') || el.querySelector('table>tfoot>tr');

        if (row && body1.childElementCount == 0 && body2.childElementCount == 0) {
            let $rowf = dom.create('tr'),
                $rows = dom.create('tr'),
                $cells = [].slice.call(row.querySelectorAll('th, td')),
                $cols: number = $cells
                    .map((cell: HTMLTableCellElement) => dom.getAttr(cell, 'colspan') || '1')
                    .map((v: string) => Number(v))
                    .reduce((a: number, b: number) => a + b, 0);

            for (let cindex = 0; cindex < $cols; cindex++) {
                let $cell = dom.create('td', {
                    'html': '&nbsp;',
                    'column': cindex
                });

                if (options && obj.has(options, 'fixedColumn')) {
                    if (cindex < options.fixedColumn) {
                        $rowf.appendChild($cell);
                    } else {
                        $rows.appendChild($cell);
                    }
                }
            }

            body1.appendChild($rowf);
            body2.appendChild($rows);
        }

        el.querySelectorAll('table>thead>tr')
            .forEach((row: HTMLTableRowElement, index: number) => {
                dom.removeAttr(row, 'style');

                if (!dom.data.get(row, __lkh1__) && !dom.data.get(row, __lkh2__)) {
                    let $rowf = dom.create('tr'),
                        $rows = dom.create('tr');

                    dom.data.set(row, __lkh1__, $rowf);
                    dom.data.set($rowf, __lkh1__, row);

                    dom.data.set(row, __lkh2__, $rows);
                    dom.data.set($rows, __lkh2__, row);

                    [].slice.call(row.querySelectorAll('th'))
                        .forEach((cell: HTMLTableDataCellElement, index: number) => {
                            dom.setAttr(cell, 'column', index);

                            dom.removeAttr(cell, 'style');

                            if (options && obj.has(options, 'fixedColumn')) {
                                let $cell = dom.create('th', { 'column': 'hide' });
                                dom.data.set(cell, __lk__, $cell);
                                dom.data.set($cell, __lk__, cell);

                                row.replaceChild($cell, cell);

                                if (index < options.fixedColumn) {
                                    $rowf.appendChild(cell);
                                } else {
                                    $rows.appendChild(cell);
                                }
                            }
                        });

                    let at1 = head1.querySelector(`tr:nth-child(${index + 1})`),
                        at2 = head2.querySelector(`tr:nth-child(${index + 1})`);

                    if (!at1) {
                        head1.appendChild($rowf);
                    } else {
                        head1.insertBefore($rowf, at1);
                    }

                    if (!at2) {
                        head2.appendChild($rows);
                    } else {
                        head2.insertBefore($rows, at2);
                    }
                } else {
                    let $rowf = dom.data.get(row, __lkh1__),
                        $rows = dom.data.get(row, __lkh2__);

                    [].slice.call(row.querySelectorAll('th'))
                        .forEach((cell: HTMLTableDataCellElement, index: number) => {
                            if (options && obj.has(options, 'fixedColumn')) {
                                if (index < options.fixedColumn) {
                                    $rowf.appendChild(dom.data.get(cell, __lk__));
                                } else {
                                    $rows.appendChild(dom.data.get(cell, __lk__));
                                }
                            }
                        });
                }
            });
    },
    moveFixedBody = (el: HTMLTableElement, binding: DirectiveBinding) => {
        let options: {
            width?: number;
            displayRow?: number;
            fixedColumn?: number;
            columns: Array<number>;
        } = binding.value,
            doms: IDoms = dom.data.get(el, __fx__),
            table = doms.body.fixed.querySelector('table'),
            body = table.querySelector('tbody') || dom.create('tbody'),
            rows = [].slice.call(el.querySelectorAll('table>tbody>tr'));

        table.appendChild(body);

        rows.forEach((row: HTMLTableRowElement, rid: number) => {
            dom.removeAttr(row, 'style');

            let fc: number = dom.data.get(row, 'fixed_counts') || 0;

            if (!dom.data.get(row, __lk__)) {
                let $row = dom.clone(row);

                dom.data.set(row, __lk__, $row);
                dom.data.set($row, __lk__, row);

                [].slice.call(row.querySelectorAll('th, td'))
                    .forEach((cell: HTMLTableDataCellElement, cindex: number) => {
                        let colSpan = cell.colSpan || 1,
                            rowSpan = cell.rowSpan || 1;

                        fc += colSpan;

                        if (rowSpan > 1) {
                            for (let k = rid + 1; k <= rid + rowSpan - 1; k++) {
                                let nextRow = rows[k];

                                if (nextRow) {
                                    let cs: number = dom.data.get(nextRow, 'fixed_counts') || 0;

                                    dom.data.set(nextRow, 'fixed_counts', cs + fc);
                                }
                            }
                        }

                        dom.setAttr(cell, 'column', fc - colSpan);

                        dom.removeAttr(cell, 'style');

                        if (options && obj.has(options, 'fixedColumn')) {
                            if (fc <= options.fixedColumn) {
                                let $cell = dom.create('td', { 'column': 'hide' });

                                if (colSpan) {
                                    if (!`${colSpan}`.match(/^(0|1)+$/)) {
                                        dom.setAttr($cell, 'colspan', colSpan);
                                    } else {
                                        dom.removeAttr(cell, 'colspan');
                                    }
                                }

                                if (rowSpan) {
                                    if (!`${rowSpan}`.match(/^(0|1)+$/)) {
                                        dom.setAttr($cell, 'rowspan', rowSpan);
                                    } else {
                                        dom.removeAttr(cell, 'rowspan');
                                    }
                                }

                                dom.data.set(cell, __lk__, $cell);
                                dom.data.set($cell, __lk__, cell);

                                row.replaceChild($cell, cell);

                                $row.appendChild(cell);
                            }
                        }
                    });

                let at = body.querySelector(`tr:nth-child(${rid + 1})`);

                if (!at) {
                    body.appendChild($row);
                } else {
                    body.insertBefore($row, at);
                }
            } else {
                let $row = dom.data.get(row, __lk__);

                [].slice.call(row.querySelectorAll('th, td'))
                    .forEach((cell: HTMLTableDataCellElement, index: number) => {
                        let colSpan = cell.colSpan || 1,
                            rowSpan = cell.rowSpan || 1;

                        fc += colSpan;

                        if (rowSpan > 1) {
                            for (let k = rid + 1; k <= rid + rowSpan - 1; k++) {
                                let nextRow = rows[k];

                                if (nextRow) {
                                    let cs: number = dom.data.get(nextRow, 'fixed_counts') || 0;

                                    dom.data.set(nextRow, 'fixed_counts', cs + fc);
                                }
                            }
                        }

                        dom.removeAttr(cell, 'style');

                        if (options && obj.has(options, 'fixedColumn')) {
                            if (fc <= options.fixedColumn) {
                                if (dom.getAttr(cell, 'column') !== 'hide') {
                                    let $cell = dom.create('td', { 'column': 'hide' });

                                    dom.data.set(cell, __lk__, $cell);
                                    dom.data.set($cell, __lk__, cell);

                                    row.replaceChild($cell, cell);

                                    $row.appendChild(cell);
                                }
                            } else {
                                if (dom.getAttr(cell, 'column') === 'hide') {
                                    row.replaceChild(dom.data.get(cell, __lk__), cell);
                                }
                            }
                        }
                    });
            }
        });
    },
    moveFoot = (el: HTMLTableElement, binding: DirectiveBinding) => {
        let options: {
            width?: number;
            displayRow?: number;
            fixedColumn?: number;
            columns: Array<number>;
        } = binding.value,
            doms: IDoms = dom.data.get(el, __fx__),
            tab1 = doms.footer.fixed.querySelector('table'),
            head1 = tab1.querySelector('tfoot'),
            body1 = tab1.querySelector('tbody'),
            tab2 = doms.footer.scroll.querySelector('table'),
            head2 = tab2.querySelector('tfoot'),
            body2 = tab2.querySelector('tbody'),
            row = el.querySelector('table>tbody>tr') || el.querySelector('table>thead>tr') || el.querySelector('table>tfoot>tr'),
            rows = [].slice.call(el.querySelectorAll('table>tfoot>tr'));

        if (row && body1.childElementCount == 0 && body2.childElementCount == 0) {
            let $rowf = dom.create('tr'),
                $rows = dom.create('tr'),
                $cells = [].slice.call(row.querySelectorAll('th, td')),
                $cols: number = $cells
                    .map((cell: HTMLTableCellElement) => dom.getAttr(cell, 'colspan') || '1')
                    .map((v: string) => Number(v))
                    .reduce((a: number, b: number) => a + b, 0);

            for (let cindex = 0; cindex < $cols; cindex++) {
                let $cell = dom.create('td', {
                    'html': '&nbsp;',
                    'column': cindex
                });

                if (options && obj.has(options, 'fixedColumn')) {
                    if (cindex < options.fixedColumn) {
                        $rowf.appendChild($cell);
                    } else {
                        $rows.appendChild($cell);
                    }
                }
            }

            body1.appendChild($rowf);
            body2.appendChild($rows);
        }

        rows
            .forEach((row: HTMLTableRowElement, rid: number) => {
                dom.removeAttr(row, 'style');

                let fc: number = dom.data.get(row, 'fixed_counts') || 0;

                if (!dom.data.get(row, __lkh1__) && !dom.data.get(row, __lkh2__)) {
                    let $rowf = dom.create('tr'),
                        $rows = dom.create('tr');

                    dom.data.set(row, __lkh1__, $rowf);
                    dom.data.set($rowf, __lkh1__, row);

                    dom.data.set(row, __lkh2__, $rows);
                    dom.data.set($rows, __lkh2__, row);

                    [].slice.call(row.querySelectorAll('th, td'))
                        .forEach((cell: HTMLTableDataCellElement, index: number) => {
                            let colSpan = cell.colSpan || 1,
                                rowSpan = cell.rowSpan || 1;

                            fc += colSpan;

                            if (rowSpan > 1) {
                                for (let k = rid + 1; k <= rid + rowSpan - 1; k++) {
                                    let nextRow = rows[k];

                                    if (nextRow) {
                                        let cs: number = dom.data.get(nextRow, 'fixed_counts') || 0;

                                        dom.data.set(nextRow, 'fixed_counts', cs + fc);
                                    }
                                }
                            }

                            dom.setAttr(cell, 'column', fc - colSpan);

                            dom.removeAttr(cell, 'style');

                            if (options && obj.has(options, 'fixedColumn')) {
                                let $cell = dom.create(cell.nodeName === 'TH' ? 'th' : 'td', { 'column': 'hide' });
                                dom.data.set(cell, __lk__, $cell);
                                dom.data.set($cell, __lk__, cell);

                                row.replaceChild($cell, cell);

                                if (fc <= options.fixedColumn) {
                                    $rowf.appendChild(cell);
                                } else {
                                    $rows.appendChild(cell);
                                }
                            }
                        });

                    let at1 = head1.querySelector(`tr:nth-child(${rid + 1})`),
                        at2 = head2.querySelector(`tr:nth-child(${rid + 1})`);

                    if (!at1) {
                        head1.appendChild($rowf);
                    } else {
                        head1.insertBefore($rowf, at1);
                    }

                    if (!at2) {
                        head2.appendChild($rows);
                    } else {
                        head2.insertBefore($rows, at2);
                    }
                } else {
                    let $rowf = dom.data.get(row, __lkh1__),
                        $rows = dom.data.get(row, __lkh2__);

                    [].slice.call(row.querySelectorAll('th, td'))
                        .forEach((cell: HTMLTableDataCellElement, index: number) => {
                            let colSpan = cell.colSpan || 1,
                                rowSpan = cell.rowSpan || 1;

                            fc += colSpan;

                            if (rowSpan > 1) {
                                for (let k = rid + 1; k <= rid + rowSpan - 1; k++) {
                                    let nextRow = rows[k];

                                    if (nextRow) {
                                        let cs: number = dom.data.get(nextRow, 'fixed_counts') || 0;

                                        dom.data.set(nextRow, 'fixed_counts', cs + fc);
                                    }
                                }
                            }

                            if (options && obj.has(options, 'fixedColumn')) {
                                if (fc <= options.fixedColumn) {
                                    $rowf.appendChild(dom.data.get(cell, __lk__));
                                } else {
                                    $rows.appendChild(dom.data.get(cell, __lk__));
                                }
                            }
                        });
                }
            });
    },
    removeRows = (el: HTMLTableElement, binding: DirectiveBinding) => {
        // remove row
        let doms: IDoms = dom.data.get(el, __fx__),
            table = doms.body.fixed.querySelector('table'),
            realrows = [].slice.call(el.querySelectorAll('tbody>tr'));

        if (table) {
            let body = table.querySelector('tbody');

            if (body) {
                body.querySelectorAll('tr')
                    .forEach((row: HTMLTableRowElement) => {
                        let linked = dom.data.get(row, __lk__) as HTMLTableRowElement;

                        if (realrows.indexOf(linked) === -1) {
                            body.removeChild(row);
                        }
                    });
            }
        }
    },
    initEvt = (el: HTMLTableElement, binding: DirectiveBinding) => {
        let options: {
            width?: number;
            displayRow?: number;
            fixedColumn?: number;
            columns: Array<number>;
        } = binding.value,
            doms: IDoms = dom.data.get(el, __fx__);

        dom.registerEventHandler(doms.body.scroll, 'scroll', (evt: Event) => {
            evt.preventDefault();
            evt.stopPropagation();

            doms.body.fixed.scrollTop = doms.body.scroll.scrollTop;

            doms.header.scroll.scrollLeft = doms.body.scroll.scrollLeft;
            doms.footer.scroll.scrollLeft = doms.body.scroll.scrollLeft;
        });

        dom.registerEventHandler(doms.footer.scroll, 'scroll', (evt: Event) => {
            evt.preventDefault();
            evt.stopPropagation();

            doms.body.scroll.scrollLeft = doms.footer.scroll.scrollLeft;
            doms.header.scroll.scrollLeft = doms.footer.scroll.scrollLeft;
        });

        dom.registerEventHandler(doms.container, 'wheel', (evt: WheelEvent) => {
            evt.preventDefault();
            evt.stopPropagation();

            let step = evt.deltaY ? 125 : 40,
                wheel = evt.deltaY,
                scrollY = dom.hasClass(doms.container, 'has-scroll-y');

            if (evt.shiftKey || !scrollY) {
                if (dom.hasClass(doms.container, 'has-scroll-x')) {
                    if (wheel > 0) {
                        doms.body.scroll.scrollLeft += step;
                    } else {
                        doms.body.scroll.scrollLeft -= step;
                    }
                }
            } else {
                if (dom.hasClass(doms.container, 'has-scroll-y')) {
                    if (wheel > 0) {
                        doms.body.scroll.scrollTop += step;
                    } else {
                        doms.body.scroll.scrollTop -= step;
                    }
                }
            }
        });

        dom.registerEventHandler(doms.body.scroll, 'touchstart', (evt: TouchEvent) => {
            let d = dom.data,
                tg = doms.body.scroll,
                tx = evt.changedTouches[0].screenX,
                ty = evt.changedTouches[0].screenY;

            d.set(tg, '__touch_st__', {
                tx,
                ty,
                tt: tg.scrollTop,
                tl: tg.scrollLeft
            });
        });

        dom.registerEventHandler(doms.body.scroll, 'touchmove', (evt: TouchEvent) => {
            let d = dom.data,
                tg = doms.body.scroll,
                txm: number = evt.changedTouches[0].screenX,
                tym: number = evt.changedTouches[0].screenY,
                touch: {
                    tx: number;
                    ty: number;
                    tt: number;
                    tl: number;
                } = d.get(tg, '__touch_st__'),
                ym: number = tym - touch.ty,
                xm: number = txm - touch.tx;

            if (Math.abs(ym) > Math.abs(xm)) {
                tg.scrollTop = touch.tt - ym;
            } else {
                tg.scrollLeft = touch.tl - xm;
            }

            evt.preventDefault();
            evt.stopPropagation();
        });
    }, updateStyle = (el: HTMLTableElement, binding: DirectiveBinding) => {
        let options: {
            width?: number;
            displayRow?: number;
            fixedColumn?: number;
            columns: Array<number>;
        } = binding.value,
            doms: IDoms = dom.data.get(el, __fx__),
            thead = el.querySelector('table>thead'),
            tfoot = el.querySelector('table>tfoot'),
            rows = el.querySelectorAll('table>tbody>tr'),
            rows2 = doms.header.scroll.querySelectorAll('table>tbody>tr'),
            rows3 = doms.footer.scroll.querySelectorAll('table>tbody>tr'),
            fxWidth = options.columns.filter((c: number, i: number) => i < options.fixedColumn).reduce((a, b) => a + b, 0),
            scWidth = options.columns.filter((c: number, i: number) => i >= options.fixedColumn).reduce((a, b) => a + b, 0),
            rowHeight = [].slice.call(rows.length ? rows : rows2.length ? rows2 : rows3).map((r: HTMLTableRowElement) => r.clientHeight).reduce((a, b) => a > b ? a : b, 0),
            styles: string[] = [];

        if (options.fixedColumn) {
            dom.addClass(doms.container, 'has-fixed');
        } else {
            dom.removeClass(doms.container, 'has-fixed');
        }

        if (thead) {
            dom.addClass(doms.container, 'has-header');
        } else {
            dom.removeClass(doms.container, 'has-header');
        }

        if (tfoot) {
            dom.addClass(doms.container, 'has-footer');
        } else {
            dom.removeClass(doms.container, 'has-footer');
        }

        if (rows.length && scWidth > doms.body.scroll.clientWidth) {
            dom.addClass(doms.container, 'has-scroll-x');
        } else {
            dom.removeClass(doms.container, 'has-scroll-x');
        }

        if (rows.length && options.displayRow && options.displayRow < rows.length) {
            dom.addClass(doms.container, 'has-scroll-y');
        } else {
            dom.removeClass(doms.container, 'has-scroll-y');
        }

        styles.push(`[role='${doms.id}'] div[class^='fx-row'] { position: relative; }`);
        styles.push(`[role='${doms.id}'] .fx-row-body { z-index: 2; background-color: #fff; }`);
        styles.push(`[role='${doms.id}'] .fx-row-header, [role='${doms.id}'] .fx-row-footer { z-index: 1 }`);

        styles.push(`[role='${doms.id}'].has-header .fx-row-body { margin-top: -${rowHeight}px; }`);
        styles.push(`[role='${doms.id}'].has-footer .fx-row-body { margin-bottom: -${rowHeight}px; }`);
        styles.push(`[role='${doms.id}'] tr>th[column='hide'], [role='${doms.id}'] tr>td[column='hide'] { display: none; }`);

        options.columns.forEach((c: number, i: number) => {
            styles.push(`[role='${doms.id}'] tr>th[column='${i}']:not([colspan]), [role='${doms.id}'] tr>td[column='${i}']:not([colspan]) { width: ${c}px; min-width: ${c}px; max-width: ${c}px; }`);
        });

        styles.push(`[role='${doms.id}'] .fx-row-body .fx-table tbody tr:last-child:not(:nth-child(n + 5)) th, [role='${doms.id}'] .fx-row-body .fx-table tbody tr:last-child:not(:nth-child(n + 5)) td { border-bottom: 1px solid #ddd !important; }`);

        styles.push(`[role='${doms.id}'] .fx-fixed-header, [role='${doms.id}'] .fx-fixed-body, [role='${doms.id}'] .fx-fixed-footer { width: ${fxWidth}px; }`);
        styles.push(`[role='${doms.id}'] .fx-scroll-body { width: calc(100% - ${fxWidth}px); }`);
        styles.push(`[role='${doms.id}'] .fx-scroll-header, [role='${doms.id}'] .fx-scroll-footer { width: calc(100% - ${fxWidth}px); }`);
        styles.push(`[role='${doms.id}'] .fx-fixed-body, [role='${doms.id}'] .fx-scroll-body { min-height: ${(options.displayRow || 5) * rowHeight - 1}px; max-height: ${(options.displayRow || 5) * rowHeight - 1}px; }`);

        doms.style.innerHTML = styles.join('\n');

        // restyle after add or remove row
        doms.body.scroll.dispatchEvent(new Event('scroll'));
    };

Vue.directive('fxtable', {
    inserted(el: HTMLTableElement, binding: DirectiveBinding) {
        initFx(el, binding);

        initEvt(el, binding);

        moveHead(el, binding);

        moveFixedBody(el, binding);

        moveFoot(el, binding);

        updateStyle(el, binding);
    },
    componentUpdated(el: HTMLTableElement, binding: DirectiveBinding) {
        removeRows(el, binding);

        moveHead(el, binding);

        moveFixedBody(el, binding);

        moveFoot(el, binding);

        updateStyle(el, binding);
    },
    unbind(el: HTMLTableElement, binding: DirectiveBinding) {
        let doms: IDoms = dom.data.get(el, __fx__);

        // remove style element when directive unbind
        // (switch view or remove table)
        document.head.removeChild(doms.style);
    }
});