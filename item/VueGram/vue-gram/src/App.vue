<template>
  <div id="app">
    <div class="app-phone">
      <div class="phone-head">
        <a 
          class="cancel-cta"
          v-if = "step ===2 || step ===3"
          @click = "goToHome">
          Cancel
        </a>
        <img src="./resource/vue_gram_logo_cp.png" alt="">
        <a 
          class="next-cta"
          v-if = "step === 2"
          @click = "step++">
          Next
        </a>
        <a 
          class="next-cta"
          v-if = "step === 3"
          @click = "Share">
          Share
        </a>
      </div>
      <phoneBody 
      :posts = "posts"
      :step = "step"
      :image = "image"
      :filters = "filters"
      :selectedFilter = "selectedFilter"
      v-model = "captions"></phoneBody>
      <div class="phone-footer">
        <div class="home-btn">
          <i  
            class="fas fa-home fa-lg"
            @click = "goToHome"></i>
        </div>
        <div class="upload-btn">
          <input 
            type="file" id="file" name="file"
            @change="uplaodImage"  
            :disabled = "step !== 1"
          >
          <label for="file">
              <i class="fas fa-plus-square fa-lg"></i>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import phoneBody from "./components/phoneBody.vue"
import posts from "./data/posts"
import filters from "./data/filters"
import eventBus from "./event-bus" 

export default {
    name:'app',
    created(){
      eventBus.$on("selectedFilter", event=>{
        this.selectedFilter = event;
      })
    },
    data(){
      return{
         posts,
         step:1,
         image : "",
         filters,
         selectedFilter:"",
         captions : ""
      }
    },
    methods:{
      uplaodImage(event){
        const files =event.target.files;
        if(!files.length) return;
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = event => {
          this.image = event.target.result;
          this.step = 2;
        }
      },
      goToHome(){
        this.image = "",
        this.selectedFilter = "",
        this.step = 1;
      },
      Share(){
        const post = {
          username: "liu",
          userImage: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/me_3.jpg",
          postImage:this.image,
          likes: 0,
          hasBeenLiked: false,
          caption: this.captions,
          filter: this.selectedFilter 
        }
        this.posts.unshift(post);
        this.goToHome();
      }
    },
    components:{
      phoneBody
    }
}
</script>
<style lang="scss" src="./style/app.scss">

</style>


