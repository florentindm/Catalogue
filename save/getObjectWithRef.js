db.getCollection('objects').aggregate([
    {$match:{_id:ObjectId("5a71012835c0cd76ce63d4c0")}},
    {$lookup:{from:'models', localField:'model', foreignField:'_id', as:'model'}},
    {$project:{model:{$arrayElemAt:['$model',0]}, values:true, children:true, hasindex:{$size:'$model.index'}}},
    {$lookup:{from:'properties', localField:'model.properties', foreignField:'_id', as:'model.properties'}},
    {$lookup:{from:'properties', localField:'model.index', foreignField:'_id', as:'model.index'}},
    {$project:{model:{id:'$model._id', name:'$model.name', icon:'$model.icon', index:true, properties:true}, values:true, children:true}},
    
    //Lookup one reference
    {$lookup:{from:'objects', localField:'values.5a71044d35c0cd76ce63d4c8', foreignField:'_id', as:'values.5a71044d35c0cd76ce63d4c8'}},
    {$project:{
        'values.5a71044d35c0cd76ce63d4c8':{$arrayElemAt:['$values.5a71044d35c0cd76ce63d4c8',0]},
        children:true
     }},
])