import Iframe from 'react-iframe';

const MapEmbed = () => {
  return (
    <div className="footer-map">
      <Iframe
        url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d821.6023759399807!2d-58.70524180740916!3d-34.54318568163426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbd0f0f419eab%3A0x8dfb98d8553e9893!2sAutoservicio%20Miguel%20Angel!5e0!3m2!1sen!2sca!4v1722794941304!5m2!1sen!2sca"
        width="500"
        height="400"
        display="initial"
        position="relative"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default MapEmbed;
