"use client"
import { HomeViewModel } from "./HomeViewModel";


const Home = () =>{
    const {state} = HomeViewModel()
    return (
        <div>
            {JSON.stringify(state)}
        </div>
    )
}

export default Home;