import React from 'react'

const TimeSelector = ({ value, id, name, onChangeValue,onClick,style }) => {
    return (
        <input readOnly style={style} type="text" onClick={onClick} name={name} id={id} value={value} onChange={e => {
            onChangeValue(e.target.value)
        }} />
    )
}

export default TimeSelector