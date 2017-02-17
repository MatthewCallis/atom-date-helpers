'use babel';

import { TextEditor } from 'atom';
import moment from 'moment';
import 'moment/locale/af';
import 'moment/locale/ar-dz';
import 'moment/locale/ar-ly';
import 'moment/locale/ar-ma';
import 'moment/locale/ar-sa';
import 'moment/locale/ar-tn';
import 'moment/locale/ar';
import 'moment/locale/az';
import 'moment/locale/be';
import 'moment/locale/bg';
import 'moment/locale/bn';
import 'moment/locale/bo';
import 'moment/locale/br';
import 'moment/locale/bs';
import 'moment/locale/ca';
import 'moment/locale/cs';
import 'moment/locale/cv';
import 'moment/locale/cy';
import 'moment/locale/da';
import 'moment/locale/de-at';
import 'moment/locale/de';
import 'moment/locale/dv';
import 'moment/locale/el';
import 'moment/locale/en-au';
import 'moment/locale/en-ca';
import 'moment/locale/en-gb';
import 'moment/locale/en-ie';
import 'moment/locale/en-nz';
import 'moment/locale/eo';
import 'moment/locale/es-do';
import 'moment/locale/es';
import 'moment/locale/et';
import 'moment/locale/eu';
import 'moment/locale/fa';
import 'moment/locale/fi';
import 'moment/locale/fo';
import 'moment/locale/fr-ca';
import 'moment/locale/fr-ch';
import 'moment/locale/fr';
import 'moment/locale/fy';
import 'moment/locale/gd';
import 'moment/locale/gl';
import 'moment/locale/he';
import 'moment/locale/hi';
import 'moment/locale/hr';
import 'moment/locale/hu';
import 'moment/locale/hy-am';
import 'moment/locale/id';
import 'moment/locale/is';
import 'moment/locale/it';
import 'moment/locale/ja';
import 'moment/locale/jv';
import 'moment/locale/ka';
import 'moment/locale/kk';
import 'moment/locale/km';
import 'moment/locale/ko';
import 'moment/locale/ky';
import 'moment/locale/lb';
import 'moment/locale/lo';
import 'moment/locale/lt';
import 'moment/locale/lv';
import 'moment/locale/me';
import 'moment/locale/mi';
import 'moment/locale/mk';
import 'moment/locale/ml';
import 'moment/locale/mr';
import 'moment/locale/ms-my';
import 'moment/locale/ms';
import 'moment/locale/my';
import 'moment/locale/nb';
import 'moment/locale/ne';
import 'moment/locale/nl-be';
import 'moment/locale/nl';
import 'moment/locale/nn';
import 'moment/locale/pa-in';
import 'moment/locale/pl';
import 'moment/locale/pt-br';
import 'moment/locale/pt';
import 'moment/locale/ro';
import 'moment/locale/ru';
import 'moment/locale/se';
import 'moment/locale/si';
import 'moment/locale/sk';
import 'moment/locale/sl';
import 'moment/locale/sq';
import 'moment/locale/sr-cyrl';
import 'moment/locale/sr';
import 'moment/locale/ss';
import 'moment/locale/sv';
import 'moment/locale/sw';
import 'moment/locale/ta';
import 'moment/locale/te';
import 'moment/locale/tet';
import 'moment/locale/th';
import 'moment/locale/tl-ph';
import 'moment/locale/tlh';
import 'moment/locale/tr';
import 'moment/locale/tzl';
import 'moment/locale/tzm-latn';
import 'moment/locale/tzm';
import 'moment/locale/uk';
import 'moment/locale/uz';
import 'moment/locale/vi';
import 'moment/locale/x-pseudo';
import 'moment/locale/yo';
import 'moment/locale/zh-cn';
import 'moment/locale/zh-hk';
import 'moment/locale/zh-tw';

import ADH from './atom-date-helpers';

export default class FormatView {
  constructor() {
    this.miniEditor = new TextEditor({ mini: true });
    // this.miniEditor.element.addEventListener('blur', this.close.bind(this));
    this.miniEditor.setPlaceholderText('Enter Moment date format');

    this.message = document.createElement('div');
    this.message.classList.add('message');

    this.locale = document.createElement('select');
    moment.locales().forEach((locale) => {
      const option = document.createElement('option');
      option.textContent = FormatView.convetCodeToName(locale);
      option.value = locale;
      this.locale.appendChild(option);
    });

    this.element = document.createElement('div');
    this.element.classList.add('man');
    this.element.appendChild(this.miniEditor.element);
    this.element.appendChild(this.locale);
    this.element.appendChild(this.message);

    this.panel = atom.workspace.addModalPanel({
      item: this,
      visible: false,
    });

    atom.commands.add(this.miniEditor.element, 'core:confirm', () => {
      this.confirm();
    });
    atom.commands.add(this.miniEditor.element, 'core:cancel', () => {
      this.close();
    });
  }

