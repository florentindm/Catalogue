db.getCollection('objects').aggregate([
    //Distinct models used in container
    {$match:{_id:ObjectId("5a70f4eac6cc9e6d6a593eec")}},
    {$lookup:{from:'objects', localField:'children', foreignField:'_id', as:'children'}},
    {$unwind:'$children'},
    {$project:{_id:false, model:'$children.model'}},
    {$group: { _id: null, models: { $addToSet: '$model' } } },
    
    //Distinct references among properties
    {$lookup:{from:'models', localField:'models', foreignField:'_id', as:'models'}},
    {$lookup:{from:'properties', localField:'models.properties', foreignField:'_id', as:'models.properties'}},
    {$unwind:'$models.properties'},
    {$project:{_id:false, reference:'$models.properties.reference'}},
    {$match:{reference:{$ne:''}}},
    {$group: { _id: null, references: { $addToSet: '$reference'}}},
    
    //Getting the objects
    //{$lookup:{from:'objects', localField:'references', foreignField:'_id', as:'references'}},
])