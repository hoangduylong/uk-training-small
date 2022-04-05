/**
 * 
 */
(function () {
  if (typeof window.CustomEvent === "function") {
    return false;
  }

  const dp: CustomEventParameter = {
    bubbles: false,
    cancelable: false,
    detail: undefined
  };

  type CustomEventParameter = {
    bubbles: boolean;
    cancelable: boolean;
    detail: any;
  }

  function CustomEvent(event: string, params: CustomEventParameter) {
    params = params || dp;

    const evt = document.createEvent('CustomEvent');

    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;

  _.extend(window, { CustomEvent });
})();
