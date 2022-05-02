import PropTypes from 'prop-types';

const Dropdown = ({ via, options, handleOnChange, sortSelected }) => {
    return <>
        <select name={via} id={via} onChange={(e) => handleOnChange(e)} value={sortSelected}>
            {options.map((opt, key) => <option key={key} value={opt}>{`${opt} First`}</option>)}
        </select>
    </>
};

Dropdown.propTypes = {
    via: PropTypes.string,
    options: PropTypes.array.isRequired,
    handleOnChange: PropTypes.func
}

export default Dropdown;