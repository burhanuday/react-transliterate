import { Language } from "../types/Language";

export interface ReactTransliterateProps
  extends React.HTMLProps<HTMLInputElement | HTMLTextAreaElement> {
  /**
   * Component to render. You can pass components from your
   * component library as this prop. Default is `<input />`
   * @type React.ReactNode
   */
  renderComponent?: (props: any) => React.ReactNode;

  /**
   * Extra space between the caret and left of the helper
   * @type number
   */
  offsetX?: number;

  /**
   * Extra space between the top of the helper and bottom of the caret
   * @type number
   */
  offsetY?: number;

  /**
   * Classname passed to the container of the component
   */
  containerClassName?: string;

  /**
   * CSS styles object passed to the container
   */
  containerStyles?: React.CSSProperties;

  /**
   * CSS styles object passed to the active item `<li>` tag
   */
  activeItemStyles?: React.CSSProperties;

  /**
   * Maximum number of suggestions to show in helper
   */
  maxOptions?: number;

  /**
   * Language you want to transliterate. See the README for language codes
   */
  lang?: Language;

  /**
   * Listener for the current value from the component. `(text: string) => void`
   */
  onChangeText: (text: string) => void;

  /**
   * `value` prop to pass to the component
   */
  value: string;

  /**
   * Should the suggestions be visible on mobile devices since
   * keyboards like Gboard and Swiftkey support typing in multiple languages
   * @type boolean
   */
  hideSuggestionBoxOnMobileDevices?: boolean;

  /**
   * To be used when `hideSuggestionBoxOnMobileDevices` is true.
   * Suggestion box will not be shown below this device width
   * @type number
   */
  hideSuggestionBoxBreakpoint?: number;

  /**
   * Keys which when pressed, input the current selection to the textbox
   */
  triggerKeys?: number[];

  /**
   * Should the current selection be inserted when `blur` event occurs
   * @type boolean
   */
  insertCurrentSelectionOnBlur?: boolean;
}
