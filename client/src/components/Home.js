import React from "react";
import {useHistory} from "react-router"

function Home(){
    const history=useHistory()
    return (
        <div>

            <h1>
                Karibu mchezoni mwa tic-tac-toe.Mjibambe!!
            </h1>
            <div>

                <button onClick={()=>history.push(`/signup`)}>
                    Join
                </button>

                <button onClick={()=>history.push(`/login`)}>
                    Login
                </button>
            </div>
        </div>
    )
}

export default Home;