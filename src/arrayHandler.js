export default{
	getIndex:function(person,persons){
		for(var i=0;i<persons.length;i++)
	    {
	      if(person.name == persons[i].name && person.age == persons[i].age && person.sex == persons[i].sex)
	      {
	        return i;
	      }
	    }
	}
}