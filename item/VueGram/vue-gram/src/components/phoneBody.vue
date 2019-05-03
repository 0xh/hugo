<template>
  <div class="phone-body">
    <div class="feed" v-if = "step === 1" v-dragscroll>
      <vueGramPost
        v-for="(post,index) in posts"
        :key="index"
        :post ="post"
      ></vueGramPost>
    </div>
    <div v-if = "step === 2">
      <div 
      class = "selected-image"
      :class= "selectedFilter"
      :style = "{backgroundImage:'url('+ image +')'}"
      >
      </div>
      <div class="filter-container" v-dragscroll>
        <filterType
          v-for = "filter in filters"
          :key = "filter.name"
          :filter = "filter"
          :image = "image"
        ></filterType>
      </div>
    </div>
    <div v-if = "step === 3">
        <div
          class = "selected-image"
          :class= "selectedFilter"
          :style = "{backgroundImage:'url('+ image +')'}"
        ></div>
        <div class="caption-container">
          <textarea 
            placeholder="wirte a caption..."
            :value= "value"
            @input = "inputText"
          ></textarea>
        </div>
      </div>
  </div>
</template>
<script>
import vueGramPost from "./vueGramPost"
import filterType from "./filterType"
export default {
  props: {
    posts: Array,
    filters:Array,
    step:Number,
    image:String,
    selectedFilter:String,
    value:String
  },
  components:{
    vueGramPost,
    filterType
  },
  methods:{
    inputText(event){
      this.$emit("input",event.target.value)
    }
  }
}
</script>
<style lang="scss" src="../style/phone-body.scss">
</style>




