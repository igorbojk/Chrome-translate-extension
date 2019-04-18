<template>
    <div class="extension-language-select">
        <div class="extension-language-selected" @click="toggleDropdownShow()">
            {{ selectedLanguage}}
        </div>
        <div class="extension-language-dropdown" v-if="isShowDropdown">
            <div class="extension-language-option"
                 v-for="(lang, index) in languages"
                 :key="index"
                 @click="selectLang(lang)"
            >
                {{lang}}
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'extension-language-select',
    props: {
      defaultLang: {
        type: String,
        'default': 'en'
      }
    },
    data () {
      return {
        isShowDropdown: false,
        selectedLanguage: 'en',
        languages: [
          'en',
          'uk',
          'ru'
        ]
      }
    },
    methods: {
      toggleDropdownShow () {
        this.isShowDropdown = !this.isShowDropdown
      },
      selectLang (lang) {
        this.selectedLanguage = lang
        this.$emit('changeLang', lang)
        this.isShowDropdown = false
      }
    },
    mounted () {
      this.selectedLanguage = this.defaultLang
    }
  }
</script>

<style lang="scss">
    .extension-language-select{
        position: relative;
        height: 32px;
        width: 100%;
        .extension-language-selected{
            height: 32px;
            background: green;
        }
        .extension-language-dropdown{
            position: absolute;
            top: 32px;
            left: 0;
            right: 0;
            background: white;
        }
    }
</style>
