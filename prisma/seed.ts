import { db } from "../src/database"

interface CategoryService {
    name:string
}

interface Freelancers {
    name:string,
    latitude: number,
    longitude: number
}


const freelancers: Freelancers[] = [
    {
        name: "teo", latitude: 40.730610, longitude: -73.935242
    },
    {
        name: "yuri", latitude: 40.730610, longitude: -73.935242
    },
    {
        name: "pai", latitude: 40.712776, longitude: -74.005974
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


export async function seed() {
    await db.freelancerLocation.createMany({
        data: [
            {
                userId: "f4200cde-b049-45d1-a00a-0f9f831dcccf", latitude: 40.730610, longitude: -73.935242
            },
            {
                userId: "6ae9bd75-005a-45cc-ad34-1e76cdef3d15", latitude: 40.730610, longitude: -73.935242
            }
        ],
    });
    console.log('Users added');
}
// export async function seeds(){

//     return await db.freelancerLocation.createMany({
//                 data:[
//                     {
//                         userId: "f4200cde-b049-45d1-a00a-0f9f831dcccf", latitude: 40.730610, longitude: -73.935242
//                     },
//                     {
//                         userId: "6ae9bd75-005a-45cc-ad34-1e76cdef3d15", latitude: 40.730610, longitude: -73.935242
//                     },
//                     // {
//                     //     userId: "pai", latitude: 40.712776, longitude: -74.005974
//                     // },
//                 ]
//     }
       
//     )}




 
