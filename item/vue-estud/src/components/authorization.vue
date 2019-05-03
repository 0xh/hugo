<template>
    <div class="authorization">
        <form @submit.prevent="submit">
            <div class="filed">
                <a-input 
                    type="text" 
                    placeholder="请输入用户名" 
                    v-validate="'required'" 
                    name="name" 
                    data-vv-as="用户名"
                    v-model="form.name"
                    :class="{error:errors.has('name')}">
                    <a-icon slot="prefix" type="user" class="icon"></a-icon>
                </a-input>
                <span class="error-tip">{{ errors.first('name') }}</span>
            </div>
            <div class="filed">
                <a-input 
                    type="password"  
                    placeholder="请输入密码" 
                    v-validate="'required'" 
                    name="password" 
                    data-vv-as="密码"
                    v-model="form.password"
                    :class="{error:errors.has('password')}">
                    <a-icon slot="prefix" type="lock" class="icon"></a-icon>
                </a-input>
                <span class="error-tip">{{ errors.first('password') }}</span>
            </div>
            <div class="filed">
                <a-button type="primary" htmlType="submit">登陆</a-button>
            </div> 
        </form>
    </div>
</template>

<script>
import {api} from "../utils/api"
export default {
    data(){
        return{
            form:{
                name:"",
                password:""
            }
        }
    },
    methods:{
        submit(){
            this.$validator.validateAll().then(result => {
                if(result){
                    this.$store.dispatch("user/login", this.form)
                }
            })
        }
    }
}
</script>

<style lang="scss">
    .error{
        border:1px solid red;
        font-size: 12px;
    }
    .error-tip{
        color: red;
    }
    .authorization{
        display: flex;
        justify-content: center;
    }
    .filed{
        margin: 25px 0;
        button{
            width: 100%;
        }
    }
    form{
        width: 400px;
        input{
            padding: 10px 0;
        }
    }
    .icon{
        color: rgba(0,0,0, 0.25)
    }
</style>


