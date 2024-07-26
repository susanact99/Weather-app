import React from 'react'
import { useState } from 'react'

function UseForm(initialState = {}) {

    const [formState, setFormState]=useState(initialState)
    
    const handleChange = (target) =>{
        const {name,value}=target
        setFormState({
            ...formState,
            [name]:value
        })
    }
    return {
        formState,
        handleChange
    }     
    
}

export default UseForm
