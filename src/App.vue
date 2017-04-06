<template>
  <div id="app">
    <fieldset>
      <legend>Create New Person</legend>
      <table :class="{addtable:true}">
        <tr>
          <td>
            <label>Name:</label>
          </td>
          <td>
            <input type="text" v-model="newPerson.name"/>
          </td>
        </tr>
        <tr>
          <td>
            <label>Age:</label>
          </td>
          <td>
            <input type="text" v-model="newPerson.age"/>
          </td>
        </tr>
        <tr>
          <td>
            <label>Sex:</label>
          </td>
          <td>
            <select v-model="newPerson.sex">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <button :class="{btn:true}" @click="addPerson">Add</button>
          </td>
        </tr>
      </table>
      <table :class="{showtable:true}">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tr v-for="person in persons">
          <td v-text="person.name"></td>
          <td v-text="person.age"></td>
          <td v-text="person.sex"></td>
          <td><button :class="{deleteBtn:true}" @click="deletePerson(person)">Delete</button></td>
        </tr>
      </table>
    </fieldset>
  </div>
</template>

<script>
import arrayHandler from './arrayHandler'
import storage from './storage'
export default {
  name: 'app',
  data(){
    return{
      newPerson:{
        name:'',
        age:'',
        sex:'Male'
      },
      persons:storage.fetch()
    }; 
  },
  methods:{
    addPerson:function(){
      if(!this.newPerson.name || !this.newPerson.age)
      {
        alert('Name or Age can not be null!!!');
        return;
      }
      this.persons.push({
        name:this.newPerson.name,
        age:this.newPerson.age,
        sex:this.newPerson.sex
      });
      this.newPerson.name = '';
      this.newPerson.age = '';
    },
    deletePerson:function(person){
      this.persons.splice(arrayHandler.getIndex(person,this.persons),1);
    }
  },
  watch:{
    persons:{
      handler:function(val,odlVal){
        storage.save(val);
      },
      deep:true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

fieldset{
  width: 60%;
  margin: 0 auto;
}

.addtable{
  width: 60%;
  margin: 0 auto;
}

.showtable{
  width: 100%;
  margin: 0 auto;
  border-collapse:collapse;
  border: solid 1px #aaa;
}

.showtable thead tr{
  background: #009a61 !important;
}

.showtable thead th,.showtable td{
  border-right: solid 1px #aaa;
}

.showtable th:last-child,.showtable td:last-child{
  border-right: none;
}

.showtable tr:nth-child(even){
  background: white;
}

.showtable tr:nth-child(odd){
  background: #ccc;
}

.showtable td,th{
  padding: 8px 0px;
}

input[type='text']{
  width: 40%;
  margin: 0 auto;
  padding: 5px 8px;
}

select{
  width: 46%;
  margin: 0 auto;
  padding: 5px;
}

.btn{
  display: block;
  width: 46%;
  margin: 0 auto;
  padding: 7px 8px;
  background: #009a61;
  border: none;
  border-radius: 5px;
}

.deleteBtn{
  display: block;
  margin: 0 auto;
  padding: 7px 8px;
  background: #009a61;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}
</style>
