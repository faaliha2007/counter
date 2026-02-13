

import { useState } from "react";


function App() {
  const [count, setcount] = useState(0)
  const [min, setmin] = useState(0)
  const [max, setmax] = useState(0)
  const [moves, setmoves] = useState(0)
  const [status, setstatus] = useState("start")

  function startgame() {
    const randommin = Math.floor(Math.random() * 5)
    const randommax = Math.floor(Math.random() * 10) + 10
    const randommoves = Math.floor(Math.random() * 5) + 8
    const randomstart = Math.floor(Math.random() * (randommax - randommin) + randommin)

    setcount(randomstart)
    setmin(randommin)
    setmax(randommax)
    setstatus("playing")
    setmoves(randommoves)

  }

  function check(newcount,newmoves)
  {
    if(newcount < min ||newcount > max)
      setstatus("lost")
    else if(newmoves === 0 )
    {
      setstatus("won")
    }
  }

  function increment() {
    if(status != "playing") return;

    const newcount = count + 1
    const newmoves = moves - 1
    setcount(newcount)
    setmoves(newmoves)
    check(newcount,newmoves)
  
  }
  function decrement() {
      if(status != "playing") return;

    const newcount = count - 1
    const newmoves = moves - 1
    setcount(newcount)
    setmoves(newmoves)
    check(newcount,newmoves)
  }
  function reset() {
    setstatus("start")
    setcount(0)
    setmoves(0)
  }

  function color() {
    if (count < min || count > max) return "text-red-500"
    if (count <= min+3) return "text-yellow-400"
    if (count >= max-3) return "text-orange-400"

    return "text-green-400"

  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">


      <div className={"bg-gray-900 border border-gray-700 p-10 rounded-2xl shadow-2xl w-96 transition-all duration-300 "}>

        <h1 className='text-3xl font-bold mb-6 text-center text-cyan-400'>🎮 Balance Counter</h1>

        {status == "start" && (
          <div className="text-center">
            <button onClick={startgame} className="px-6 py-3 bg-cyan-400  rounded-xl transition font-semibold">Start Game</button>
          </div>

        )}

        {status != "start" && (
          <>
            <div className="text-center text-gray-400 mb-4">Safe Zone : {min} - {max}</div>

            <div className={`text-6xl font-bold text-center transition-transform duration-200 hover:scale-110 ${color()}`}>{count}</div>
            <p className="text-pink-400 font-semibold text-center mt-4">Moves Left : {moves}</p>
            <div className='flex gap-4 justify-center mb-6 mt-6'>
              <button disabled={count === 0} onClick={decrement} className={`py-2 px-5 font-semibold rounded-lg  bg-red-500 hover:bg-red-600`}>-1</button>
              <button onClick={increment} className='bg-green-500 py-2 px-5 font-semibold rounded-lg hover:bg-green-600'>+1</button>
            </div>



            {status === "won" && (
              <div className="text-green-400 font-bold text-lg mb-4 text-center">🎉 You Survived! You Win!</div>
            )}


            {status === "lost" && (
              <div className="text-red-500 font-bold text-lg mb-4 text-center">💀 Out of Safe Zone! You Lost!</div>
            )}





            <div className="text-center">
              <button onClick={reset} className='bg-purple-600 py-2 font-semibold rounded-lg hover:bg-purple-700 text-center mt-4 px-6 '>Reset Game</button>
            </div>


          </>
        )}

      </div>
    </div>




  )
}

export default App