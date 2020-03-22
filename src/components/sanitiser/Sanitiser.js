import React, { useState } from 'react'

const Sanitiser = () => {

    const [formData, setFormData] = useState({
        number: 0,
        recurring: 1,
        pump: 5,
    })

    const [step, setStep] = useState(25)

    const [options, setOptions] = useState(false)

    let updateRange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const displayText = (number) => {
        if (number >= 1000) {
            return `${(number / 1000).toFixed(2)} l`
        } else {
            return `${(number)} ml`
        }
    }

    let updateStep = () => {
        const { number } = formData
        if (number >= 1000) {
            setStep(250)
        } else {
            setStep(25)
        }

    }

    let getDaysLeft = () => {
        const { number, recurring, pump } = formData
        let frequency = pump * recurring
        let result = (number / frequency).toFixed(2)
        return result;
    }

    const { number, recurring, pump } = formData


    return (
        <div className='container'>
            {/* <div className="alert-banner">
                <span role="img" aria-label="">🤦‍♂️</span>DO NOT HOARD HAND SANITISER <span role="img" aria-label="">🤦‍♀️</span>
            </div> */}
            <div className="box-medium">
                <h2>Days left: {getDaysLeft()}</h2>
            </div>
            <div style={{ postion: 'absoulte', marginBottom: '20px' }}>
                <div className="box">{displayText(number)}</div>
                <input onChange={(e) => {
                    updateRange(e)
                    updateStep(e)
                }} name='number' type="range" class="slider" min="0" max="10000" step={step}  ></input>
                <div>Hand sanitiser available?</div>
            </div>
            <div style={{ postion: 'absoulte', marginBottom: '20px' }}>
                <div className="box">{recurring}</div>
                <input onChange={(e) => {
                    updateRange(e)
                }} name='recurring' type="range" class="slider" min="1" max="50" step="1" value={recurring}></input>
                <div><span role="img" aria-label="">🧴</span>Frequency - How many pumps/squeezes in a day?</div>
            </div>
            <button onClick={() => {
                setOptions(!options);
            }} >Advanced Options {options ? 'Activated' : 'Deactived'}</button >
            {options ?
                <div style={{ postion: 'absoulte', marginBottom: '20px' }}>
                    <div className="box">{`${pump} ml`}</div>
                    <input onChange={(e) => {
                        updateRange(e)
                    }} name='pump' type="range" class="slider" min="1" max="10" step="1" value={pump}></input>
                    <div><span role="img" aria-label="">🧴</span>How much is a pump/squeeze?</div>
                </div>
                : null}
        </div>
    )
}

export default Sanitiser;