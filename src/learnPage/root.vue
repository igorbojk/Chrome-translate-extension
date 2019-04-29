<template >
    <div>
        <h1>Learn Page</h1>
        <h3 v-if="!filteredList.length">Doesnt have words to learn...</h3>
        <el-card class="box-card" v-if="item">
            <div slot="header" class="clearfix">
                <span v-if="mode === 'original'">Original (English)</span>
                <span v-else>Translate (Ukraine)</span>
                <el-button style="float: right; padding: 3px 0" type="text" v-if="mode === 'original'" @click="mode = 'translate'">Show translate</el-button>
                <el-button style="float: right; padding: 3px 0" type="text" v-else  @click="mode = 'original'">Show original</el-button>
            </div>
            <div class="text item">
                {{mode === 'original' ? item.text : item.translate }}
            </div>
        </el-card>
        <el-button type="success" round @click="madeLearned(item)" style="margin-top: 16px" v-if="filteredList.length">Got it!</el-button>
    </div>
</template>
<script>
  export default {
    data: () => ({
      learnList: [],
      item: null,
      mode: 'original'
    }),
    computed: {
      /** Return list without learned elements */
      filteredList () {
        console.log(this.learnList.filter(el => el.learned !== 2))
        console.log(this.learnList)
        return this.learnList.filter(el => el.learned !== 2)
      }
    },
    created () { },
    mounted () {
      /** Get data from localeStorage */
      chrome.storage.local.get(['extension-learn-list'], (result) => {
        if (result['extension-learn-list'] && result['extension-learn-list'].learnList && result['extension-learn-list'].learnList.length) {
          this.learnList = result['extension-learn-list'].learnList
          this.generateItem()
        }
      })
    },
    methods: {
      /** Generate item from learnList */
      generateItem () {
        this.mode = 'original'
        this.item = this.filteredList[parseInt(Math.random() * (this.filteredList.length))]
      },
      /**
       * Made word learned
       * @param {Object} translate - The translate with text and translated text
       */
      madeLearned (translate) {
        const translateTarget = this.learnList.find(el => el === translate)
        if (translateTarget.learned === 1) {
          translateTarget.learned = 2
        } else if (!translateTarget.learned) {
          translateTarget.learned = 1
        }
        this.learnList = [...this.learnList]
        this.saveLearnList()
        this.generateItem()
      },
      /**
       * Save learnList to storage
       */
      saveLearnList () {
        const data = {
          learnList: this.learnList
        }
        chrome.storage.local.set({'extension-learn-list': data}, function () {})
      }
    }
  }
</script>
<style lang="scss">
    .box-card {
        width: 480px;
    }
</style>
