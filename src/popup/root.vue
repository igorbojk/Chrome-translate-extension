<template>
    <div class="translate-popup">
        <el-button @click="openLearnPage()">Open Learn Page</el-button>
        <h3>Vocabulary</h3>
        <el-tabs type="card" v-if="vocabularies.length">
            <el-tab-pane
                v-for="(vocabulary, index) in vocabularies"
                :key="index"
                :label="vocabulary.title">
                <div class="flex-container" v-for="(translate, index) in vocabulary.translates" :key="index">
                    <div class="text">
                        {{ translate.text }}
                    </div>
                    <div class="translate">
                        {{ translate.translate }}
                    </div>
                    <div class="actions">
                        <el-tooltip class="item" effect="dark" content="Remove from vocabulary" placement="top">
                            <el-button icon="el-icon-delete" circle @click="removeFromVocabulary(translate, vocabulary.title)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="Add to learn list" placement="top">
                            <el-button
                                    icon="el-icon-edit-outline"
                                    circle @click="addToLearnList(translate)"
                                    v-if="vocabulary.title === 'en-uk' && isShowAddToLearnButton(translate)"
                            ></el-button>
                        </el-tooltip>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <h3 v-else>
            There are no words in vocabulary yet...
        </h3>
    </div>
</template>
<script>
  export default {
    data: () => ({
      vocabularies: [],
      learnList: []
    }),
    computed: {},
    created () { },
    mounted () {
      /** Get data from localeStorage */
      chrome.storage.local.get(['extension-data'], (result) => {
        if (result['extension-data'] && result['extension-data'].vocabularies && result['extension-data'].vocabularies.length) {
          this.vocabularies = result['extension-data'].vocabularies
        }
      })
      chrome.storage.local.get(['extension-learn-list'], (result) => {
        if (result['extension-learn-list'] && result['extension-learn-list'].learnList && result['extension-learn-list'].learnList.length) {
          this.learnList = result['extension-learn-list'].learnList
        }
      })
    },
    methods: {
      /**
       * Remove translate from vocabulary and save to storage
       * @param {Object} translate - The translate with text and translated text
       * @param {string} key - The key of vocabulary
       */
      removeFromVocabulary (translate, key) {
        let targetVocabulary = this.vocabularies.find(el => el.title === key)
        targetVocabulary.translates = targetVocabulary.translates.filter(el => el !== translate)
        const data = {
          vocabularies: this.vocabularies
        }
        chrome.storage.local.set({'extension-data': data}, function () {})
      },
      /**
       * Add translate to learnList
       * @param {Object} translate - The translate with text and translated text
       */
      addToLearnList (translate) {
        this.learnList.push(translate)
        const data = {
          learnList: this.learnList
        }
        chrome.storage.local.set({'extension-learn-list': data}, function () {})
      },
      /**
       * Open learn page
       */
      openLearnPage () {
        chrome.tabs.create({ url: 'pages/app.html' })
      },
      /**
       * Check is translate in learn list
       */
      isShowAddToLearnButton (translate) {
        return !this.learnList.find(el => el.text === translate.text)
      }
    }
  }
</script>
<style lang="scss">
    .translate-popup{
        width: 640px;
        border-radius: 4px;
        background: white;
        .el-tab-pane{
            max-height: 400px;
            overflow: auto;
        }
    }
    .flex-container{
        display: flex;
        justify-content: space-around;
        padding-left: 16px;
        position: relative;
        .text,
        .translate{
            flex: 1 1 auto;
            max-width: calc(40% - 1px);
            width: 40%;
            padding: 8px;
            border-bottom: solid 1px rebeccapurple;
            font-size: 16px;
        }
        .actions{
            flex: 1 1 auto;
            width: 20%;
        }
    }
</style>
