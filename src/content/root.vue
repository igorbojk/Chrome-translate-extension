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
        <div v-if="isShowVocabularyButtons()">
            <span class="extension-vocabulary" @click="addToVocabulary()" v-if="!isHasInVocabulary()">Add to vocabulary</span>
            <span class="extension-vocabulary" @click="removeFromVocabulary()" v-else>Remove from vocabulary</span>
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
        isLoading: true,
        vocabularies: []
      }
    },
    computed: {},
    created () {
    },
    mounted () {
      this.isShowPopup = false
      /**
       * Add listener for mouseup
       */
      document.addEventListener('mouseup', () => {
        // if click was on translate-popup - return
        if (event.target.closest('div#translate-popup')) {
          event.preventDefault()
          return false
        }
        this.isShowPopup = false
        // if we gave selecting text - get vocabulary && calculate popup position && translate text
        if (document.getSelection().toString().trim().length) {
          this.getVocabularies()
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
      // Close popup on mouse down
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
      // Get vocabularies from storage
      getVocabularies () {
        chrome.storage.local.get(['extension-data'], (result) => {
          if (result['extension-data'] && result['extension-data'].vocabularies && result['extension-data'].vocabularies.length) {
            this.vocabularies = result['extension-data'].vocabularies
          }
        })
      },
      // Change input language
      changeInputLang (lang) {
        if (lang.key === this.outputLang.key) {
          this.outputLang = this.inputLang
        }
        this.inputLang = lang
        this.isLoading = true
        this.translate()
      },
      // Change output language
      changeOutputLang (lang) {
        if (lang.key === this.inputLang.key) {
          this.inputLang = this.outputLang
        }
        this.outputLang = lang
        this.isLoading = true
        this.translate()
      },
      // Translate text
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
      },
      // Add translating to vocabulary
      addToVocabulary () {
        const newWord = {
          text: this.inputText,
          translate: this.outputText
        }
        let vocabularyTarget = 'en-uk'
        if (this.outputLang.key === 'ru') {
          vocabularyTarget = 'en-ru'
        }
        const targetVocabulary = this.vocabularies.find(el => el.title === vocabularyTarget)
        if (targetVocabulary) {
          targetVocabulary.translates.push(newWord)
        } else {
          this.vocabularies.push({
            title: vocabularyTarget,
            translates: [newWord]
          })
        }
        const data = {
          vocabularies: this.vocabularies
        }
        chrome.storage.local.set({'extension-data': data}, function () {})
      },
      // Remove translating from vocabulary
      removeFromVocabulary () {
        let targetVocabulary = this.vocabularies.find(el => el.title === `${this.inputLang.key}-${this.outputLang.key}`)
        targetVocabulary.translates = targetVocabulary.translates.filter(el => el.text !== this.inputText)
        const data = {
          vocabularies: this.vocabularies
        }
        chrome.storage.local.set({'extension-data': data}, function () {})
      },
      isHasInVocabulary () {
        return this.vocabularies.find(el => el.title === `${this.inputLang.key}-${this.outputLang.key}`) &&
          this.vocabularies.find(el => el.title === `${this.inputLang.key}-${this.outputLang.key}`).translates.find(el => el.text === this.inputText)
      },
      isShowVocabularyButtons () {
        return this.outputLang.key === 'uk' || this.outputLang.key === 'ru'
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
    .extension-vocabulary{
        color: rebeccapurple;
        &:hover{
            cursor: pointer;
            color: lightblue;
        }
    }
</style>
