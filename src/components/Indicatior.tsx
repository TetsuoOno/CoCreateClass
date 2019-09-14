import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import "../scss/indicator.scss"

const Indicator: React.FC = () => {
    return (
        <div className="indicator">
            <FontAwesomeIcon icon={faCircleNotch} spin size="6x" />
        </div>
    )
}
export default Indicator