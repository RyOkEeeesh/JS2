import { useState } from 'react';

export default function App() {
  const [click, setClick] = useState<number>(0)
  return (
    <div>
      <button type="button" onClick={() => setClick(s => s + 1)}>クリック</button>
      <p>{click}</p>
    </div>
  )
}