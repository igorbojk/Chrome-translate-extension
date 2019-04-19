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
      title: 'English',
      key: 'en'
    },
    {
      title: 'French',
      key: 'fr'
    },
    {
      title: 'German',
      key: 'de'
    },
    {
      title: 'Russian',
      key: 'ru'
    },
    {
      title: 'Ukrainian',
      key: 'uk'
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
        if (document.getSelection().toString().trim().length) {
          let selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect()
          let left = 0
          let width = 0
          if (selectionRect.width < 232) {
            width = 232
            left = selectionRect.x + window.pageXOffset - ((232 - selectionRect.width) / 2)
          } else {
            width = selectionRect.width - 32
            left = selectionRect.x + 16 + window.pageXOffset
          }
          if (document.body.clientWidth < (left + width)) {
            left = selectionRect.x + window.pageXOffset - (width - selectionRect.width)
          }
          if (window.pageXOffset > left) {
            left = selectionRect.x + window.pageXOffset
          }
          this.blockStyle.top = `${selectionRect.y + selectionRect.height + window.pageYOffset + 16}px`
          this.blockStyle.left = `${left}px`
          this.blockStyle.width = `${width}px`
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
        document.getSelection().removeAllRanges()
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
        min-width: 132px;
        box-sizing: border-box;
        min-height: 100px;
        box-shadow: 1px 1px 12px black;
        padding: 12px 8px;
        margin-bottom: 16px;
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
