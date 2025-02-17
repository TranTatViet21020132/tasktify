import { Html, useProgress } from '@react-three/drei'

const CanvasLoader = () => {
  const { progress, loaded } = useProgress();
  
  return (
    <Html
      as="div" 
      center
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
      <span className='canvas-loader' />
      <p className='font-bold text-black dark:text-[#f1f1f1]' style={{ 
        fontSize: 14, 
        fontWeight: 800, 
        marginTop: 40 
      }}>
        {!loaded ? `${progress.toFixed(2)}%` : 'Loading complete'}
      </p>
    </Html>
  )
}

export default CanvasLoader