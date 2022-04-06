var nts;
(function (nts) {
    var uk;
    (function (uk) {
        var com;
        (function (com) {
            var view;
            (function (view) {
                var cmf004;
                (function (cmf004) {
                    var i;
                    (function (i) {
                        var service;
                        (function (service) {
                            var ajax = nts.uk.request.ajax;
                            var format = nts.uk.text.format;
                            var paths = {
                                performDataRecover: "ctx/sys/assist/datarestoration/performDataRecover",
                                followProsess: "ctx/sys/assist/datarestoration/followProsess/{0}",
                                breakFollowProcessing: "ctx/sys/assist/datarestoration/breakFollowProcessing",
                                deletePerformDataRecover: "ctx/sys/assist/datarestoration/deletePerformDataRecover/{0}",
                            };
                            /**
                               * send for screen I
                              */
                            function performDataRecover(paramRestore) {
                                return nts.uk.request.ajax('com', paths.performDataRecover, paramRestore);
                            }
                            service.performDataRecover = performDataRecover;
                            ;
                            /**
                            * get followProsess
                            */
                            function followProsess(recoveryProcessingId) {
                                var _path = format(paths.followProsess, recoveryProcessingId);
                                return ajax('com', _path);
                            }
                            service.followProsess = followProsess;
                            /**
                            * update status followProsess End
                            */
                            function deletePerformDataRecover(recoveryProcessingId) {
                                var _path = format(paths.deletePerformDataRecover, recoveryProcessingId);
                                return nts.uk.request.ajax('com', _path);
                            }
                            service.deletePerformDataRecover = deletePerformDataRecover;
                            ;
                            function breakFollowProcessing(paramBreakFollowProcessing) {
                                return nts.uk.request.ajax('com', paths.breakFollowProcessing, paramBreakFollowProcessing);
                            }
                            service.breakFollowProcessing = breakFollowProcessing;
                            ;
                        })(service = i.service || (i.service = {}));
                    })(i = cmf004.i || (cmf004.i = {}));
                })(cmf004 = view.cmf004 || (view.cmf004 = {}));
            })(view = com.view || (com.view = {}));
        })(com = uk.com || (uk.com = {}));
    })(uk = nts.uk || (nts.uk = {}));
})(nts || (nts = {}));
//# sourceMappingURL=cmf004.i.service.js.map