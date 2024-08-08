import { db } from "../src/database"

interface CategoryService {
    name: string
}

interface Freelancers {
    userId: string,
    latitude: number,
    longitude: number
}

const freelancers: Freelancers[] = [
    {
        userId: "073ed593-2ccf-44e8-bcbf-97e407689af6", latitude: 40.730680, longitude: -73.935242
    },
    {
        userId: "323a6300-e127-4495-8010-48ad686a867b", latitude: 40.730610, longitude: -73.935242
    },
    {
        userId: "323a6300-e127-4495-8010-48ad686a867b", latitude: 40.712776, longitude: -74.005974
    },
]

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
    categoryService.map(async (categoryService)=> {
    await db.serviceCategory.create({
    data: {
        name: categoryService.name
    }
})
    })
)
}

seeds().then(()=>{
    console.log("seed created!")
})