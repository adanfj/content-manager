import React from 'react'

const TimeSelector = ({ value, id, name, onChangeValue }) => {
    return (
        <input type="text" name={name} id={id} value={value} onChange={e => {
            let hms = e.target.value.split(":")
            let text = hms[0].slice(-2)+":"
            if (hms.length > 1) {
                text += hms[1].slice(-2)+":"
            } else text += "00:"
            if (hms.length > 2) {
                text += hms[2].slice(-2)
            } else text += "00"
            onChangeValue(text)
        }} />
    )
}

export default TimeSelector