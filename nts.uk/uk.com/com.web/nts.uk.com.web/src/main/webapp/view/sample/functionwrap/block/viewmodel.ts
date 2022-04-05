module nts.uk.ui.sample.functional.block {
    @bean()
    export class ViewModel extends ko.ViewModel {
        blockView() {
           nts.uk.ui.block.grayout();

           setTimeout(() => {
               nts.uk.ui.block.clear();
           }, 3000);
        }


        blockArea() {
            const area = document.querySelector('#content');

            nts.uk.ui.block.grayout(area);

            setTimeout(() => {
                nts.uk.ui.block.clear(area);
            }, 3000);
        }
    }
}