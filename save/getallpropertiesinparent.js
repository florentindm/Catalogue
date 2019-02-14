db.getCollection('objects').aggregate([
    //Groupement des modèles utilisé par des children 
    {$match:{_id:ObjectId("5a80ec1dc750e38667e8c292")}},
    {$unwind:'$children'},
    {$group: { _id: null, children: { $addToSet: '$children'}}},
    {$unwind:'$children'},
    {$lookup:{from:'objects', localField:'children', foreignField:'_id', as:'children'}},
    {$project:{child:{$arrayElemAt:['$children',0]}}},
    {$project:{model:'$child.model'}},
    {$group: { _id: null, models: { $addToSet: '$model'}}},
    {$unwind:'$models'},
    
    //Groupement des propriété utilisées par les modèles 
    {$lookup:{from:'models', localField:'models', foreignField:'_id', as:'models'}},
    {$project:{model:{$arrayElemAt:['$models',0]}}},
    {$project:{properties:'$model.properties'}},
    {$unwind:'$properties'},
    {$group: { _id: null, properties: { $addToSet: '$properties'}}},
    {$unwind:'$properties'},
    {$lookup:{from:'properties', localField:'properties', foreignField:'_id', as:'properties'}},
    {$project:{properties:{$arrayElemAt:['$properties',0]}}},
    {$project:{_id:false, value:'$properties._id', name:'$properties.name', type:'$properties.type'}},
])