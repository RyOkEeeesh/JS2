import { useState } from 'react';

export default function App() {
  const [click, setClick] = useState<number>(0);
  return (
    <div className='h-screen w-screen flex items-center justify-center flex-col'>
      <button type="button" className='border' onClick={() => setClick(s => s + 1)}>クリック</button>
      <p>{click}</p>
    </div>
  )
}