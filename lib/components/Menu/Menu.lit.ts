import { LitElement, html, css } from 'lit'
import { customElement, property, state} from 'lit/decorators.js'

const transitionDuration = 500

@customElement('side-menu')
export class SideMenu extends LitElement {
  @state() private backgroundElement?: HTMLElement
  @state() private sideMenuBodyElement?: HTMLElement

  static styles = css`
  .background {
    position: fixed;
    background-color: rgba(0 0 0 .5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    cursor: pointer;
    z-index: 5;
    transition: ${transitionDuration}ms ease-in-out;
  }
  .background.exiting {
    background-color: rgba(0 0 0 0);
    transition: ${transitionDuration}ms ease-in-out;
  }
  .side-menu-body {
    position: fixed;
    width: 80vw;
    height: 100vh;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: white;
    z-index: 10;
    transition: ${transitionDuration}ms ease-in-out;
  }
  .side-menu-body.exiting {
    width: 0;
    transition: ${transitionDuration}ms ease-in-out;
  }
  `
  render() {
    return html`
    <div class="background">
      <div class="side-menu-body">
        asdf
      </div>
    </div>
    `
  }

  validateElementBindings() {
    if (!this.backgroundElement) {
      const element = this.shadowRoot?.getElementById('.background')?
      this.backgroundElement = element
      this.requestUpdate('backgroundElement')
    }
    this.shadowRoot?
  }

  close() {
    
  }
  open() {}
}