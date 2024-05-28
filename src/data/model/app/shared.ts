
interface ItemConverter {
    convert:(values:string[],names:string[])=>Item[]
    convertWithStringArray:(v:string[])=>Item[]
}

interface Item  {
    name:string
    value:string
}