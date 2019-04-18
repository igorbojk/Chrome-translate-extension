<template>
    <div v-bind:style="blockStyle" v-if="isShowPopup" id="translate-popup">
        <ExtensionLanguageSelect
                :defaultLang="inputLang"
                @changeLang="changeInputLang"
                :languages="languages">
        </ExtensionLanguageSelect>
        <div class="extension-input-text">
            {{ inputText }}
        </div>
        <div class="extension-devider">
        </div>
        <ExtensionLanguageSelect
                :defaultLang="outputLang"
                @changeLang="changeOutputLang"
                :languages="languages">
        </ExtensionLanguageSelect>
        <div class="extension-output-text" >
            <span v-if="isLoading">
                Translating...
            </span>
            <span v-else>
                {{ outputText }}
            </span>

        </div>
    </div>
</template>
<script>
  import ExtensionLanguageSelect from './extension-language-select.vue'
  const languages = [
    {
      title: 'Afrikaans',
      key: 'af'
    },
    {
      title: 'Albanian',
      key: 'sq'
    },
    {
      title: 'Amharic',
      key: 'am'
    },
    {
      title: 'Arabic',
      key: 'ar'
    },
    {
      title: 'Armenian',
      key: 'hy'
    },
    {
      title: 'Azerbaijani',
      key: 'az'
    },
    {
      title: 'Basque',
      key: 'eu'
    },
    {
      title: 'Belarusian',
      key: 'be'
    },
    {
      title: 'Bengali',
      key: 'bn'
    },
    {
      title: 'Bosnian',
      key: 'bs'
    },
    {
      title: 'Bulgarian',
      key: 'bg'
    },
    {
      title: 'Catalan',
      key: 'ca'
    },
    {
      title: 'Corsican',
      key: 'co'
    },
    {
      title: 'Croatian',
      key: 'hr'
    },
    {
      title: 'Czech',
      key: 'cs'
    },
    {
      title: 'Danish',
      key: 'da'
    },
    {
      title: 'Dutch',
      key: 'nl'
    },
    {
      title: 'English',
      key: 'en'
    },
    {
      title: 'Esperanto',
      key: 'et'
    },
    {
      title: 'Finnish',
      key: 'fi'
    },
    {
      title: 'French',
      key: 'fr'
    },
    {
      title: 'Frisian',
      key: 'fy'
    },
    {
      title: 'Galician',
      key: 'gl'
    },
    {
      title: 'Georgian',
      key: 'ka'
    },
    {
      title: 'German',
      key: 'de'
    },
    {
      title: 'Greek',
      key: 'el'
    },
    {
      title: 'Gujarati',
      key: 'gu'
    },
    {
      title: 'Hausa',
      key: 'ha'
    },
    {
      title: 'Hindi',
      key: 'hi'
    },
    {
      title: 'Hungarian',
      key: 'hu'
    },
    {
      title: 'Icelandic',
      key: 'is'
    },
    {
      title: 'Igbo',
      key: 'ig'
    },
    {
      title: 'Indonesian',
      key: 'id'
    },
    {
      title: 'Irish',
      key: 'ga'
    },
    {
      title: 'Italian',
      key: 'it'
    },
    {
      title: 'Japanese',
      key: 'ja'
    },
    {
      title: 'Javanese',
      key: 'jw'
    },
    {
      title: 'Kannada',
      key: 'kn'
    },
    {
      title: 'Kazakh',
      key: 'kk'
    },
    {
      title: 'Khmer',
      key: 'km'
    },
    {
      title: 'Korean',
      key: 'ko'
    },
    {
      title: 'Kurdish',
      key: 'ku'
    },
    {
      title: 'Kyrgyz',
      key: 'ky'
    },
    {
      title: 'Lao',
      key: 'lo'
    },
    {
      title: 'Latin',
      key: 'la'
    },
    {
      title: 'Latvian',
      key: 'lv'
    },
    {
      title: 'Lithuanian',
      key: 'lt'
    },
    {
      title: 'Luxembourgish',
      key: 'lb'
    },
    {
      title: 'Macedonian',
      key: 'mk'
    },
    {
      title: 'Malagasy',
      key: 'mg'
    },
    {
      title: 'Malay',
      key: 'ms'
    },
    {
      title: 'Malayalam',
      key: 'ml'
    },
    {
      title: 'Maltese',
      key: 'mt'
    },
    {
      title: 'Maori',
      key: 'mi'
    },
    {
      title: 'Marathi',
      key: 'mr'
    },
    {
      title: 'Mongolian',
      key: 'mn'
    },
    {
      title: 'Nepali',
      key: 'ne'
    },
    {
      title: 'Norwegian',
      key: 'no'
    },
    {
      title: 'Pashto',
      key: 'ps'
    },
    {
      title: 'Persian',
      key: 'fa'
    },
    {
      title: 'Polish',
      key: 'pl'
    },
    {
      title: 'Punjabi',
      key: 'pa'
    },
    {
      title: 'Romanian',
      key: 'ro'
    },
    {
      title: 'Russian',
      key: 'ru'
    },
    {
      title: 'Samoan',
      key: 'sm'
    },
    {
      title: 'Serbian',
      key: 'sr'
    },
    {
      title: 'Sesotho',
      key: 'st'
    },
    {
      title: 'Shona',
      key: 'sn'
    },
    {
      title: 'Sindhi',
      key: 'sd'
    },
    {
      title: 'Slovak',
      key: 'sk'
    },
    {
      title: 'Slovenian',
      key: 'sl'
    },
    {
      title: 'Somali',
      key: 'so'
    },
    {
      title: 'Spanish',
      key: 'es'
    },
    {
      title: 'Sundanese',
      key: 'su'
    },
    {
      title: 'Swahili',
      key: 'sw'
    },
    {
      title: 'Swedish',
      key: 'sv'
    },
    {
      title: 'Tajik',
      key: 'tg'
    },
    {
      title: 'Tamil',
      key: 'ta'
    },
    {
      title: 'Telugu',
      key: 'te'
    },
    {
      title: 'Thai',
      key: 'th'
    },
    {
      title: 'Turkish',
      key: 'tr'
    },
    {
      title: 'Ukrainian',
      key: 'uk'
    },
    {
      title: 'Urdu',
      key: 'ur'
    },
    {
      title: 'Uzbek',
      key: 'uz'
    },
    {
      title: 'Vietnamese',
      key: 'vi'
    },
    {
      title: 'Welsh',
      key: 'cy'
    }
  ]
  export default {
    components: {
      ExtensionLanguageSelect
    },
    data () {
      return {
        blockStyle: {},
        isShowPopup: false,
        inputText: null,
        outputText: null,
        inputLang: {title: 'English', key: 'en'},
        outputLang: {title: 'Ukrainian', key: 'uk'},
        languages: languages,
        isLoading: true
      }
    },
    computed: {},
    created () {
    },
    mounted () {
      this.isShowPopup = false
      document.addEventListener('mouseup', () => {
        if (event.target.closest('div#translate-popup')) {
          event.preventDefault()
          return false
        }
        this.isShowPopup = false
        if (document.getSelection().toString().length) {
          let selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect()
          this.blockStyle.top = `${selectionRect.y + selectionRect.height + window.pageYOffset + 16}px`
          this.blockStyle.left = `${selectionRect.x + 16 + window.pageXOffset}px`
          this.blockStyle.width = `${selectionRect.width - 32}px`
          this.inputText = document.getSelection().toString()
          this.isShowPopup = true
          this.isLoading = true
          this.translate()
        } else {
          this.inputText = null
          this.isShowPopup = false
        }
      })
      document.addEventListener('mousedown', (event) => {
        if (event.target.closest('div#translate-popup')) {
          event.preventDefault()
          return false
        }
        this.inputText = null
        this.isShowPopup = false
      })
    },
    methods: {
      changeInputLang (lang) {
        if (lang.key === this.outputLang.key) {
          this.outputLang = this.inputLang
        }
        this.inputLang = lang
        this.isLoading = true
        this.translate()
      },
      changeOutputLang (lang) {
        if (lang.key === this.inputLang.key) {
          this.inputLang = this.outputLang
        }
        this.outputLang = lang
        this.isLoading = true
        this.translate()
      },
      translate () {
        this.axios.get('https://translation.googleapis.com/language/translate/v2', {
          params: {
            key: 'AIzaSyC3kdlSGExiXj_bLAuDKXiNMeNciZuLE7w',
            source: this.inputLang.key,
            target: this.outputLang.key,
            q: this.inputText
          }
        })
          .then((response) => {
            this.outputText = response.data.data.translations[0].translatedText
            this.isLoading = false
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
</script>
<style lang="scss">
    #translate-popup {
        position: absolute;
        background: white;
        z-index: 9999999;
        border-radius: 4px;
        border: solid 1px lightblue;
        /*max-width: 300px;*/
        /*width: auto;*/
        min-width: 132px;
        box-sizing: border-box;
        min-height: 100px;
        box-shadow: 1px 1px 12px black;
        padding: 12px 8px;
    }
    .extension-devider {
        width: 98%;
        display: block;
        background: rebeccapurple;
        margin: 4px auto 16px auto;
        height: 2px;
        border-radius: 50%;
    }
    .extension-input-text,
    .extension-output-text{
        padding: 8px 0;
        font-size: 18px;
    }
</style>
