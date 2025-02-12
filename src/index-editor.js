import {
  html,
} from "lit";
import { formatList } from "@marcokreeft/ha-editor-formbuilder/dist/utils/entities";
import './entities-row-editor.ts';
import ImprovedEditorForm from './entity-row-form.ts';

const defaultConfig = {}

export default class TflStatusCardEditor extends ImprovedEditorForm {
  static properties = {
    _configEntities: [],
  };

  static get properties() {
    return { _hass: {}, _config: {} };
  }

  setConfig(config) {
    this._configEntities = config.entities;
    this._config = config;
  }

  render() {
    if (!this._hass || !this._config) {
      return html``;
    }
    // return html`     
    // <div class="card-config">
    // <div class="form-row">
    // <div class="form-control">
    // <ha-entity-picker
    //   class="add-entity"
    //   .hass=${this._hass}
    // ></ha-entity-picker>
    // </div>
    // </div>
    // </div>
    //   `;

    return this.renderForm([
      {
        controls: [{
          label: "Entities",
          configValue: "entities",
          type: "entities",
          items: Object.keys(this._hass.states)
            .filter((eid) => eid.substr(0, eid.indexOf(".")) === 'sensor' &&
              this._hass.states[eid].attributes.attribution === "Powered by TfL Open Data")
            .map((item) => formatList(item, this._hass)),
        }]
      },
    ])
  };
}