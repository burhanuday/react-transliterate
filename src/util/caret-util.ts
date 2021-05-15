export function getInputSelection(el: HTMLInputElement) {
  const start = 0;
  const end = 0;

  if (!el) {
    return { start, end };
  }

  if (
    typeof el.selectionStart === "number" &&
    typeof el.selectionEnd === "number"
  ) {
    return { start: el.selectionStart, end: el.selectionEnd };
  }

  /**
   * IE specific code
   * TS throws error so is commented out
   */

  // if (!document) {
  //   return { start, end };
  // }

  // const range = document.selection.createRange();

  // if (!range && range.parentElement() !== el) {
  //   return { start, end };
  // }

  // const len = el.value.length;
  // const normalizedValue = el.value.replace(/\r\n/g, "\n");
  // const textInputRange = el.createTextRange();

  // textInputRange.moveToBookmark(range.getBookmark());

  // const endRange = el.createTextRange();

  // endRange.collapse(false);

  // if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
  //   start = end = len;
  // } else {
  //   start = -textInputRange.moveStart("character", -len);
  //   start += normalizedValue.slice(0, start).split("\n").length - 1;

  //   if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
  //     end = len;
  //   } else {
  //     end = -textInputRange.moveEnd("character", -len);
  //     end += normalizedValue.slice(0, end).split("\n").length - 1;
  //   }
  // }

  return { start, end };
}

export function setCaretPosition(elem: HTMLInputElement, caretPos: number) {
  if (elem) {
    /**
     * IE specific code
     * TS throws error so is commented out
     */
    // if (elem.createTextRange) {
    //   const range = elem.createTextRange();

    //   range.move("character", caretPos);
    //   range.select();
    // } else {
    //   if (elem.selectionStart) {
    //     elem.focus();
    //     elem.setSelectionRange(caretPos, caretPos);
    //   } else {
    //     elem.focus();
    //   }
    // }

    if (elem.selectionStart) {
      elem.focus();
      elem.setSelectionRange(caretPos, caretPos);
    } else {
      elem.focus();
    }
  }
}
