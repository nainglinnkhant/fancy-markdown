// https://github.com/component/textarea-caret-position

declare global {
  interface Window {
    mozInnerScreenX?: unknown
  }
}

// We'll copy the properties below into the mirror div.
// Note that some browsers, such as Firefox, do not concatenate properties
// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
// so we have to list every single property explicitly.
const properties = [
  'direction', // RTL support
  'boxSizing',
  'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflowX',
  'overflowY', // copy the scrollbar for IE

  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',

  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',

  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration', // might not make a difference, but better be safe

  'letterSpacing',
  'wordSpacing',

  'tabSize',
  'MozTabSize',
] as const

const isBrowser = typeof window !== 'undefined'
const isFirefox = isBrowser && window.mozInnerScreenX != null

export const getCurrentWord = (textarea: HTMLTextAreaElement) => {
  const text = textarea.value
  const caretPosition = textarea.selectionStart || 0

  // Find the start and end positions of the word
  let wordStart = caretPosition
  let wordEnd = caretPosition

  // Normally, caret position will always be one index ahead of last word's index,
  // so we need to substract one from caret position to get the last word.
  while (wordStart > 0 && text[wordStart - 1].match(/\S/)) {
    wordStart--
  }

  while (wordEnd < text.length && text[wordEnd].match(/\S/)) {
    wordEnd++
  }

  // Extract the word
  const word = text.substring(wordStart, wordEnd)

  return word
}

export const getCaretCoordinates = (
  element: HTMLTextAreaElement,
  position: number,
  options?: { debug: boolean }
) => {
  const debug = (options && options.debug) || false
  if (debug) {
    const el = document.querySelector('#input-textarea-caret-position-mirror-div')
    if (el) el?.parentNode?.removeChild(el)
  }

  // The mirror div will replicate the textarea's style
  const div = document.createElement('div')
  div.id = 'input-textarea-caret-position-mirror-div'
  document.body.appendChild(div)

  const style = div.style
  const computed = window.getComputedStyle(element)
  const isInput = element.nodeName === 'INPUT'

  // Default textarea styles
  style.whiteSpace = 'pre-wrap'
  if (!isInput) style.wordWrap = 'break-word' // only for textarea-s

  // Position off-screen
  style.position = 'absolute' // required to return coordinates properly
  if (!debug) style.visibility = 'hidden' // not 'display: none' because we want rendering

  // Transfer the element's properties to the div
  properties.forEach(function (prop) {
    if (isInput && prop === 'lineHeight') {
      // Special case for <input>s because text is rendered centered and line height may be != height
      if (computed.boxSizing === 'border-box') {
        const height = parseInt(computed.height)
        const outerHeight =
          parseInt(computed.paddingTop) +
          parseInt(computed.paddingBottom) +
          parseInt(computed.borderTopWidth) +
          parseInt(computed.borderBottomWidth)
        const targetHeight = outerHeight + parseInt(computed.lineHeight)
        if (height > targetHeight) {
          style.lineHeight = height - outerHeight + 'px'
        } else if (height === targetHeight) {
          style.lineHeight = computed.lineHeight
        } else {
          style.lineHeight = 0 + 'px'
        }
      } else {
        style.lineHeight = computed.height
      }
    } else {
      // @ts-expect-error
      style[prop] = computed[prop]
    }
  })

  if (isFirefox) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll'
  } else {
    style.overflow = 'hidden' // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  div.textContent = element.value.substring(0, position)
  // The second special handling for input type="text" vs textarea:
  // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
  if (isInput) div.textContent = div.textContent.replace(/\s/g, '\u00a0')

  const span = document.createElement('span')
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textarea's content into the <span> created at the caret position.
  // For inputs, just '.' would be enough, but no need to bother.
  span.textContent = element.value.substring(position) || '' // || because a completely empty faux span doesn't render at all
  div.appendChild(span)

  const coordinates = {
    top: span.offsetTop + parseInt(computed['borderTopWidth']),
    left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
    height: parseInt(computed['lineHeight']),
  }

  if (debug) {
    span.style.backgroundColor = '#aaa'
  } else {
    document.body.removeChild(div)
  }

  return coordinates
}

// https://github.com/mxkaske/mxkaske.dev/blob/main/components/craft/fancy-area/utils.ts

export const replaceWord = (element: HTMLTextAreaElement, value: string) => {
  const text = element.value
  const caretPos = element.selectionStart

  // Find the word that needs to be replaced
  const wordRegex = /[\w@#]+/g
  let match
  let startIndex
  let endIndex

  while ((match = wordRegex.exec(text)) !== null) {
    startIndex = match.index
    endIndex = startIndex + match[0].length

    // This is for scenarios when the currently typing mention is not the last one
    if (caretPos >= startIndex && caretPos <= endIndex) {
      break
    }
  }

  // Replace the word with a new word using document.execCommand
  if (startIndex !== undefined && endIndex !== undefined) {
    // Preserve the current selection range
    const selectionStart = element.selectionStart
    const selectionEnd = element.selectionEnd

    // Modify the selected range to encompass the word to be replaced
    element.setSelectionRange(startIndex, endIndex)

    // Execute the command to replace the selected text with the new word
    document.execCommand('insertText', false, value)

    // Restore the original selection range
    element.setSelectionRange(
      selectionStart - (endIndex - startIndex) + value.length,
      selectionEnd - (endIndex - startIndex) + value.length
    )
  }
}
