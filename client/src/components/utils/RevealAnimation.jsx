import React, { useEffect, useRef } from 'react'
import  {motion,useInView,useAnimation} from 'framer-motion'

const w = "fit-content" | "100%" 

const RevealAnimation = ({children}) => {

const ref = useRef()
const mainControls = useAnimation()
const isInView = useInView(ref,{once:true})

useEffect(() => {
if(isInView) {
    mainControls.start("visible")
}
}, [isInView])


  return (
    <div ref={ref} style={{position:"relative",overflow:"hidden"}} >
        <motion.div
        variants={{
            hidden:{opacity:0, y:75},
            visible:{opacity:1, y:0}
        }}
        initial="hidden"
        animate={mainControls}
        transition={{duration:0.5,delay:0.25}}
        >
{children}
        </motion.div>
    </div>
  )
}

export default RevealAnimation