  close() {
    if (!this.panel.isVisible()) return;
    this.miniEditor.setText('');
    this.panel.hide();
    if (this.miniEditor.element.hasFocus()) {
      this.restoreFocus();
    }
  }

  confirm() {
    const format = this.miniEditor.getText();
    const locale = this.locale.value || 'en';
    ADH.convertFormat(format, locale);
    this.close();
  }

  storeFocusedElement() {
    this.previouslyFocusedElement = document.activeElement;
  }

  restoreFocus() {
    if (this.previouslyFocusedElement && this.previouslyFocusedElement.parentElement) {
      this.previouslyFocusedElement.focus();
      return;
    }
    atom.views.getView(atom.workspace).focus();
  }

  open() {
    if (this.panel.isVisible()) return;
    this.storeFocusedElement();
    this.panel.show();
    this.message.textContent = "Enter Moment format here, such as 'LLLL' or 'MMMM Do YYYY, h:mm:ss a'";
    this.miniEditor.element.focus();
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  setCurrentWord(w) {
    this.miniEditor.setText(w);
    this.miniEditor.selectAll();
  }

  static convetCodeToName(locale_code) {
    const codes = {
      aa: 'Afar',
      ab: 'Abkhaz',
      ae: 'Avestan',
      af: 'Afrikaans',
      ak: 'Akan',
      am: 'Amharic',
      an: 'Aragonese',
      ar: 'Arabic',
      'ar-ae': 'Arabic (United Arab Emirates)',
      'ar-bh': 'Arabic (Bahrain)',
      'ar-dz': 'Arabic (Algeria)',
      'ar-eg': 'Arabic (Egypt)',
      'ar-iq': 'Arabic (Iraq)',
      'ar-jo': 'Arabic (Jordan)',
      'ar-kw': 'Arabic (Kuwait)',
      'ar-lb': 'Arabic (Lebanon)',
      'ar-ly': 'Arabic (Libya)',
      'ar-ma': 'Arabic (Morocco)',
      'ar-om': 'Arabic (Oman)',
      'ar-qa': 'Arabic (Qatar)',
      'ar-sa': 'Arabic (Saudi Arabia)',
      'ar-sd': 'Arabic (Sudan)',
      'ar-sy': 'Arabic (Syria)',
      'ar-tn': 'Arabic (Tunisia)',
      'ar-ye': 'Arabic (Yemen)',
      as: 'Assamese',
      av: 'Avaric',
      ay: 'Aymara',
      az: 'Azerbaijani',
      ba: 'Bashkir',
      be: 'Belarusian',
      'be-by': 'Belarusian (Belarus)',
      bg: 'Bulgarian',
      'bg-bg': 'Bulgarian (Bulgaria)',
      bh: 'Bihari',
      bi: 'Bislama',
      bm: 'Bambara',
      bn: 'Bengali',
      bo: 'Tibetan Standard, Tibetan, Central',
      br: 'Breton',
      bs: 'Bosnian',
      ca: 'Catalan; Valencian',
      'ca-es': 'Catalan (Spain)',
      ce: 'Chechen',
      ch: 'Chamorro',
      co: 'Corsican',
      cr: 'Cree',
      cs: 'Czech',
      'cs-cz': 'Czech (Czech Republic)',
      cu: 'Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic',
      cv: 'Chuvash',
      cy: 'Welsh',
      da: 'Danish',
      'da-dk': 'Danish (Denmark)',
      de: 'German',
      'de-at': 'German (Austria)',
      'de-ch': 'German (Switzerland)',
      'de-de': 'German (Germany)',
      'de-lu': 'German (Luxembourg)',
      dv: 'Divehi; Dhivehi; Maldivian;',
      ee: 'Ewe',
      el: 'Greek, Modern',
      'el-cy': 'Greek (Cyprus)',
      'el-gr': 'Greek (Greece)',
      en: 'English',
      'en-au': 'English (Australia)',
      'en-ca': 'English (Canada)',
      'en-gb': 'English (United Kingdom)',
      'en-ie': 'English (Ireland)',
      'en-in': 'English (India)',
      'en-mt': 'English (Malta)',
      'en-nz': 'English (New Zealand)',
      'en-ph': 'English (Philippines)',
      'en-sg': 'English (Singapore)',
      'en-us': 'English (United States)',
      'en-za': 'English (South Africa)',
      eo: 'Esperanto',
      es: 'Spanish; Castilian',
      'es-ar': 'Spanish (Argentina)',
      'es-bo': 'Spanish (Bolivia)',
      'es-cl': 'Spanish (Chile)',
      'es-co': 'Spanish (Colombia)',
      'es-cr': 'Spanish (Costa Rica)',
      'es-do': 'Spanish (Dominican Republic)',
      'es-ec': 'Spanish (Ecuador)',
      'es-es': 'Spanish (Spain)',
      'es-gt': 'Spanish (Guatemala)',
      'es-hn': 'Spanish (Honduras)',
      'es-mx': 'Spanish (Mexico)',
      'es-ni': 'Spanish (Nicaragua)',
      'es-pa': 'Spanish (Panama)',
      'es-pe': 'Spanish (Peru)',
      'es-pr': 'Spanish (Puerto Rico)',
      'es-py': 'Spanish (Paraguay)',
      'es-sv': 'Spanish (El Salvador)',
      'es-us': 'Spanish (United States)',
      'es-uy': 'Spanish (Uruguay)',
      'es-ve': 'Spanish (Venezuela)',
      et: 'Estonian',
      'et-ee': 'Estonian (Estonia)',
      eu: 'Basque',
      fa: 'Persian',
      ff: 'Fula; Fulah; Pulaar; Pular',
      fi: 'Finnish',
      'fi-fi': 'Finnish (Finland)',
      fj: 'Fijian',
      fo: 'Faroese',
      fr: 'French',
      'fr-be': 'French (Belgium)',
      'fr-ca': 'French (Canada)',
      'fr-ch': 'French (Switzerland)',
      'fr-fr': 'French (France)',
      'fr-lu': 'French (Luxembourg)',
      fy: 'Western Frisian',
      ga: 'Irish',
      'ga-ie': 'Irish (Ireland)',
      gd: 'Scottish Gaelic; Gaelic',
      gl: 'Galician',
      gn: 'Guaraní',
      gu: 'Gujarati',
      gv: 'Manx',
      ha: 'Hausa',
      he: 'Hebrew (modern)',
      hi: 'Hindi',
      'hi-in': 'Hindi (India)',
      ho: 'Hiri Motu',
      hr: 'Croatian',
      'hr-hr': 'Croatian (Croatia)',
      ht: 'Haitian; Haitian Creole',
      hu: 'Hungarian',
      'hu-hu': 'Hungarian (Hungary)',
      hy: 'Armenian',
      'hy-am': 'Armenian',
      hz: 'Herero',
      ia: 'Interlingua',
      id: 'Indonesian',
      ie: 'Interlingue',
      ig: 'Igbo',
      ii: 'Nuosu',
      ik: 'Inupiaq',
      in: 'Indonesian',
      'in-id': 'Indonesian (Indonesia)',
      io: 'Ido',
      is: 'Icelandic',
      'is-is': 'Icelandic (Iceland)',
      it: 'Italian',
      'it-ch': 'Italian (Switzerland)',
      'it-it': 'Italian (Italy)',
      iu: 'Inuktitut',
      iw: 'Hebrew',
      'iw-il': 'Hebrew (Israel)',
      ja: 'Japanese',
      'ja-jp': 'Japanese (Japan)',
      jv: 'Javanese',
      ka: 'Georgian',
      kg: 'Kongo',
      ki: 'Kikuyu, Gikuyu',
      kj: 'Kwanyama, Kuanyama',
      kk: 'Kazakh',
      kl: 'Kalaallisut, Greenlandic',
      km: 'Khmer',
      kn: 'Kannada',
      ko: 'Korean',
      'ko-kr': 'Korean (South Korea)',
      kr: 'Kanuri',
      ks: 'Kashmiri',
      ku: 'Kurdish',
      kv: 'Komi',
      kw: 'Cornish',
      ky: 'Kirghiz, Kyrgyz',
      la: 'Latin',
      lb: 'Luxembourgish, Letzeburgesch',
      lg: 'Luganda',
      li: 'Limburgish, Limburgan, Limburger',
      ln: 'Lingala',
      lo: 'Lao',
      lt: 'Lithuanian',
      'lt-lt': 'Lithuanian (Lithuania)',
      lu: 'Luba-Katanga',
      lv: 'Latvian',
      'lv-lv': 'Latvian (Latvia)',
      me: 'Montenegrin',
      mg: 'Malagasy',
      mh: 'Marshallese',
      mi: 'Māori',
      mk: 'Macedonian',
      'mk-mk': 'Macedonian (Macedonia)',
      ml: 'Malayalam',
      mn: 'Mongolian',
      mr: 'Marathi (Marāṭhī)',
      ms: 'Malay',
      'ms-my': 'Malay (Malaysia)',
      mt: 'Maltese',
      'mt-mt': 'Maltese (Malta)',
      my: 'Burmese',
      na: 'Nauru',
      nb: 'Norwegian Bokmål',
      nd: 'North Ndebele',
      ne: 'Nepali',
      ng: 'Ndonga',
      nl: 'Dutch',
      'nl-be': 'Dutch (Belgium)',
      'nl-nl': 'Dutch (Netherlands)',
      nn: 'Norwegian Nynorsk',
      no: 'Norwegian',
      'no-no': 'Norwegian (Norway)',
      nr: 'South Ndebele',
      nv: 'Navajo, Navaho',
      ny: 'Chichewa; Chewa; Nyanja',
      oc: 'Occitan',
      oj: 'Ojibwe, Ojibwa',
      om: 'Oromo',
      or: 'Oriya',
      os: 'Ossetian, Ossetic',
      pa: 'Panjabi, Punjabi',
      'pa-in': 'Punjabi (India)',
      pi: 'Pāli',
      pl: 'Polish',
      'pl-pl': 'Polish (Poland)',
      ps: 'Pashto, Pushto',
      pt: 'Portuguese',
      'pt-br': 'Portuguese (Brazil)',
      'pt-pt': 'Portuguese (Portugal)',
      qu: 'Quechua',
      rm: 'Romansh',
      rn: 'Kirundi',
      ro: 'Romanian, Moldavian, Moldovan',
      'ro-ro': 'Romanian (Romania)',
      ru: 'Russian',
      'ru-ru': 'Russian (Russia)',
      rw: 'Kinyarwanda',
      sa: 'Sanskrit (Saṁskṛta)',
      sc: 'Sardinian',
      sd: 'Sindhi',
      se: 'Northern Sami',
      sg: 'Sango',
      si: 'Sinhala, Sinhalese',
      sk: 'Slovak',
      'sk-sk': 'Slovak (Slovakia)',
      sl: 'Slovene',
      'sl-si': 'Slovenian (Slovenia)',
      sm: 'Samoan',
      sn: 'Shona',
      so: 'Somali',
      sq: 'Albanian',
      'sq-al': 'Albanian (Albania)',
      sr: 'Serbian',
      'sr-cyrl': 'Serbian Cyrillic',
      'sr-ba': 'Serbian (Bosnia and Herzegovina)',
      'sr-cs': 'Serbian (Serbia and Montenegro)',
      'sr-me': 'Serbian (Montenegro)',
      'sr-rs': 'Serbian (Serbia)',
      ss: 'Swati',
      st: 'Southern Sotho',
      su: 'Sundanese',
      sv: 'Swedish',
      'sv-se': 'Swedish (Sweden)',
      sw: 'Swahili',
      ta: 'Tamil',
      te: 'Telugu',
      tet: 'Tetun Dili (East Timor)',
      tg: 'Tajik',
      th: 'Thai',
      'th-th': 'Thai (Thailand)',
      ti: 'Tigrinya',
      tk: 'Turkmen',
      tl: 'Tagalog',
      'tl-ph': 'Tagalog (Philippines)',
      tlh: 'Klingon',
      tn: 'Tswana',
      to: 'Tonga (Tonga Islands)',
      tr: 'Turkish',
      'tr-tr': 'Turkish (Turkey)',
      ts: 'Tsonga',
      tt: 'Tatar',
      tw: 'Twi',
      ty: 'Tahitian',
      tzl: 'Talossan',
      'tzm-latn': 'Central Atlas Tamazight Latin',
      tzm: 'Central Atlas Tamazight',
      ug: 'Uighur, Uyghur',
      uk: 'Ukrainian',
      'uk-ua': 'Ukrainian (Ukraine)',
      ur: 'Urdu',
      uz: 'Uzbek',
      ve: 'Venda',
      vi: 'Vietnamese',
      'vi-vn': 'Vietnamese (Vietnam)',
      vo: 'Volapük',
      wa: 'Walloon',
      wo: 'Wolof',
      xh: 'Xhosa',
      'x-pseudo': 'Pseudo',
      yi: 'Yiddish',
      yo: 'Yoruba',
      za: 'Zhuang, Chuang',
      zh: 'Chinese',
      'zh-cn': 'Chinese (Simplified, China)',
      'zh-hk': 'Chinese (Hong Kong)',
      'zh-sg': 'Chinese (Singapore)',
      'zh-tw': 'Chinese (Traditional, Taiwan)',
    };
    return codes[locale_code] || `Unknown (${locale_code})`;
  }
}
