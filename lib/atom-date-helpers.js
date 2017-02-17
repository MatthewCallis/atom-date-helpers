'use babel';

import { CompositeDisposable } from 'atom';
import moment from 'moment';
import FormatView from './format-view';

export default {

  formatView: null,
  subscriptions: null,

  activate(state) {
    this.formatView = new FormatView(state.dateConvertViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-date-helpers:toggle': () => this.toggle(),
      'atom-date-helpers:convert': () => this.convert(),
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.formatView.destroy();
  },

  serialize() {
    return {
      dateConvertViewState: this.formatView.serialize(),
    };
  },

  parseDate(date) {
    let output = date;
    const number = parseFloat(date.replace(/['"`]+/g, ''));
    // 100000000 === Sat, 03 Mar 1973 09:46:40 GMT
    if (number >= 100000000 && !isNaN(number) && isFinite(number)) {
      output = new Date(0);
      if (number <= 999999999) {
        output.setUTCSeconds(number);
      } else {
        output.setUTCMilliseconds(number);
      }
    }
    return moment.utc(output);
  },

  convert() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      this.formatView.open();
    }
  },

  convertFormat(format = 'MMMM Do YYYY, h:mm:ss a') {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      const selections = atom.workspace.getActivePaneItem().getSelections();
      selections.forEach((selection) => {
        const text = selection.getText();
        const date = this.parseDate(text);
        const formatted = moment(date).format(format);
        if (formatted && formatted !== 'Invalid date') {
          selection.insertText(formatted);
        }
      });

      // const selection = this.parseDate(editor.getSelectedText());
      // const formatted = moment(selection).format(format);
      // editor.insertText(formatted);
    }
  },

  toggle() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) {
      // TODO: Enable config.
      // const line = atom.config.get('editor.lineHeight');

      // NOTE: /deep/ is deprecated?
      // const view = atom.views.getView(atom.workspace);
      // const elements = view.querySelectorAll('body /deep/ .syntax--constant.syntax--numeric, body /deep/ .syntax--string.syntax--quoted');

      const view = atom.views.getView(editor);
      const elements = view.shadowRoot.querySelectorAll('.syntax--constant.syntax--numeric, .syntax--string.syntax--quoted');
      elements.forEach((element) => {
        const text = element.textContent;
        const date = this.parseDate(text);
        const formatted = moment(date).format('MMMM Do YYYY, h:mm:ss a');
        const day_of_the_year = Math.ceil(moment(date).dayOfYear() / 4);

        if (formatted && formatted !== 'Invalid date') {
          element.classList.add('date-convert');
          element.classList.add(`day-of-the-year-${day_of_the_year}`);

          // TODO: This should be done with Markers, but we can't traverse the DOM and get the Ranges.
          // const range = editor.getSelectedBufferRange();
          // const marker = editor.markBufferRange(range);
          // editor.decorateMarker(marker, { type: 'highlight', class: `day-of-the-year-${day_of_the_year}` });

          this.subscriptions.add(atom.tooltips.add(element, { title: formatted }));
        }
      });

      atom.notifications.addInfo('Dates should have tooltips!');
    }
  },
};
