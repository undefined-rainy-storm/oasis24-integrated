import { useState, useRef } from 'react'
import Transition from 'react-transition-group/Transition'

export const Menu = () => {
  const nodeRef = useRef(null)
  const [transitionState, setTransitionState] = useState(false)

  return (
    <Transition nodeRef={nodeRef} timeout={300}>
      {state => (
        <>
          {/* Background Display */}
          <div style={{
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, .5)',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            cursor: 'pointer',
            zIndex: 5,
            transition: '.5s ease-in-out'
          }}>
            <div style={{
              position: 'fixed',
              width: '80vw',
              height: '100vh',
              top: 0,
              bottom: 0,
              right: 0,
              backgroundColor: 'white',
              zIndex: 10,
            }}>
              asdf
            </div>
          </div>
        </>
      )}
    </Transition>
  )
}