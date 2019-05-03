<template>
  <a-layout id="app">
    <a-layout-header class="header flexrow">
      <h2>蝉壳 estud</h2>
      <div class="right flexrow" v-if="loggedIn">
        <div class="flexrow" v-if="isTeacher">
          <h4>{{info.name}}</h4>
          <!-- 新建作业模态框 -->
          <a-button class="vcenter" type="primary" icon="file-add" @click="newWork = true">新建作业</a-button>
          <a-modal :visible="newWork" @cancel="newWork = false" :footer="null">
            <form>
              <a-form-item label="课程：">
                <a-select v-model="everyLesson.org_id">
                  <a-select-option v-for="(full_name,id) in LessonModel" :value="id" :key="id">
                    {{full_name}}
                  </a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="作业名称:">
                <a-textarea v-model="everyLesson.name" autosize></a-textarea>
              </a-form-item>
              <a-form-item label="开始/结束时间">
                <a-range-picker @change="onChange"></a-range-picker>
              </a-form-item>
              <a-form-item>
                <a-button type="primary" @click="saveOn(everyLesson.org_id)">保存</a-button>
              </a-form-item>
            </form>
          </a-modal>
        </div>
        <div class="flexrow" v-else>
          <h4 class="flexcol">
            <span>{{info.full_name}}</span>
            <span>学号：{{info.name}}</span>
          </h4>
          <h5 class="flexcol">
            <span v-for="(org,index) in student.orgs" :key="`${org}_${index}`">{{org}}</span>
          </h5>
          <div>
            <span class="label">{{student.stats.uncommitted}}个作业待提交</span>
            <span class="label">{{student.stats.revising}}个作业待批改</span>
            <span class="label">{{student.stats.improvable}}个作业需完善</span>
            <span class="label">{{student.stats.finished}}个作业已完成</span>
          </div>
        </div>
        <a href="http://vipgit.chanke.xyz" target="black">
          <a-button class="vcenter" icon="home">代码仓库</a-button>
        </a>
        <a href="javascript:;">
          <a-button class="vcenter" icon="logout" @click="$store.dispatch('user/logout')">退出</a-button>
        </a>
      </div>
    </a-layout-header>
    <a-layout-content>
      <Authorization v-if="!loggedIn"></Authorization>
      <div v-else>
        <teacher v-if="isTeacher" :teacher="teacher"></teacher>
        <students v-else :student="student"></students>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapState } from "vuex";
import { api } from "./utils/api";
import Authorization from "./components/authorization";
import teacher from "./components/teacher";
import students from "./components/students";
const LessonModel = {
  "4": "一期实战班",
  "41": "二期实战班",
  "69": "三期就业班",
  "70": "三期框架班",
  "88": "四期就业班",
  "89": "四期框架班"
};
const studentCount = [
  {
    id: "4",
    AllCount: "16"
  },
  {
    id: "41",
    AllCount: "18"
  },
  {
    id: "69",
    AllCount: "34"
  },
  {
    id: "70",
    AllCount: "21"
  },
  {
    id: "88",
    AllCount: "27"
  },
  {
    id: "89",
    AllCount: "18"
  }
];
export default {
  name: "app",
  data() {
    return {
      newWork: false,
      LessonModel,
      studentCount,
      everyLesson: {
        org_id: "41",
        name: "",
        start_time: "0000-00-00",
        end_time: "0000-00-00"
      },
      student: {
        orgs: [],
        stats: {},
        assignments: []
      },
      teacher: {
        assignments: [],
        orgs: []
      }
    };
  },
  computed: {
    ...mapState("user", ["info", "loggedIn"]),
    isTeacher() {
      return this.info.is_admin > 0;
    }
  },
  created() {
    if (this.loggedIn) {
      this.loadDetails();
    }
  },
  watch: {
    loggedIn(value) {
      if (value) {
        this.loadDetails();
      }
    }
  },
  methods: {
    loadDetails() {
      if (this.isTeacher) {
        api.get("/teacher/detail").then(data => {
          this.teacher.orgs = data.orgs;
          this.teacher.assignments = data.assignments;
        });
      } else {
        api.get("/student/detail").then(data => {
          console.log(data);
          this.student.orgs = data.orgs;
          this.student.assignments = data.assignments;
          this.student.stats = data.stats;
        });
      }
    },
    onChange(date,dateString){
      this.everyLesson.start_time = dateString[0];
      this.everyLesson.end_time = dateString[1];
    },
    saveOn(id){
      const student_countData = this.studentCount.find(item=>{
        if(item.id === id){
          return item.AllCount
        }
      });
      api.post('/teacher/createAssignment',this.everyLesson).then(data=>{
        data.student_count=student_countData.AllCount;
        this.teacher.assignments.unshift(data);
      }).finally(()=>{
        this.newWork=false;
      })
    }
  },
  components: {
    Authorization,
    teacher,
    students
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
}
.header {
  color: #fff;
  font-size: 1.1em;
  h2,
  h4,
  h5 {
    color: #fff;
  }
  .right > .flexrow > * {
    margin-right: 25px;
  }
  .label {
    padding: 0 5px;
  }
}
.flexrow {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.right {
  margin-left: auto;
}
.flexcol {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  height: 100%;
  span {
    flex: 1;
    max-height: 20px;
    line-height: 20px;
  }
}
.vcenter {
  align-self: center;
}
</style>
