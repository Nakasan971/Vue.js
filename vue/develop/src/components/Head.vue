<template>
    <div id="head">
        <h1>Todoリスト</h1>
        <h2><span :title="startDate()">{{time}}</span></h2>
    </div>
</template>
<script>
export default{
    data(){
        return{
            time:''
        }
    },
    methods:{
        showDate:function(){
            const date = new Date().toLocaleString();
            this.time = date;
            delete this.date;
        },
        startDate:function(){
            setInterval(this.showDate,1000);
        }
    }
}
</script>
<style scoped>
#head{
    margin-top: 30px;
    margin-bottom: 30px;
}
h1,h2{
    padding-inline: 30px;
    display: inline;
}
</style>
