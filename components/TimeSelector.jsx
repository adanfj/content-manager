import React from 'react'

const TimeSelector = ({ value, id, name, onChangeValue,onClick }) => {
    return (
        <input readOnly type="text" onClick={onClick} name={name} id={id} value={value} onChange={e => {
            onChangeValue(e.target.value)
        }} />
    )
}

export default TimeSelector