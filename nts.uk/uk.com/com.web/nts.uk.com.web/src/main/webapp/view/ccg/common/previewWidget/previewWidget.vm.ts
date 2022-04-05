module nts.uk.com.view.ccg.common.previewWidget.viewmodel {
    import model = nts.uk.com.view.ccg.model;
    import windows = nts.uk.ui.windows;
    import location = nts.uk.request.location;
    import positionUtil = nts.uk.com.view.ccg.positionUtility;

    export class ScreenModel {
        layoutID: any;
        placements: KnockoutObservableArray<model.Placement>;
        isEmpty: KnockoutObservable<boolean>;

        constructor() {
            var self = this;
            self.layoutID = null;
            self.placements = ko.observableArray([]);
            self.placements.subscribe((changes) => {
                if (changes.length > 0)
                    self.isEmpty(false);
                else
                    self.isEmpty(true);
            });
            self.isEmpty = ko.observable(true);
        }

        /** Start Page */
        startPage(): JQueryPromise<any> {
            var self = this;
            var dfd = $.Deferred();
            self.layoutID = location.current.queryString.items['layoutid'];
            service.active(self.layoutID).done((data: model.LayoutDto) => {
                if (data !== undefined) {
                    let listPlacement: Array<model.Placement> = _.map(data.placements, (item) => {
                        return new model.Placement(item);
                    });
                    listPlacement = _.orderBy(listPlacement, ['row', 'column'], ['asc', 'asc']);
                    self.placements(listPlacement);
                }
                _.defer(() => { self.initDisplay(); });
                dfd.resolve();
            }).fail((res: any) => {
                dfd.fail();
            });
            return dfd.promise();
        }

        /** Close Dialog */
        closeDialog(): void {
            windows.close();
        }

        /** Init all Widget display & binding */
        private initDisplay(): void {
            var self = this;
            positionUtil.initReorderPlacements(_.clone(self.placements()), []);
            positionUtil.setupPositionAndSizeAll(self.placements());
        }
        
    }
}