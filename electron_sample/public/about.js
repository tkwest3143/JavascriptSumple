class AbouElement extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = this.template();
  }

  connectedCallback() {
    console.log("my-app element is connected");
  }

  template() {
    return `
      <style>
        p {
          color: #f00;
        }
      </style>

      <p>This is a custom element!</p>
    `;
  }
}
customElements.define("about", AbouElement);
