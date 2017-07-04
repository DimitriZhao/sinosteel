export function addKey(jsonArray)
{
    if(jsonArray)
    {
        let newJsonArray = [];

        for(var i = 0; i < jsonArray.length; i++)
        {
            let jsonObject = jsonArray[i];

            let newJsonObject = 
            {
                key: i,
                ...jsonObject
            }

            newJsonArray.push(newJsonObject);
        }

        return newJsonArray;
    }
    
    return [];
} 

export function replaceItemById(items, item)
{
    for(var i = 0; i < items.length; i++)
    {
        let tempItem = items[i];

        if(tempItem.id == item.id)
        {
            items[i] = item;

            return;
        }
    }
}

export function findItemById(items, id)
{
    for(var i = 0; i < items.length; i++)
    {
        let item = items[i];

        if(item.id == id)
        {
            return item;
        }
    }
}