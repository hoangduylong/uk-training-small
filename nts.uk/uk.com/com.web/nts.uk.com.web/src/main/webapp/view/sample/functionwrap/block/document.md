# Explain

## Use with kiban wrapp function
``` js
// Block all View 
nts.uk.ui.block.grayout();
nts.uk.ui.block.invisible();

// Clear all view
nts.uk.ui.block.clear();

// Block area
const area = document.querySelector('#content');

nts.uk.ui.block.grayout(area);
nts.uk.ui.block.invisible(area);

// Clear area
nts.uk.ui.block.clear(area);
```

## Use in new modern ViewModel
``` js
const vm = this;

// Block all View
vm.$blockui('show');
vm.$blockui('invisible');

// Clear all view
vm.$blockui('clear');

// Block area
vm.$blockui('grayoutView');
vm.$blockui('invisibleView');

// Clear area
vm.$blockui('clearView'); 
```