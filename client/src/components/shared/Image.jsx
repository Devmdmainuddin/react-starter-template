import PropTypes from 'prop-types';
const Image = ({src,className,alt}) => {
    return (
        <img src={src} alt={alt}  className={`w-full h-full object-cover ${className}`}/>
    );
};
Image.propTypes = {
    children: PropTypes.node, 
    className: PropTypes.string,
    src: PropTypes.string,
    alt: PropTypes.string,
}
export default Image;