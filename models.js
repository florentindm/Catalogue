module.exports = {
	model:{
		name:'Nouveau modèle',
		index:[],
		default:{},
		icon:'',
		box:true,
		properties:[],
		display:'',
		childmodels:[]
	},
	property:{
		name:'Nouvelle propriété',
		icon:'field',
		default:'',
		element:'text',
		length:'',
		reference:'',
		composition:'',
		list:false
	},
	object:{
		model:null,
		values:{},
		roles:[],
		styles:{},
		childmodels:[],
		children:[]
	},
	objectrole:{
        role:null,
        filters:{},
        properties:[],
        right:''
	},
	reference:{
		path:[],
		filter:null
	},
	filter:{
		match:[],
		sort:[],
		fields:[],
		objects:[]
	},
	match:{
		field:'',
		operator:'',
		value:''
	},
	sort:{
		field:'',
		way:''
	},
	user:{
	    name : '',
	    mail : '',
	   	password : '',
	    children : [],
	    model:{childmodels:[]},
	    active:true
	},
	userobject:{
		object:null,
		profile:null
	},
	profile:{
		name:''
	},
	symbols:{
		name:''
	},
	right:{
		name:''
	}
}