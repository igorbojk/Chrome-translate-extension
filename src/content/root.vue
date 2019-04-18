<template>
    <div v-bind:style="blockStyle" v-if="isShowPopup" id="translate-popup">
        {{ text }}
    </div>
</template>
<script>
  export default {
    data () {
      return {
        blockStyle: {},
        isShowPopup: false,
        text: null
      }
    },
    computed: {},
    created () {
    },
    mounted () {
      this.isShowPopup = false
      document.addEventListener('mouseup', () => {
        if (document.getSelection().toString().length) {
          this.isShowPopup = true
          let selectionRect = window.getSelection().getRangeAt(0).getBoundingClientRect()
          this.blockStyle.top = `${selectionRect.y + selectionRect.height + window.pageYOffset + 16}px`
          this.blockStyle.left = `${event.clientX}px`
          this.text = document.getSelection().toString()
        } else {
          this.text = null
          this.isShowPopup = false
        }
      })
      document.addEventListener('mousedown', () => {
        this.text = null
        this.isShowPopup = false
      })
    },
    methods: {}
  }
</script>
<style lang="scss">
    #translate-popup{
        position: absolute;
        background: white;
        z-index: 9999999;
        box-shadow: 2px 2px 2px gray;
        border-radius: 2px;
        border: solid 1px black;
        max-width: 300px;
        width: 100%;
        min-height: 100px;
    }
</style>
