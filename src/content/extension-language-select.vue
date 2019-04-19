<template>
    <div class="extension-language-select">
        <div class="extension-language-selected" @click="toggleDropdownShow()">
            <span>
                <i class="extension-language-selected-flag"
                v-bind:class="selectedLanguage.key"></i>
                <span>{{ selectedLanguage.title }}</span>
            </span>
            <span>&#9662</span>
        </div>
        <div class="extension-language-dropdown" v-if="isShowDropdown">
            <div class="extension-language-option"
                 v-for="(lang, index) in languages"
                 :key="index"
                 @click="selectLang(lang)"
                 v-bind:class="{'active': lang.key === selectedLanguage.key}"
            >
                {{lang.title}}
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
      },
      languages: {
        type: Array,
        'default': () => ([])
      }
    },
    data () {
      return {
        isShowDropdown: false,
        selectedLanguage: 'en',
        value: 'test'
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
    },
    watch: {
      defaultLang (value) {
        this.selectedLanguage = value
      }
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
            line-height: 32px;
            padding: 0 8px;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: solid 1px lightblue;
            border-radius: 4px;
            .extension-language-selected-flag{
                display: inline-block;
                margin-right: 8px;
                width: 24px;
                height: 16px;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                &.en{
                    background-image: url("../../static/icons/en.png");
                }
                &.de{
                    background-image: url("../../static/icons/de.png");
                }
                &.uk{
                    background-image: url("../../static/icons/uk.png");
                }
                &.ru{
                    background-image: url("../../static/icons/ru.png");
                }
                &.fr{
                    background-image: url("../../static/icons/fr.png");
                }
            }
        }
        .extension-language-dropdown{
            border: solid 1px lightblue;
            border-radius: 4px;
            position: absolute;
            top: 32px;
            left: 0;
            right: 0;
            background: white;
            max-height: 120px;
            overflow: auto;
            z-index: 997;
            .extension-language-option{
                padding: 8px;
                text-align: left;
                &:hover,
                &.active{
                    cursor: pointer;
                    background: lightblue;
                }
            }
        }
    }
</style>
