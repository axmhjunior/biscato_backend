import { db } from "../src/database"

interface CategoryService {
    name:string
}

const categoryService: CategoryService[] = [
    {
        name: "eletrecista",
    },
    {
        name: "pedreiro",
    },
    {
        name: "mecanico",
    }
]

export async function seeds(){

    return Promise.all(
        categoryService.map(async (service)=>{
            await db.serviceCategory.create({
                data:{
                    name: service.name
                }
            })
        })
    )}




 
 seeds().then(()=>{
     console.log("seed created!")
 })