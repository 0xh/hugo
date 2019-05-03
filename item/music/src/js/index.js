import "../css/index.scss";
import $ from "jquery";
import render from "./render";
import event from "./event";


$.ajax({
    url:"https://www.easy-mock.com/mock/5c8bca62ddeb60160e72f334/example/getMusicinfo",
    type:"GET",
    success(resp){
        const data = resp.data;
        render(data[2]);
        event(data);
    }
})

