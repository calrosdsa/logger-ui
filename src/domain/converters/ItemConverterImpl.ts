

export class ItemConverterImpl implements ItemConverter {
    // convertWithStringArray: (v: string[]) => Item[]
    convertWithStringArray: (v: string[]) => Item[] = (v: string[]):Item[] => {
        let items:Item[] = []
        for(let i = 0;i<v.length;i++){
            items.push({
                value:v[i],
                name:v[i]
            })
        }
        return items
    }
    convert(values: string[], names: string[]):Item[]{
        let items:Item[] = []
        for(let i = 0;i<values.length;i++){
            items.push({
                value:values[i],
                name:names[i]
            })
        }
        return items
    };
}