<template>
    <div v-bind:style="blockStyle" v-if="isShowPopup" id="translate-popup">
        <ExtensionLanguageSelect
                :defaultLang="inputLang"
                @changeLang="changeInputLang">
        </ExtensionLanguageSelect>
        <div class="extension-input-text">
            {{ inputText }}
        </div>
        <div class="extension-devider">
        </div>
        <ExtensionLanguageSelect
                :defaultLang="outputLang"
                @changeLang="changeOutputLang">
        </ExtensionLanguageSelect>
        <div class="extension-output-text">
            {{ outputText }}
        </div>
    </div>
</template>
<script>
  import ExtensionLanguageSelect from './extension-language-select.vue'

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
        inputLang: 'en',
        outputLang: 'uk'
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
          this.blockStyle.left = `${event.clientX}px`
          this.inputText = document.getSelection().toString()
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
        this.translate()
        this.inputLang = lang
        this.translate(this.inputText)
      },
      changeOutputLang (lang) {
        this.outputLang = lang
        this.translate()
      },
      translate () {
        this.axios.get('https://translation.googleapis.com/language/translate/v2', {
          params: {
            key: 'AIzaSyC3kdlSGExiXj_bLAuDKXiNMeNciZuLE7w',
            source: this.inputLang,
            target: this.outputLang,
            q: this.inputText
          }
        })
          .then((response) => {
            this.outputText = response.data.data.translations[0].translatedText
            this.isShowPopup = true
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
        box-shadow: 2px 2px 2px gray;
        border-radius: 2px;
        border: solid 1px black;
        max-width: 300px;
        width: auto;
        padding: 16px;
        min-height: 100px;
    }

    .extension-devider {
        width: 98%;
        display: block;
        background: rebeccapurple;
        margin: 16px auto;
        height: 2px;
        border-radius: 50%;
    }
</style>
