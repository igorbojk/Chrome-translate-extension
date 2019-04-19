<template>
    <div class="translate-popup">
        <h3>Vocabulary</h3>
        <el-tabs type="card" v-if="vocabularies.length">
            <el-tab-pane
                v-for="(vocabulary, index) in vocabularies"
                :key="index"
                :label="vocabulary.title">
                <div class="flex-container" v-for="(translate, index) in vocabulary.translates" :key="index">
                    <div class="remove-btn" @click="removeFromVocabulary(translate, vocabulary.title)">X</div>
                    <div class="text">
                        {{ translate.text }}
                    </div>
                    <div class="translate">
                        {{ translate.translate }}
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
      vocabularies: []
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
        chrome.storage.local.set({'extension-data': data}, function () {
          console.log('Value is set to ' + 'everest')
        })
      }
    }
  }
</script>
<style lang="scss">
    .translate-popup{
        width: 420px;
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
        .remove-btn{
            position: absolute;
            top: 12px;
            left: 3px;
            color: darkred;
            font-weight: bold;
            &:hover{
                cursor: pointer;
                color: black;
            }
        }
        .text,
        .translate{
            flex: 1 1 auto;
            max-width: calc(50% - 1px);
            width: 50%;
            padding: 8px;
            border-bottom: solid 1px rebeccapurple;
            font-size: 16px;
        }
        .text{
            border-right: solid 1px rebeccapurple;
        }
        .translate{
            border-left: solid 1px rebeccapurple;
        }
    }
</style>
